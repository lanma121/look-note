const fs = require("fs");
const logPath = `${__dirname}/log.txt`;

const log = (message) => {
  fs.appendFileSync(logPath, `${message} \n`);
};

const hostMessage = () => {
  process.stdin.on("readable", () => {
    var input = [];
    var chunk;
    log(logPath, `${new Date().toISOString()}===============`);
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
      const response = JSON.stringify({ status: 200, response: "Received message." });

      // Convert the response size to an unsigned 32-bit integer buffer
      const responseSize = Buffer.alloc(4);
      responseSize.writeUInt32LE(Buffer.from(response).length, 0);

      // Write the response size followed by the response to stdout
      process.stdout.write(responseSize);
      process.stdout.write(response);
    }
  });

  function sendMessage(msg) {
    var buffer = Buffer.from(JSON.stringify(msg));

    var header = Buffer.alloc(4);
    header.writeUInt32LE(buffer.length, 0);

    var data = Buffer.concat([header, buffer]);
    process.stdout.write(data);
  }

  process.on("uncaughtException", (err, signal) => {
    sendMessage({ error: err.toString() });
    fs.appendFileSync(
      "/Users/tliu1/tyler/myworkspace/chrome-editor/native/sss.txt",
      err.toString() + `and signal ${signal}`
    );
    process.exit(1);
  });

  process.on("beforeExit", (code) => {
    fs.appendFileSync(logPath, `Child process beforeExit with code ${code}`);
  });

  process.on("disconnect", (code) => {
    fs.appendFileSync(logPath, `Child process disconnect ${code}`);
  });

  process.on("rejectionHandled", (code) => {
    fs.appendFileSync(logPath, `Child process rejectionHandled`);
  });

  process.on("uncaughtExceptionMonitor", (err, signal) => {
    fs.appendFileSync(
      logPath,
      `Child process uncaughtExceptionMonitor with code ${err.toString()} and signal ${signal}`
    );
    process.exit(1);
  });

  process.on("unhandledRejection", (err) => {
    fs.appendFileSync(
      logPath,
      `Child process unhandledRejection with code ${err.toString()}`
    );
  });

  process.on("warning", (err) => {
    fs.appendFileSync(
      logPath,
      `Child process warning with code ${err.toString()}`
    );
  });

  process.on("multipleResolves", (err) => {
    fs.appendFileSync(logPath, `Child process multipleResolves`);
  });

  process.on("worker", (err) => {
    fs.appendFileSync(logPath, `Child process worker ===`);
  });

  process.on("message", (err) => {
    fs.appendFileSync(
      logPath,
      `Child process message with code ${err.toString()}`
    );
  });

  process.on("exit", (code, signal) => {
    fs.appendFileSync(
      logPath,
      `Child process exited with code ${code} and signal ${signal}`
    );
  });

  return sendMessage;
};
mmmm((a) => {
  console.log(1212121, a);
});
