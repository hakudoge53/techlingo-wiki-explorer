
// This file serves as the entry point for the content script

(function() {
  console.log('TechLingo Wiki: Content script loaded');
  
  // Function to load dependencies in sequence with better error handling
  function loadScript(src, callback) {
    try {
      const script = document.createElement('script');
      script.src = chrome.runtime.getURL(src);
      script.onload = function() {
        script.remove(); // Clean up after loading
        if (callback) callback();
      };
      script.onerror = function(error) {
        console.error('TechLingo Wiki: Failed to load script', src, error);
        // Continue with next script to avoid complete failure
        if (callback) callback();
      };
      (document.head || document.documentElement).appendChild(script);
    } catch (error) {
      console.error('TechLingo Wiki: Error during script loading:', error);
      if (callback) callback(); // Continue the chain
    }
  }

  // Simplified error handling
  try {
    // Load scripts in sequence with better error handling
    loadScript('content/terms.js', function() {
      loadScript('content/highlight.js', function() {
        loadScript('content/observer.js', function() {
          loadScript('content/main.js', function() {
            console.log('TechLingo Wiki: All content scripts loaded successfully');
          });
        });
      });
    });
  } catch (e) {
    console.error('TechLingo Wiki: Failed to initialize content scripts', e);
  }
})();
