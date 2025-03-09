
// Term highlighting functionality

(function() {
  // Create namespace for our extension if it doesn't exist
  window.techLingo = window.techLingo || {};
  
  // CSS for highlighted terms
  const HIGHLIGHT_CLASS = 'techlingo-highlighted-term';
  const HIGHLIGHT_STYLE = `
    .${HIGHLIGHT_CLASS} {
      background-color: rgba(59, 130, 246, 0.1);
      color: rgb(59, 130, 246);
      border-radius: 0.25rem;
      padding: 0.125rem 0.25rem;
      font-weight: 500;
      cursor: help;
      position: relative;
      text-decoration: none !important;
    }
    .${HIGHLIGHT_CLASS}:hover {
      background-color: rgba(59, 130, 246, 0.2);
    }
  `;

  // Add style to the page
  function addHighlightStyles() {
    if (!document.getElementById('techlingo-styles')) {
      const style = document.createElement('style');
      style.id = 'techlingo-styles';
      style.textContent = HIGHLIGHT_STYLE;
      document.head.appendChild(style);
    }
  }

  // Remove styles from the page
  function removeHighlightStyles() {
    const style = document.getElementById('techlingo-styles');
    if (style) {
      style.remove();
    }
  }

  // Create regular expressions for term matching
  function createTermRegex(term) {
    // Escape special regex characters and create a word boundary match
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b(${escapedTerm})\\b`, 'gi');
  }

  // Highlight terms in text nodes
  function highlightTermsInTextNode(textNode, terms) {
    if (!textNode || !textNode.nodeValue || !terms || terms.length === 0) {
      return;
    }

    const parent = textNode.parentNode;
    
    // Skip if parent is a script, style, or already highlighted
    if (!parent || 
        parent.tagName === 'SCRIPT' || 
        parent.tagName === 'STYLE' || 
        parent.tagName === 'TEXTAREA' || 
        parent.tagName === 'INPUT' ||
        parent.classList?.contains(HIGHLIGHT_CLASS)) {
      return;
    }

    let text = textNode.nodeValue;
    let matches = false;
    let resultHTML = text;

    // Process each term
    for (const termObj of terms) {
      const term = termObj.term;
      const regex = createTermRegex(term);
      
      // Only replace if we have matches
      if (regex.test(resultHTML)) {
        matches = true;
        resultHTML = resultHTML.replace(regex, (match) => {
          return `<span class="${HIGHLIGHT_CLASS}" title="${termObj.description.replace(/"/g, '&quot;')}">${match}</span>`;
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

  // Process all text nodes in a given node
  function highlightTermsInNode(rootNode, terms) {
    if (!rootNode || !terms || terms.length === 0) {
      return;
    }

    // Ensure styles are added
    addHighlightStyles();

    // Create a TreeWalker to efficiently iterate through text nodes
    const walker = document.createTreeWalker(
      rootNode,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          // Skip empty text nodes and nodes that are already in highlighted spans
          if (!node.nodeValue.trim() || 
              node.parentNode.classList?.contains(HIGHLIGHT_CLASS)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    // Process each text node
    const textNodes = [];
    let currentNode;
    while (currentNode = walker.nextNode()) {
      textNodes.push(currentNode);
    }

    // Process collected nodes (doing this separately to avoid issues with TreeWalker during DOM modifications)
    textNodes.forEach(node => highlightTermsInTextNode(node, terms));
  }

  // Remove all highlights from the page
  function removeAllHighlights() {
    const highlights = document.querySelectorAll(`.${HIGHLIGHT_CLASS}`);
    
    highlights.forEach(highlight => {
      // Get the text content and replace the highlight with it
      const text = highlight.textContent;
      const textNode = document.createTextNode(text);
      highlight.parentNode.replaceChild(textNode, highlight);
    });

    // Clean up by removing the styles
    removeHighlightStyles();
  }

  // Expose our functionality to the global TechLingo namespace
  window.techLingo.highlight = {
    highlightTermsInNode,
    removeAllHighlights
  };
})();
