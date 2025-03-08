
/**
 * Functions for managing tech terms
 */

// Get tech terms from storage or use default ones
async function getTerms() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['techTerms'], (result) => {
      let terms = result.techTerms;
      
      // If terms aren't in storage yet, use a hardcoded list
      if (!terms || !terms.length) {
        terms = [
          { term: "API", category: "Web Development" },
          { term: "HTML", category: "Web Development" },
          { term: "CSS", category: "Web Development" },
          { term: "JavaScript", category: "Programming" },
          { term: "React", category: "Web Development" },
          { term: "Docker", category: "DevOps" },
          { term: "Cloud Computing", category: "Cloud Computing" },
          { term: "SQL", category: "Databases" },
          { term: "Git", category: "DevOps" },
          { term: "REST", category: "Web Development" },
          { term: "Blockchain", category: "Cybersecurity" }
        ];
        
        // Save these for future use
        chrome.storage.local.set({ techTerms: terms });
      }
      
      // Sort terms by length (descending) to prioritize longer terms
      const sortedTerms = [...terms].sort((a, b) => 
        b.term.length - a.term.length
      );
      
      resolve(sortedTerms);
    });
  });
}

export { getTerms };
