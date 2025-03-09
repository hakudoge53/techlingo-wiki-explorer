// This file serves as the entry point for the content script

// TechLingo Wiki content script
(function() {
  // Keep track of our state
  let highlightEnabled = false;
  let processedNodes = new WeakSet();

  // Escape special regex characters
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Create styles for highlighting
  function createHighlightStyles() {
    if (!document.getElementById('techlingo-wiki-styles')) {
      const style = document.createElement('style');
      style.id = 'techlingo-wiki-styles';
      style.textContent = `
        .techlingo-wiki-highlight {
          background-color: rgba(79, 70, 229, 0.1);
          color: rgb(79, 70, 229);
          font-weight: 500;
          padding: 0 2px;
          border-radius: 2px;
          cursor: help;
          position: relative;
        }
        
        .techlingo-wiki-highlight:hover::after {
          content: attr(data-description);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          z-index: 10000;
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Get terms from storage
  function getTermsFromStorage() {
    return new Promise((resolve) => {
      if (chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(['techTerms'], (result) => {
          if (result.techTerms) {
            resolve(result.techTerms);
          } else {
            resolve([]);
          }
        });
      } else {
        resolve([]);
      }
    });
  }

  // Highlight terms in text
  async function highlightTerms() {
    try {
      // Don't do anything if highlighting is disabled
      if (!highlightEnabled) return;
      
      // Get terms from storage
      const terms = await getTermsFromStorage();
      if (!terms || terms.length === 0) {
        console.log('No terms found in storage');
        return;
      }
      
      console.log(`Found ${terms.length} terms to highlight`);
      
      // Create styles
      createHighlightStyles();
      
      // Sort terms by length (descending) to prioritize longer terms
      const sortedTerms = [...terms].sort((a, b) => b.term.length - a.term.length);
      
      // Define elements to skip
      const skipTags = {
        'SCRIPT': true, 'STYLE': true, 'NOSCRIPT': true, 
        'IFRAME': true, 'OBJECT': true, 'INPUT': true, 
        'TEXTAREA': true, 'SELECT': true, 'OPTION': true,
        'CODE': true, 'PRE': true
      };
      
      // Process text nodes
      function processNode(node) {
        // Skip if already processed
        if (processedNodes.has(node)) return;
        
        // Process element node and its children
        if (node.nodeType === 1) { // Element node
          // Skip certain elements
          if (skipTags[node.nodeName]) return;
          
          // Mark as processed
          processedNodes.add(node);
          
          // Process children
          for (const child of Array.from(node.childNodes)) {
            processNode(child);
          }
        } 
        // Process text node
        else if (node.nodeType === 3 && node.textContent.trim().length > 0) { // Text node with content
          const text = node.textContent;
          
          // Check for term matches
          let found = false;
          for (const term of sortedTerms) {
            const regex = new RegExp(`\\b(${escapeRegExp(term.term)})\\b`, 'gi');
            
            if (regex.test(text)) {
              found = true;
              
              // Replace the node with highlighted version
              const fragment = document.createDocumentFragment();
              let lastIndex = 0;
              let match;
              
              regex.lastIndex = 0; // Reset regex
              while ((match = regex.exec(text)) !== null) {
                // Add text before match
                if (match.index > lastIndex) {
                  fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
                }
                
                // Add highlighted match
                const span = document.createElement('span');
                span.className = 'techlingo-wiki-highlight';
                span.setAttribute('data-description', term.description || '');
                span.setAttribute('title', term.description || '');
                span.textContent = match[0];
                fragment.appendChild(span);
                
                lastIndex = regex.lastIndex;
              }
              
              // Add text after the last match
              if (lastIndex < text.length) {
                fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
              }
              
              // Replace the original node with our fragment
              if (node.parentNode) {
                node.parentNode.replaceChild(fragment, node);
                processedNodes.add(fragment);
              }
              
              break; // Stop after finding the first match
            }
          }
          
          // Mark as processed
          if (!found) {
            processedNodes.add(node);
          }
        }
      }
      
      // Start processing from body
      processNode(document.body);
      
      // Set up observer for dynamic content
      const observer = new MutationObserver((mutations) => {
        if (highlightEnabled) {
          for (const mutation of mutations) {
            if (mutation.type === 'childList') {
              mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Element node
                  processNode(node);
                }
              });
            }
          }
        }
      });
      
      // Start observing
      observer.observe(document.body, { childList: true, subtree: true });
    } catch (error) {
      console.error('Error highlighting terms:', error);
    }
  }

  // Remove all highlights
  function removeHighlights() {
    // Remove the highlight styles
    const style = document.getElementById('techlingo-wiki-styles');
    if (style) {
      style.remove();
    }
    
    // Remove all highlighted spans
    const highlights = document.querySelectorAll('.techlingo-wiki-highlight');
    for (const highlight of highlights) {
      if (highlight.parentNode) {
        const text = document.createTextNode(highlight.textContent);
        highlight.parentNode.replaceChild(text, highlight);
      }
    }
    
    // Reset processed nodes
    processedNodes = new WeakSet();
  }

  // Initialize the content script
  function init() {
    console.log('TechLingo Wiki content script initialized');
    
    // Load user preference
    chrome.storage.sync.get(['highlightEnabled'], (result) => {
      highlightEnabled = result.highlightEnabled || false;
      console.log('Highlight enabled:', highlightEnabled);
      
      // Apply highlighting if enabled
      if (highlightEnabled) {
        highlightTerms();
      }
    });
    
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log('Message received:', message);
      
      if (message.action === 'toggleHighlight') {
        highlightEnabled = message.enabled;
        
        if (highlightEnabled) {
          highlightTerms();
        } else {
          removeHighlights();
        }
        
        sendResponse({ success: true });
      }
      return true;
    });
  }

  // Run when page is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
