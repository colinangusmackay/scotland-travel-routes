const calculateMapBoundingBox = require("./common/calculateMapBoundingBox");

module.exports = function (plop) {
  plop.addHelper("mapWidth", function (routes, context) {
    const boundingBox = calculateMapBoundingBox(routes);
    return boundingBox.east;
  });
};
