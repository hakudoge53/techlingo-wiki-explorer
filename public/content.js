
// This script runs in the context of the web page
(function() {
  let glossaryTerms = [];
  let tooltipElement = null;

  // Handle messages from the popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateGlossary') {
      glossaryTerms = message.terms;
      highlightTermsOnPage();
      sendResponse({ success: true });
    }
    return true;
  });

  // Create a tooltip element
  function createTooltip() {
    if (tooltipElement) return;
    
    tooltipElement = document.createElement('div');
    tooltipElement.id = 'tech-glossary-tooltip';
    tooltipElement.style.cssText = `
      position: absolute;
      max-width: 300px;
      background: white;
      border: 1px solid #ccc;
      border-radius: 6px;
      padding: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 10000;
      font-size: 14px;
      line-height: 1.4;
      display: none;
    `;
    
    document.body.appendChild(tooltipElement);
  }

  // Show the tooltip at the specified position with the given content
  function showTooltip(x, y, content) {
    if (!tooltipElement) createTooltip();
    
    tooltipElement.innerHTML = content;
    tooltipElement.style.left = `${x}px`;
    tooltipElement.style.top = `${y}px`;
    tooltipElement.style.display = 'block';
  }

  // Hide the tooltip
  function hideTooltip() {
    if (tooltipElement) {
      tooltipElement.style.display = 'none';
    }
  }

  // Highlight terms on the page
  function highlightTermsOnPage() {
    if (!glossaryTerms || glossaryTerms.length === 0) return;
    
    // First, create the tooltip if it doesn't exist
    createTooltip();
    
    // Get all text nodes in the body
    const textNodes = [];
    function getTextNodes(node) {
      if (node.nodeType === 3) { // Text node
        textNodes.push(node);
      } else if (node.nodeType === 1 && 
                !['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'OBJECT'].includes(node.nodeName) &&
                !node.classList.contains('tech-glossary-highlighted')) {
        for (let i = 0; i < node.childNodes.length; i++) {
          getTextNodes(node.childNodes[i]);
        }
      }
    }
    
    getTextNodes(document.body);
    
    // Sort terms by length (longest first) to handle overlapping terms
    const sortedTerms = [...glossaryTerms].sort((a, b) => 
      b.term.length - a.term.length
    );
    
    // Process each text node
    textNodes.forEach(textNode => {
      const parent = textNode.parentNode;
      if (!parent) return;
      
      let innerHTML = textNode.nodeValue;
      let hasMatch = false;
      
      sortedTerms.forEach(termObj => {
        const term = termObj.term;
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        
        if (regex.test(innerHTML)) {
          hasMatch = true;
          innerHTML = innerHTML.replace(regex, match => {
            const termId = termObj.id;
            const definition = termObj.definition;
            const category = termObj.category;
            
            return `<span class="tech-glossary-highlighted" 
                         data-term-id="${termId}" 
                         data-term="${match}" 
                         data-definition="${definition}"
                         data-category="${category}"
                         style="border-bottom: 1px dotted #4a86e8; cursor: help; position: relative;">${match}</span>`;
          });
        }
      });
      
      if (hasMatch) {
        const span = document.createElement('span');
        span.innerHTML = innerHTML;
        parent.replaceChild(span, textNode);
      }
    });
    
    // Add event listeners for all highlighted terms
    document.body.addEventListener('mouseover', event => {
      const target = event.target;
      if (target.classList && target.classList.contains('tech-glossary-highlighted')) {
        const term = target.getAttribute('data-term');
        const definition = target.getAttribute('data-definition');
        const category = target.getAttribute('data-category');
        
        const rect = target.getBoundingClientRect();
        const x = rect.left + window.scrollX;
        const y = rect.bottom + window.scrollY + 5; // 5px below the term
        
        showTooltip(x, y, `
          <div>
            <strong>${term}</strong> <span style="color: #666; font-size: 12px;">(${category})</span>
            <div style="margin-top: 5px;">${definition}</div>
          </div>
        `);
      }
    });
    
    document.body.addEventListener('mouseout', event => {
      const target = event.target;
      if (target.classList && target.classList.contains('tech-glossary-highlighted')) {
        hideTooltip();
      }
    });
  }

  // Store any terms sent from the extension
  chrome.storage.local.get(['glossaryTerms'], function(result) {
    if (result.glossaryTerms) {
      glossaryTerms = result.glossaryTerms;
    }
  });
})();
