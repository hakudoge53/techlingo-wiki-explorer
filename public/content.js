
// Initial state - this will be updated based on user preference
let highlightEnabled = false;

// Load the user's preference
chrome.storage.sync.get(['highlightEnabled'], (result) => {
  highlightEnabled = result.highlightEnabled || false;
  
  // If highlighting is enabled, run highlighting immediately
  if (highlightEnabled) {
    highlightTermsOnPage();
  }
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleHighlight') {
    highlightEnabled = message.enabled;
    
    if (highlightEnabled) {
      highlightTermsOnPage();
    } else {
      removeHighlights();
    }
  }
  sendResponse({ success: true });
  return true;
});

// Function to highlight terms on the page
function highlightTermsOnPage() {
  // First, fetch the terms from the extension storage
  chrome.storage.local.get(['techTerms'], (result) => {
    let terms = result.techTerms;
    
    // If terms aren't in storage yet, use a hardcoded list of common tech terms
    // In a production extension, you'd want to properly sync this with your main app data
    if (!terms || !terms.length) {
      terms = [
        { term: "API", category: "Web Development" },
        { term: "HTML", category: "Web Development" },
        { term: "CSS", category: "Web Development" },
        { term: "JavaScript", category: "Programming" },
        { term: "React", category: "Web Development" },
        { term: "Docker", category: "DevOps" },
        { term: "Cloud Computing", category: "Cloud Computing" },
        { term: "SQL", category: "Databases" },
        { term: "Git", category: "DevOps" },
        { term: "REST", category: "Web Development" },
        { term: "Blockchain", category: "Cybersecurity" }
      ];
      
      // Save these for future use
      chrome.storage.local.set({ techTerms: terms });
    }
    
    // Sort terms by length (descending) to prioritize longer terms
    const sortedTerms = [...terms].sort((a, b) => 
      b.term.length - a.term.length
    );
    
    // Call the highlight function with these terms
    highlightText(document.body, sortedTerms);
  });
}

// Function to highlight text nodes
function highlightText(rootNode, terms) {
  // Skip certain elements
  const skipTags = {
    'SCRIPT': true, 'STYLE': true, 'NOSCRIPT': true, 
    'IFRAME': true, 'OBJECT': true, 'INPUT': true, 
    'TEXTAREA': true, 'SELECT': true, 'OPTION': true,
    'CODE': true, 'PRE': true
  };
  
  // Process already highlighted nodes to prevent double-highlighting
  const highlightedClass = 'techlingo-wiki-highlighted';
  const processedClass = 'techlingo-wiki-processed';
  
  // Create a CSS stylesheet for our highlights
  if (!document.getElementById('techlingo-wiki-styles')) {
    const style = document.createElement('style');
    style.id = 'techlingo-wiki-styles';
    style.textContent = `
      .${highlightedClass} {
        background-color: rgba(79, 70, 229, 0.1);
        color: rgb(79, 70, 229);
        font-weight: 500;
        padding: 0 2px;
        border-radius: 2px;
        position: relative;
      }
    `;
    document.head.appendChild(style);
  }
  
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  // Recursive function to walk the DOM
  function walk(node) {
    // Skip nodes that are already processed
    if (node.classList && node.classList.contains(processedClass)) {
      return;
    }
    
    // Skip certain tags
    if (node.nodeName && skipTags[node.nodeName.toUpperCase()]) {
      return;
    }
    
    // Process text nodes
    if (node.nodeType === 3) { // Text node
      let text = node.nodeValue;
      let modified = false;
      
      for (const term of terms) {
        const regex = new RegExp(`\\b(${escapeRegExp(term.term)})\\b`, 'gi');
        
        if (regex.test(text)) {
          modified = true;
          
          const span = document.createElement('span');
          
          // Replace the matches with highlighted spans
          let lastIndex = 0;
          regex.lastIndex = 0; // Reset regex state
          
          let match;
          const fragments = [];
          
          while ((match = regex.exec(text)) !== null) {
            // Add the text before the match
            if (match.index > lastIndex) {
              fragments.push(document.createTextNode(text.substring(lastIndex, match.index)));
            }
            
            // Create a highlighted span for the match
            const highlighted = document.createElement('span');
            highlighted.className = highlightedClass;
            highlighted.textContent = match[0];
            fragments.push(highlighted);
            
            lastIndex = regex.lastIndex;
          }
          
          // Add any remaining text
          if (lastIndex < text.length) {
            fragments.push(document.createTextNode(text.substring(lastIndex)));
          }
          
          // Replace the text node with our fragments
          const container = document.createElement('span');
          container.className = processedClass;
          fragments.forEach(frag => container.appendChild(frag));
          
          if (node.parentNode) {
            node.parentNode.replaceChild(container, node);
          }
          
          // Stop processing this node as we've replaced it
          return;
        }
      }
    }
    else if (node.nodeType === 1) { // Element node
      // Mark this node as processed to avoid processing it again
      if (node.classList) {
        node.classList.add(processedClass);
      }
      
      // Process child nodes
      const children = [...node.childNodes];
      for (const child of children) {
        walk(child);
      }
    }
  }
  
  // Start the DOM walk
  walk(rootNode);
}

// Function to remove highlights
function removeHighlights() {
  // Remove our stylesheet
  const style = document.getElementById('techlingo-wiki-styles');
  if (style) {
    style.remove();
  }
  
  // Remove processed class from all elements
  const processed = document.querySelectorAll('.techlingo-wiki-processed');
  processed.forEach(node => {
    // Get the text content of this node
    const text = node.textContent;
    
    // Create a new text node with the same content
    const textNode = document.createTextNode(text);
    
    // Replace the processed node with the text node
    if (node.parentNode) {
      node.parentNode.replaceChild(textNode, node);
    }
  });
}

// Observe for DOM changes to highlight new content
const observer = new MutationObserver((mutations) => {
  if (highlightEnabled) {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            highlightTermsOnPage();
          }
        });
      }
    });
  }
});

// Start observing the document with the configured parameters
observer.observe(document.body, { childList: true, subtree: true });

// Initial highlight on page load
if (highlightEnabled) {
  // Wait for page content to fully load
  window.addEventListener('load', () => {
    highlightTermsOnPage();
  });
}
