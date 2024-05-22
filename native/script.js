const fs = require("fs");
const logPath = `${__dirname}/log.txt`;

const log = (message) => {
  fs.appendFileSync(logPath, `${message} \n`);
};

function sendMessage(msg) {
  log(JSON.stringify(msg));
  var buffer = Buffer.from(JSON.stringify(msg));

  var header = Buffer.alloc(4);
  header.writeUInt32LE(buffer.length, 0);

  var data = Buffer.concat([header, buffer]);
  process.stdout.write(data);
}

const receiveMessage = () => {
  process.stdin.on("readable", () => {
    try {
      var input = [];
      var chunk;
      log(`${new Date().toISOString()}===============`);
      while ((chunk = process.stdin.read())) {
        chunk && input.push(chunk);
      }
      if (!input.length) return;

      input = Buffer.concat(input);
      log(`input: ${input.toString()}`);

      var msgLen = input.readUInt32LE(0);
      var dataLen = msgLen + 4;
      log(`msgLen: ${msgLen} ====  input.length: ${input.length}`);

      if (input.length >= dataLen) {
        var content = input.slice(4, dataLen);
        var json = JSON.parse(content.toString());

        sendMessage({ status: 200, response: "Received message." });
      }
    } catch (error) {}
  });

  process.on("exit", (code, signal) => {
    sendMessage({message: `exited with code ${code}`});
  });

  process.on("uncaughtException", (err, signal) => {
    sendMessage({message: err.toString() + `and signal ${signal}`});
    process.exit(1);
  });

  process.on("uncaughtExceptionMonitor", (err, signal) => {
    sendMessage({message: 'uncaughtExceptionMonitor' + err.toString() + `and signal ${signal}`});
    process.exit(1);
  });

  // process.on("beforeExit", (code) => {
  //   fs.appendFileSync(logPath, `Child process beforeExit with code ${code}`);
  // });

  // process.on("disconnect", (code) => {
  //   fs.appendFileSync(logPath, `Child process disconnect ${code}`);
  // });

  // process.on("rejectionHandled", (code) => {
  //   fs.appendFileSync(logPath, `Child process rejectionHandled`);
  // });

  

  // process.on("unhandledRejection", (err) => {
  //   fs.appendFileSync(
  //     logPath,
  //     `Child process unhandledRejection with code ${err.toString()}`
  //   );
  // });

  // process.on("warning", (err) => {
  //   fs.appendFileSync(
  //     logPath,
  //     `Child process warning with code ${err.toString()}`
  //   );
  // });

  // process.on("multipleResolves", (err) => {
  //   fs.appendFileSync(logPath, `Child process multipleResolves`);
  // });

  // process.on("worker", (err) => {
  //   fs.appendFileSync(logPath, `Child process worker ===`);
  // });

  // process.on("message", (err) => {
  //   fs.appendFileSync(
  //     logPath,
  //     `Child process message with code ${err.toString()}`
  //   );
  // });

  
};

receiveMessage();