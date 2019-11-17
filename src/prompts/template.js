const fs = require("fs");
const path = require("path");

module.exports = {
  type: "input",
  name: "template",
  filter: function (input) {
    // This runs before the validate, so empty input is just passed through
    if (input === "") { return ""; }
    return input;
  },
  validate: function (input) {
    if (input === "") { return "Source cannot be empty. A value must be supplied."; }
    const fullPath = path.resolve(input);
    if (fs.existsSync(fullPath)) { return true; }
    return `The source file must exist. "${fullPath}" does not.`;
  },
  message: "What is the source file (it must exist)"
};
