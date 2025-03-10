
// TechLingo Wiki Content Script
(function() {
  console.log('TechLingo Wiki: Content script loaded');
  
  // Store the glossary data
  let glossaryTerms = [];
  
  // Function to fetch glossary data
  async function fetchGlossaryData() {
    try {
      // For now, we'll use local data from chrome.storage
      // This will be populated from the popup when users search/view terms
      const result = await chrome.storage.local.get('glossaryTerms');
      if (result.glossaryTerms) {
        glossaryTerms = result.glossaryTerms;
        highlightTermsOnPage();
      } else {
        console.log('TechLingo Wiki: No terms found in storage');
      }
    } catch (error) {
      console.error('TechLingo Wiki: Error fetching glossary data:', error);
    }
  }

  // Function to highlight technical terms on the page
  function highlightTermsOnPage() {
    if (!glossaryTerms.length) return;
    
    // Only scan text in these elements to avoid changing UI elements
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, td, th, span, div:not(:has(*))');
    
    textElements.forEach(element => {
      // Skip elements that are part of the extension's UI
      if (element.closest('.tech-lingo-wiki-tooltip')) return;
      
      // Get all text nodes in this element
      const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      
      const textNodes = [];
      let node;
      while ((node = walker.nextNode())) {
        if (node.nodeValue.trim().length > 0) {
          textNodes.push(node);
        }
      }
      
      // Process each text node
      textNodes.forEach(textNode => {
        let content = textNode.nodeValue;
        let modified = false;
        
        // Check each term against this text node
        glossaryTerms.forEach(term => {
          const termRegex = new RegExp(`\\b${term.name}\\b`, 'gi');
          if (termRegex.test(content)) {
            // Found a match, replace it with highlighted version
            const replacedContent = content.replace(termRegex, match => {
              modified = true;
              return `###HIGHLIGHT_START###${match}###HIGHLIGHT_END###`;
            });
            
            if (modified) {
              content = replacedContent;
            }
          }
        });
        
        // If we made changes, replace the text node with our highlighted version
        if (modified) {
          const fragment = document.createDocumentFragment();
          const parts = content.split(/(###HIGHLIGHT_START###|###HIGHLIGHT_END###)/g);
          
          let isHighlighted = false;
          parts.forEach(part => {
            if (part === '###HIGHLIGHT_START###') {
              isHighlighted = true;
            } else if (part === '###HIGHLIGHT_END###') {
              isHighlighted = false;
            } else if (part.length > 0) {
              if (isHighlighted) {
                // Create highlighted element
                const span = document.createElement('span');
                span.className = 'tech-lingo-wiki-term';
                span.style.backgroundColor = '#e6f7ff';
                span.style.borderBottom = '1px dotted #1890ff';
                span.style.cursor = 'help';
                span.textContent = part;
                
                // Add event listener for tooltips
                span.addEventListener('mouseenter', (e) => showTooltip(e, part));
                span.addEventListener('mouseleave', hideTooltip);
                
                fragment.appendChild(span);
              } else {
                // Regular text
                fragment.appendChild(document.createTextNode(part));
              }
            }
          });
          
          // Replace the original text node with our fragment
          textNode.parentNode.replaceChild(fragment, textNode);
        }
      });
    });
  }
  
  // Functions for tooltip handling
  function showTooltip(event, term) {
    const matchedTerm = glossaryTerms.find(t => 
      t.name.toLowerCase() === term.toLowerCase()
    );
    
    if (!matchedTerm) return;
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tech-lingo-wiki-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.zIndex = '9999';
    tooltip.style.maxWidth = '300px';
    tooltip.style.backgroundColor = 'white';
    tooltip.style.color = '#333';
    tooltip.style.borderRadius = '4px';
    tooltip.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
    tooltip.style.padding = '8px 12px';
    tooltip.style.fontSize = '14px';
    tooltip.style.lineHeight = '1.5';
    
    // Term title
    const title = document.createElement('div');
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '4px';
    title.textContent = matchedTerm.name;
    tooltip.appendChild(title);
    
    // Term definition
    const definition = document.createElement('div');
    definition.textContent = matchedTerm.definition;
    tooltip.appendChild(definition);
    
    // Add link if available
    if (matchedTerm.url) {
      const link = document.createElement('a');
      link.href = matchedTerm.url;
      link.target = '_blank';
      link.textContent = 'Read more';
      link.style.display = 'block';
      link.style.marginTop = '6px';
      link.style.color = '#1890ff';
      link.style.textDecoration = 'none';
      tooltip.appendChild(link);
    }
    
    // Position the tooltip
    document.body.appendChild(tooltip);
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
    
    // Add a small CSS class definition to handle tooltip styling
    if (!document.querySelector('#tech-lingo-wiki-styles')) {
      const style = document.createElement('style');
      style.id = 'tech-lingo-wiki-styles';
      style.textContent = `
        .tech-lingo-wiki-term:hover {
          background-color: #bae7ff !important;
        }
        
        .tech-lingo-wiki-tooltip {
          animation: fadein 0.2s;
        }
        
        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  function hideTooltip() {
    const tooltips = document.querySelectorAll('.tech-lingo-wiki-tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
  }
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateGlossary') {
      glossaryTerms = message.terms;
      chrome.storage.local.set({ glossaryTerms });
      highlightTermsOnPage();
      sendResponse({ success: true });
    }
  });
  
  // Initialize
  fetchGlossaryData();
  
  // Re-run when page content changes significantly
  const observer = new MutationObserver((mutations) => {
    // Only re-highlight if there are significant DOM changes
    const significantChanges = mutations.some(mutation => 
      mutation.addedNodes.length > 0 &&
      Array.from(mutation.addedNodes).some(node => 
        node.nodeType === Node.ELEMENT_NODE &&
        ['DIV', 'SECTION', 'ARTICLE'].includes(node.nodeName)
      )
    );
    
    if (significantChanges && glossaryTerms.length > 0) {
      // Delay to allow DOM to settle
      setTimeout(highlightTermsOnPage, 500);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
