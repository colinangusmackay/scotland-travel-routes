module.exports = function (plop) {
  require("./setData")(plop);
  require("./offset")(plop);
  require("./junctionComment")(plop);
  require("./mapHeight")(plop);
  require("./mapWidth")(plop);
  require("./renderCell")(plop);
  require("./renderConnector")(plop);
  require("./renderInformation")(plop);
  require("./renderInterchange")(plop);
  require("./renderJunction")(plop);
  require("./renderLabel")(plop);
  require("./renderLegendEntry")(plop);
  require("./renderServices")(plop);
  require("./renderTerminator")(plop);
};
