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

