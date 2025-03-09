
/**
 * Main content script for TechLingo Wiki extension
 */

import { escapeRegExp, createHighlightStyles, removeHighlights } from './highlight.js';
import { getTermsFromStorage } from './terms.js';
import { setupMutationObserver } from './observer.js';

// State for the extension
let highlightEnabled = false;
let processedNodes = new WeakSet();

// Function to highlight terms on the page
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
    const processNode = function(node) {
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
    };
    
    // Start processing from body
    processNode(document.body);
    
    // Set up observer for future DOM changes
    setupMutationObserver(highlightEnabled, processNode);
  } catch (error) {
    console.error('Error highlighting terms:', error);
  }
}

// Reset highlighting state
function resetHighlighting() {
  removeHighlights();
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
        resetHighlighting();
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

export { highlightTerms, resetHighlighting, init };
