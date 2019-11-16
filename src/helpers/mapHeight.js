const calculateMapBoundingBox = require("./common/calculateMapBoundingBox");

module.exports = function (plop) {
  plop.addHelper("mapHeight", function (routes, context) {
    const boundingBox = calculateMapBoundingBox(routes);
    return boundingBox.south;
  });
};
