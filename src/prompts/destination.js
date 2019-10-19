const path = require("path");

module.exports = {
  type: "input",
  name: "destination",
  validate: function (input) {
    if (input === "") { return "Destination cannot be empty. A value must be supplied."; }
    return true;
  },
  message: "What is the destination (if exists it may be overwritten without further warning)"
};
