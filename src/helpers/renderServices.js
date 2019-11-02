const Handlebars = require("handlebars");
const standard = require("./common/standardConsts");
const getRoute = require("./common/getRoute");
const generatePolygon = require("./common/generatePolygon");

module.exports = function (plop) {
  plop.addHelper("renderServices", function (junction, context) {
    let rendered = "";
    if (junction.type === "services") {
      const route = getRoute(context);
      rendered += "\n<!-- Services: --> ";
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
          case "s": {
            path.push({ x: junction.x - standard.cellHalfSize, y: junction.y });
            path.push({ x: junction.x, y: junction.y + standard.cellHalfSize });
            path.push({ x: junction.x + standard.cellHalfSize, y: junction.y });
            path.push({ x: junction.x - standard.cellHalfSize, y: junction.y });
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
