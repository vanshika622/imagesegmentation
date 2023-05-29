// chrome.runtime.onInstalled.addListener(() => {
//     chrome.storage.sync.get("password", (result) => {
//       if (!result.password) {
//         chrome.tabs.create({ url: chrome.runtime.getURL("setpassword.html") });
//       }
//     });
//   });
  
//   chrome.action.onClicked.addListener((tab) => {
//     chrome.storage.sync.get("password", (result) => {
//       if (result.password) {
//         chrome.tabs.create({ url: chrome.runtime.getURL("login.html") });
//       } else {
//         chrome.tabs.create({ url: chrome.runtime.getURL("setpassword.html") });
//       }
//     });
//   });
  
//   chrome.action.onClicked.addListener((tab) => {
//     chrome.storage.sync.get("password", (result) => {
//       if (result.password) {
//         chrome.tabs.create({ url: chrome.runtime.getURL("login.html") });
//       } else {
//         chrome.tabs.create({ url: chrome.runtime.getURL("setpassword.html") });
//       }
//     });
//   });
debugger;
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("firstTime", (result) => {
    debugger;
    if (!result.firstTime || result.firstTime) {
      chrome.storage.local.set({ firstTime: true }, () => {
        chrome.tabs.create({ url: chrome.runtime.getURL("setpassword.html") });
      });
    }
  });
});


debugger;

// chrome.webNavigation.onCompleted.addListener(function(details) {
//   // Code to execute when a page finishes loading
//   chrome.storage.local.get(['Isdataset'], function (result) {
    
//     if (result.Isdataset) {
//      console.log("loaded")
//       chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//         console.log("loaded 2")
//         chrome.tabs.sendMessage(tabs[0].id, { action: "showLoginModal" });
//       });
      
//     }
//   });
// });
chrome.webNavigation.onCompleted.addListener(function(details) {
  if (details.frameId === 0 && details.tabId !== -1) {
    console.log("loaded")
    chrome.storage.local.get(['Isdataset'], function (result) {
      console.log("loaded 1")
      if (result.Isdataset) {
        console.log("loaded 2")
    chrome.tabs.executeScript(details.tabId, { file: "content.js" });
      }
  });
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "show_login") {
    chrome.tabs.update(sender.tab.id, { url: "login.html" });
  }
});



// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   if (changeInfo.status == 'complete') {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       var activeTab = tabs[0];
//       chrome.windows.create({
//         type: 'popup',
//         url: chrome.extension.getURL('login.html'),
        
//       }, function(window) {
//         // Popup window opened successfully
//       });
//     });
//   }
// });

