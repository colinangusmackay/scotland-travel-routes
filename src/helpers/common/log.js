require("colors");

module.exports = function writeError (msg) {
  msg = msg.trim().brightYellow;
  const time = `[${new Date().toISOString()}] `.gray;
  const source = new Error().stack.split("\n")[2].trim().cyan;
  console.log(time + msg + " " + source);
};
