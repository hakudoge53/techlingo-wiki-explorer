
/**
 * Functions for highlighting tech terms on the page
 */

// Create a CSS stylesheet for our highlights
function createHighlightStyles() {
  if (!document.getElementById('techlingo-wiki-styles')) {
    const style = document.createElement('style');
    style.id = 'techlingo-wiki-styles';
    style.textContent = `
      .techlingo-wiki-highlighted {
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
}

// Helper function to escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Walk through DOM nodes to highlight terms
function walkDOM(node, terms, skipTags, highlightedClass, processedClass) {
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
      walkDOM(child, terms, skipTags, highlightedClass, processedClass);
    }
  }
}

// Main function to highlight text on the page
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
  
  // Create styles for highlights
  createHighlightStyles();
  
  // Start the DOM walk
  walkDOM(rootNode, terms, skipTags, highlightedClass, processedClass);
}

// Function to remove all highlights from the page
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

export { highlightText, removeHighlights };
