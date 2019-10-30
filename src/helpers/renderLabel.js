const standard = require("./common/standardConsts");
const generatePolyline = require("./common/generatePolyline");
const Handlebars = require("handlebars");

module.exports = function (plop) {
  plop.addHelper("renderLabel", function (junction, context) {
    const routeKey = context.data._parent.key;
    const route = context.data.root.routes[routeKey];

    let rendered = "";
    if (junction.type === "standard") {
      rendered += "\n<!-- Label: --> ";
      const path = [{ x: junction.x, y: junction.y }];
      switch (junction.labelOffset) {
        case "n": {
          path.push({ x: junction.x, y: junction.y - standard.cellHalfHeight });
          rendered += `<text x="${junction.x}" y="${junction.y - (standard.cellHeight * 1.6)}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="middle" font-size="${standard.cellHeight}px">${junction.name}</text>`
          break;
        }
        case "s": {
          path.push({ x: junction.x, y: junction.y + standard.cellHalfHeight });
          rendered += `<text x="${junction.x}" y="${junction.y + (standard.cellHeight * 0.6)}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="middle" font-size="${standard.cellHeight}px">${junction.name}</text>`
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
