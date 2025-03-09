
// This file serves as the entry point for the content script
// It loads the necessary modules in the correct order using script tags

(function() {
  // Load dependencies in sequence
  function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(src);
    script.onload = callback || function() {};
    (document.head || document.documentElement).appendChild(script);
  }

  // Load scripts in the right order to ensure dependencies are available
  loadScript('content/highlight.js', function() {
    loadScript('content/terms.js', function() {
      loadScript('content/observer.js', function() {
        loadScript('content/main.js');
      });
    });
  });

  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'toggleHighlight') {
      // Forward the message to the window context
      document.dispatchEvent(new CustomEvent('techLingo.toggleHighlight', { 
        detail: { enabled: request.enabled } 
      }));
      sendResponse({ success: true });
    }
    return true; // Indicates we'll respond asynchronously
  });
})();
