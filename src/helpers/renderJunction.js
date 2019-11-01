const standard = require("./common/standardConsts");
const generatePolyline = require("./common/generatePolyline");
const getRoute = require("./common/getRoute");
const Handlebars = require("handlebars");

module.exports = function (plop) {
  plop.addHelper("renderJunction", function (junction, context) {
    const route = getRoute(context);

    let rendered = "";
    if (junction.type === "standard") {
      rendered += "\n<!-- Junction: --> ";
      const path = [{ x: junction.x, y: junction.y }];
      switch (junction.labelOffset) {
        case "n": {
          path.push({ x: junction.x, y: junction.y - standard.cellHalfHeight });
          break;
        }
        case "s": {
          path.push({ x: junction.x, y: junction.y + standard.cellHalfHeight });
          break;
        }
        default: {
          console.log(`Unexpected junction label offset, "${junction.labelOffset}", on "${context.data._parent.key}.${context.data.key}".`);
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
