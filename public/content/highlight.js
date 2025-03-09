
// Highlighting related functionality

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
}

export { escapeRegExp, createHighlightStyles, removeHighlights };
