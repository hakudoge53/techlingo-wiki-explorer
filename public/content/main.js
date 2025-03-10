
// Main content script functionality for TechLingo Wiki

(function() {
  // Create namespace for our extension if it doesn't exist
  window.techLingo = window.techLingo || {};
  
  // Flag to prevent multiple initializations
  let isInitialized = false;
  
  // Configuration options
  const config = {
    enabled: true,
    highlightTerms: true,
    scanInterval: 2000, // ms between scans of page content
    debounceDelay: 300, // ms to wait before processing DOM changes
    maxTermsToProcess: 50 // limit number of terms processed per scan for performance
  };
  
  // Track last scan time to prevent excessive processing
  let lastScanTime = 0;
  let scanTimer = null;
  let processingQueue = false;
  
  /**
   * Initialize the main functionality
   */
  function initialize() {
    if (isInitialized) return;
    
    console.log('TechLingo Wiki: Initializing main module');
    
    // Listen for when terms are loaded
    document.addEventListener('techLingo:termsReady', (event) => {
      console.log('TechLingo Wiki: Terms ready event received', event.detail);
      if (config.enabled && config.highlightTerms) {
        // Schedule the first scan
        scheduleContentScan();
      }
    });
    
    // Load configuration from storage
    if (chrome.storage && chrome.storage.sync) {
      try {
        chrome.storage.sync.get(['techLingoConfig'], (result) => {
          if (result && result.techLingoConfig) {
            config = { ...config, ...result.techLingoConfig };
            console.log('TechLingo Wiki: Loaded configuration', config);
          }
        });
      } catch (error) {
        console.error('TechLingo Wiki: Error loading configuration', error);
      }
    }
    
    isInitialized = true;
  }
  
  /**
   * Schedule a content scan with debouncing
   */
  function scheduleContentScan() {
    if (scanTimer) {
      clearTimeout(scanTimer);
    }
    
    scanTimer = setTimeout(() => {
      scanPageContent();
    }, config.debounceDelay);
  }
  
  /**
   * Scan the page content for tech terms
   */
  function scanPageContent() {
    // Skip if already processing or if scanned too recently
    if (processingQueue || Date.now() - lastScanTime < config.scanInterval) {
      return;
    }
    
    console.log('TechLingo Wiki: Scanning page content');
    lastScanTime = Date.now();
    processingQueue = true;
    
    try {
      // In a real implementation, this would identify tech terms in the page
      // For now, we'll just log that we're scanning
      console.log('TechLingo Wiki: Page scan complete');
      
      // Process limited number of terms for better performance
      const terms = window.techLingo.cachedTerms || [];
      const termsToProcess = terms.slice(0, config.maxTermsToProcess);
      
      if (termsToProcess.length > 0) {
        console.log('TechLingo Wiki: Processing', termsToProcess.length, 'terms');
        // Actual term highlighting would happen here
      }
    } catch (error) {
      console.error('TechLingo Wiki: Error scanning page content', error);
    } finally {
      processingQueue = false;
    }
  }
  
  // Expose functionality to the global TechLingo namespace
  window.techLingo.main = {
    initialize,
    scanPageContent,
    config
  };
  
  // Auto-initialize when loaded
  initialize();
})();
