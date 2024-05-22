const { spawn } = require('child_process');

// Start the native host process
// const nativeHost = spawn('/Users/tliu1/tyler/myworkspace/chrome-editor/native/script');
const nativeHost = spawn('node', ['/Users/tliu1/tyler/myworkspace/chrome-editor/native/ssss.js']);

// Prepare a message object
const message = { text: "Hello from test script!" };
const messageString = JSON.stringify(message);

// Allocate a buffer for the message size in bytes
const size = Buffer.alloc(4);
// Write the message size to the buffer (we only need the first 4 bytes)
size.writeUInt32LE(messageString.length, 0);
// Send the message size followed by the message itself to the native host
nativeHost.stdin.write(Buffer.concat([size, Buffer.from(messageString)]));
// nativeHost.stdin.write(messageString, (error) => {
//   console.log('===Error:',error);
// });

// Handle the response from the native host
nativeHost.stdout.on('data', (data) => {
  console.log('From native host:', data.toString());
});

nativeHost.stderr.on('data', (data) => {
  console.error('Error from native host:', data.toString());
});

nativeHost.on('close', (code) => {
  console.log(`Native host process exited with code ${code}`);
});

