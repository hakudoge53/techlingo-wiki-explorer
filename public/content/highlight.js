
(function() {
  // Create namespace for our extension
  window.techLingo = window.techLingo || {};
  
  // CSS for highlighted terms
  const HIGHLIGHT_CLASS = 'techlingo-highlighted-term';
  const HIGHLIGHT_TOOLTIP_CLASS = 'techlingo-tooltip';
  
  // Generate highlight styles
  function generateHighlightStyles(color) {
    return `
      .${HIGHLIGHT_CLASS} {
        background-color: ${color}20;
        color: ${color};
        border-radius: 0.125rem;
        padding: 0.125rem 0.25rem;
        font-weight: 500;
        cursor: help;
        position: relative;
        text-decoration: none !important;
        display: inline;
      }
      .${HIGHLIGHT_CLASS}:hover {
        background-color: ${color}40;
      }
      .${HIGHLIGHT_TOOLTIP_CLASS} {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #1f2937;
        color: white;
        padding: 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        max-width: 300px;
        z-index: 9999;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s;
        white-space: normal;
        text-align: left;
      }
      .${HIGHLIGHT_CLASS}:hover .${HIGHLIGHT_TOOLTIP_CLASS} {
        opacity: 1;
      }
    `;
  }

  // Add styles to the page
  function addHighlightStyles(color) {
    const styleId = 'techlingo-styles';
    let styleEl = document.getElementById(styleId);
    
    // If style exists, update it
    if (styleEl) {
      styleEl.textContent = generateHighlightStyles(color);
    } else {
      // Create new style element
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = generateHighlightStyles(color);
      document.head.appendChild(styleEl);
    }
  }

  // Remove styles from the page
  function removeHighlightStyles() {
    const styleEl = document.getElementById('techlingo-styles');
    if (styleEl) {
      styleEl.remove();
    }
  }

  // Create regular expressions for term matching
  function createTermRegex(term) {
    // Escape special regex characters and ensure word boundaries
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b(${escapedTerm})\\b`, 'gi');
  }

  // Check if element should be skipped for highlighting
  function shouldSkipElement(element) {
    if (!element) return true;
    
    // Skip specific tags
    const skipTags = ['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'CODE', 'PRE'];
    if (skipTags.includes(element.tagName)) return true;
    
    // Skip elements with certain classes
    if (element.classList && (
      element.classList.contains(HIGHLIGHT_CLASS) ||
      element.classList.contains('techlingo-processed') ||
      element.classList.contains('code') ||
      element.classList.contains('highlight')
    )) return true;
    
    // Skip elements with contenteditable
    if (element.getAttribute('contenteditable') === 'true') return true;
    
    return false;
  }

  // Highlight terms in text nodes
  function highlightTermsInTextNode(textNode, terms, highlightColor) {
    if (!textNode || !textNode.nodeValue || !terms || terms.length === 0) {
      return;
    }

    const parent = textNode.parentNode;
    
    if (shouldSkipElement(parent)) {
      return;
    }

    let text = textNode.nodeValue;
    let matches = false;
    let resultHTML = text;

    // Process each term
    for (const termObj of terms) {
      const regex = createTermRegex(termObj.term);
      
      // Only replace if we have matches
      if (regex.test(resultHTML)) {
        matches = true;
        resultHTML = resultHTML.replace(regex, (match) => {
          return `<span class="${HIGHLIGHT_CLASS}" data-term-id="${termObj.id}">
            ${match}
            <span class="${HIGHLIGHT_TOOLTIP_CLASS}">
              <strong>${termObj.term}</strong> (${termObj.category})
              <br>${termObj.description}
            </span>
          </span>`;
        });
      }
    }

    // If we have matches, replace the text node with the HTML
    if (matches) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = resultHTML;
      
      const fragment = document.createDocumentFragment();
      while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
      }
      
      parent.replaceChild(fragment, textNode);
    }
  }

  // Process a single node
  function processNode(node, terms, highlightColor) {
    if (!node || !terms || terms.length === 0) {
      return;
    }

    // Skip if node should be excluded
    if (shouldSkipElement(node)) {
      return;
    }

    // Add styles
    addHighlightStyles(highlightColor);

    // Create TreeWalker to find text nodes
    const walker = document.createTreeWalker(
      node,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          // Skip empty text nodes and nodes that are already in highlighted spans
          if (!node.nodeValue.trim() || 
              shouldSkipElement(node.parentNode)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    // Collect text nodes first
    const textNodes = [];
    let currentNode;
    while (currentNode = walker.nextNode()) {
      textNodes.push(currentNode);
    }

    // Process each text node
    textNodes.forEach(textNode => {
      highlightTermsInTextNode(textNode, terms, highlightColor);
    });
  }

  // Process the entire page
  function processPage(terms, highlightColor) {
    // Remove existing highlights first
    removeAllHighlights();
    
    // Add styles
    addHighlightStyles(highlightColor);
    
    // Process the body
    processNode(document.body, terms, highlightColor);
    
    // Start observing for changes
    window.techLingo.observer.startObserver();
  }

  // Remove all highlights from the page
  function removeAllHighlights() {
    // Stop observing
    window.techLingo.observer.stopObserver();
    
    // Remove styles
    removeHighlightStyles();
    
    // Remove highlight spans
    const highlights = document.querySelectorAll(`.${HIGHLIGHT_CLASS}`);
    highlights.forEach(highlight => {
      // Get the text content and replace the highlight with it
      const text = highlight.firstChild.textContent;
      const textNode = document.createTextNode(text);
      highlight.parentNode.replaceChild(textNode, highlight);
    });
  }

  // Setup click handling
  function setupClickHandling() {
    document.addEventListener('click', function(event) {
      const target = event.target;
      
      // Check if the click was on a highlighted term
      if (target.classList && target.classList.contains(HIGHLIGHT_CLASS)) {
        const termId = target.getAttribute('data-term-id');
        if (termId && typeof chrome !== 'undefined' && chrome.runtime) {
          chrome.runtime.sendMessage({
            action: 'openTerm',
            termId: termId
          });
        }
      }
    });
  }

  // Initialize
  function initialize() {
    setupClickHandling();
  }

  // Make functions accessible
  window.techLingo.highlight = {
    processNode,
    processPage,
    removeAllHighlights,
    initialize
  };
  
  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
