/**
 * Doc:
 * https://chrome.jscn.org/docs/extensions/mv3/intro/mv3-overview/
 * github.com/GoogleChrome/chrome-extensions-samples
 * https://developer.chrome.com/docs/apps/nativeMessaging/#:~:text=runtime.sendNativeMessage%20can%20be%20used%20to%20send%20a%20message,%7D%2C%20function%28response%29%20%7B%20console.log%28%22Received%20%22%20%2B%20response%29%3B%20%7D%29%3B
 * https://github.com/GoogleChrome/developer.chrome.com/blob/main/site/en/docs/extensions/mv3/nativeMessaging/index.md#native-messaging-host-protocol
 */

// import * as CC from 'chrome';

// chrome.runtime.onInstalled.addListener(function (details) {
//   if (details.reason === "install") {
//     // Perform initialization tasks
//   }
//   console.log("---------onInstalled");
// });

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.greeting === "hello") {
//     sendResponse({ farewell: "goodbye" });
//   }
//   console.log("---------onMessage");
// });

// chrome.tabs.onCreated.addListener(function (tab) {
//   console.log("---------onCreated");
//   // Perform actions when a new tab is created
// });

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   console.log("---------onUpdated");

//   if (changeInfo.status === "complete") {
//     // Perform actions when the page finishes loading
//   }
// });

// chrome.action.onClicked.addListener(function (tab) {
//   // Perform actions when the user clicks on the button
//   console.log("---------browserAction");
// });

// chrome.pageAction.onClicked.addListener(function (tab) {
//     // Perform actions when the user clicks on the button
//     console.log("---------pageAction");
//   });

// chrome.contextMenus.onClicked.addListener(function (info, tab) {
//   // Perform actions when the user clicks on the item
//   console.log("---------contextMenus");
// });

// https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging#native-messaging-host-location

/**
 * each message is serialized using JSON, UTF-8 encoded and is preceded with 32-bit message length in native byte order. The maximum size of a single message from the native messaging host is 1 MB, mainly to protect Chrome from misbehaving native applications. The maximum size of the message sent to the native messaging host is 4 GB.


 * @param {*} message 
 */
function sendMessageToNativeHost(message) {
    
  // chrome.runtime.connectNative('com.example.nativeapp', function(port) {
  //   console.log('Connected to native app');
  //   port.postMessage({ action: 'hello' });
  // });
    chrome.runtime.sendNativeMessage('com.extension.mynotes', { message },
      function(response) {
        if (chrome.runtime.lastError) {
            console.error('Error sending message to native host:', chrome.runtime.lastError);
        } else {
            console.log('Received response from native host:', response);
        }
    });
  }

  // console.log('=========', CC);
  
  sendMessageToNativeHost({text: "Hello, native host!"});

  console.log('chrome:', chrome);
  // console.log('self:', chrome.runtime.getBackgroundPage());

//   const message = { text: "Hello from test script!" };
// const messageString = JSON.stringify(message);

// // Allocate a buffer for the message size in bytes
// const size = Buffer.alloc(4);
// // Write the message size to the buffer (we only need the first 4 bytes)
// size.writeUInt32LE(messageString.length, 0);