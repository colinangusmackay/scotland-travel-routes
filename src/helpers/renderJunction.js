const standard = require("./common/standardConsts");
const generatePolyline = require("./common/generatePolyline");
const getRoute = require("./common/getRoute");
const Handlebars = require("handlebars");
const log = require("./common/log");

module.exports = function (plop) {
  plop.addHelper("renderJunction", function (junction, context) {
    const route = getRoute(context);

    let rendered = "";
    if ((junction.type === "standard") && (junction.labelOffset)) {
      rendered += "\n<!-- Junction: --> ";
      const path = [{ x: junction.x, y: junction.y }];
      switch (junction.labelOffset) {
        case "n": {
          path.push({ x: junction.x, y: junction.y - standard.cellHalfSize });
          break;
        }
        case "e": {
          path.push({ x: junction.x + standard.cellHalfSize, y: junction.y });
          break;
        }
        case "s": {
          path.push({ x: junction.x, y: junction.y + standard.cellHalfSize });
          break;
        }
        case "w": {
          path.push({ x: junction.x - standard.cellHalfSize, y: junction.y });
          break;
        }
        default: {
          log(`Unexpected junction marker direction, "${junction.labelOffset}", on "${context.data._parent.key}.${context.data.key}".`);
          break;
        }
      }
      if (path.length > 1) {
        rendered += generatePolyline(path, {
          stroke: route.colour,
          fill: "none",
          "stroke-width": standard.lineWidth,
          "stroke-linecap": "butt"
        });
      }
    }
    return new Handlebars.SafeString(rendered);
  });
};
