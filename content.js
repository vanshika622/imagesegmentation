// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//   if (message.action === 'showLoginModal') {
//     debugger;
//     // Code to display the login modal or perform any other login-related action
//     // For example, you can show the modal by injecting HTML and CSS into the page
//     chrome.tabs.create({ url: chrome.runtime.getURL("login.html") });
//   }
// });
chrome.runtime.sendMessage({ message: "show_login" });
