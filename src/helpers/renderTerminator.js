const Handlebars = require("handlebars");
const standard = require("./common/standardConsts");

module.exports = function (plop) {
  plop.addHelper("renderTerminator", function (junction, context) {
    if (junction.type === "terminator") {
      const width = 20;
      const height = 50;
      const routeKey = context.data._parent.key;
      const route = context.data.root.routes[routeKey];

      let rendered = "";
      switch (junction.angle) {
        // TODO: Diagonal offsets
        case "ew": {
          const tlx = junction.x - (width / 2);
          const tly = junction.y - (height / 2);
          rendered += `<rect x="${tlx}" y="${tly}" width="${width}" height="${height}" fill="${route.colour}" />`;
          break;
        }
        case "ns": {
          const tlx = junction.x - (height / 2);
          const tly = junction.y - (width / 2);
          rendered += `<rect x="${tlx}" y="${tly}" width="${height}" height="${width}" fill="${route.colour}" />`;
          break;
        }
        default: {
          const msg = `Unexpected junction angle, "${junction.angle}", on "${context.data._parent.key}.${context.data.key}". Valid angles are "ew", and "ns".`;
          console.log(msg);
        }
      }

      switch (junction.terminatorLabelOffset) {
        // TODO: Add the other offsets
        case "n": {
          const labelX = junction.x;
          const labelY = junction.y - standard.cellHalfWidth;
          const text = route.name;
          rendered += `<text x="${labelX}" y="${labelY}" text-anchor="middle" dominant-baseline="baseline" font-family="Fira Sans Condensed" font-size="50px">${text}</text>`;
          break;
        }
        case "e": {
          const labelX = junction.x + width;
          const labelY = junction.y;
          const text = route.name;
          rendered += `<text x="${labelX}" y="${labelY}" dominant-baseline="middle" font-family="Fira Sans Condensed" font-size="50px">${text}</text>`;
          break;
        }
        case "w":
        {
          const labelX = junction.x - width;
          const labelY = junction.y;
          const text = route.name;
          rendered += `<text x="${labelX}" y="${labelY}" text-anchor="end" dominant-baseline="middle" font-family="Fira Sans Condensed" font-size="50px">${text}</text>`;
          break;
        }
        default: {
          const msg = `Unexpected terminator label offset, "${junction.terminatorLabelOffset}", on "${context.data._parent.key}.${context.data.key}". Valid offsets are "e", and "w".`;
          console.log(msg);
        }
      }
      return new Handlebars.SafeString(rendered);
    }
  });
};
