
// Create context menu item when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "lookupTerm",
    title: "Look up with TechLingo",
    contexts: ["selection"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "lookupTerm" && info.selectionText) {
    // Open the extension popup with the selected text as a query
    chrome.runtime.sendMessage({
      action: "lookupTerm",
      term: info.selectionText.trim()
    });
    
    // Open the extension popup
    chrome.action.openPopup();
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "lookupTerm") {
    // Store the term to be looked up
    chrome.storage.local.set({ lookupTerm: message.term }, () => {
      console.log("Term saved for lookup:", message.term);
    });
  }
  
  return true;
});
