const Handlebars = require("handlebars");
const standard = require("./common/standardConsts");
const getRoute = require("./common/getRoute");
const generatePolygon = require("./common/generatePolygon");

module.exports = function (plop) {
  plop.addHelper("renderServices", function (junction, context) {
    let rendered = context.data.root.displayDebugGuides ? "<!-- Services -->" : "";
    if (junction.type === "services") {
      const route = getRoute(context);
      const sides = junction.serviceSides.split(",");
      sides.forEach(side => {
        const path = [];
        switch (side) {
          case "n": {
            path.push({ x: junction.x - standard.cellHalfSize, y: junction.y });
            path.push({ x: junction.x, y: junction.y - standard.cellHalfSize });
            path.push({ x: junction.x + standard.cellHalfSize, y: junction.y });
            path.push({ x: junction.x - standard.cellHalfSize, y: junction.y });
            break;
          }
          case "e": {
            path.push({x: junction.x, y: junction.y - standard.cellHalfSize});
            path.push({x: junction.x + standard.cellHalfSize, y: junction.y});
            path.push({x: junction.x, y: junction.y + standard.cellHalfSize});
            path.push({x: junction.x, y: junction.y - standard.cellHalfSize});
            break;
          }
          case "s": {
            path.push({ x: junction.x - standard.cellHalfSize, y: junction.y });
            path.push({ x: junction.x, y: junction.y + standard.cellHalfSize });
            path.push({ x: junction.x + standard.cellHalfSize, y: junction.y });
            path.push({ x: junction.x - standard.cellHalfSize, y: junction.y });
            break;
          }
          case "w": {
            path.push({x: junction.x, y: junction.y - standard.cellHalfSize});
            path.push({x: junction.x - standard.cellHalfSize, y: junction.y});
            path.push({x: junction.x, y: junction.y + standard.cellHalfSize});
            path.push({x: junction.x, y: junction.y - standard.cellHalfSize});
            break;
          }
          default: {
            console.log(`Unexpected service side, "${side}" (in ${junction.serviceSides}), on "${context.data._parent.key}.${context.data.key}".`);
            break;
          }
        }
        rendered += generatePolygon(path, {
          fill: route.colour
        });
      });
    }
    return new Handlebars.SafeString(rendered);
  });
};
