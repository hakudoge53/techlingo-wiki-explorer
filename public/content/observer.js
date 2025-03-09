
// DOM Observation functionality

let processNode;

// Set up observer for dynamic content
function setupMutationObserver(highlightEnabled, processNodeFunc) {
  processNode = processNodeFunc;
  
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
  
  return observer;
}

export { setupMutationObserver };
