module.exports = function (plop) {
  require("./setData")(plop);
  require("./offset")(plop);
  require("./renderCell")(plop);
  require("./renderConnector")(plop);
  require("./renderInterchange")(plop);
  require("./renderLabel")(plop);
  require("./renderTerminator")(plop);
};
