const Handlebars = require("handlebars");

function getPreviousJunction (context) {
  const previousIndex = context.data.index - 1;
  const routeKey = context.data._parent.key;
  const junctions = context.data.root.routes[routeKey].junctions;
  const junctionKey = Object.keys(junctions)[previousIndex];
  const previousJunction = junctions[junctionKey];
  return previousJunction;
}

function getRoute (context) {
  const routeKey = context.data._parent.key;
  const route = context.data.root.routes[routeKey];
  return route;
}

module.exports = function (plop) {
  plop.addHelper("renderConnector", function (junction, context) {
    if (!context.data.first) {
      const cellSize = 50;
      const lineWidth = 20;
      console.log("=====================");
      console.log("renderConnector CALL:");
      console.log("junction:");
      console.log(junction);
      console.log("");
      console.log("context:");
      console.log(context);
      console.log("");
      const previousJunction = getPreviousJunction(context);
      console.log("previousJunction:");
      console.log(previousJunction);
      const route = getRoute(context);

      let rendered = "";
      switch (junction.angle) {
        case "ew": {
          const tlx = junction.x;
          const tly = junction.y - (lineWidth / 2);
          const width = cellSize / 2;
          const height = lineWidth;
          const radius = lineWidth / 2;
          rendered += `<rect x="${tlx}" y="${tly}" width="${width}" height="${height}" rx="${radius}" fill="${route.colour}" />`;
          break;
        }
        default: {
          const msg = `Unexpected junction angle, "${junction.angle}", on "${context.data._parent.key}.${context.data.key}". Valid angles are "ew".`;
          console.log(msg);
          break;
        }
      }

      return new Handlebars.SafeString(rendered);

      //
      // let rendered = "";
      // switch (junction.angle) {
      //   // TODO: Diagonal offsets
      //   case "ew": {
      //     const tlx = junction.x - (width / 2);
      //     const tly = junction.y - (height / 2);
      //     rendered += `<rect x="${tlx}" y="${tly}" width="${width}" height="${height}" fill="${route.colour}" />`;
      //     break;
      //   }
      //   case "ns": {
      //     const tlx = junction.x - (height / 2);
      //     const tly = junction.y - (width / 2);
      //     rendered += `<rect x="${tlx}" y="${tly}" width="${height}" height="${width}" fill="${route.colour}" />`;
      //     break;
      //   }
      //   default: {
      //     const msg = `Unexpected junction angle, "${junction.angle}", on "${context.data._parent.key}.${context.data.key}". Valid angles are "ew", and "ns".`;
      //     console.log(msg);
      //   }
      // }
      //
      // switch (junction.terminatorLabelOffset) {
      //   // TODO: Add the other offsets
      //   case "e":
      //   {
      //     const labelX = junction.x + width;
      //     const labelY = junction.y;
      //     const text = route.name;
      //     rendered += `<text x="${labelX}" y="${labelY}" dominant-baseline="middle" font-family="Fira Sans Condensed" font-size="50px">${text}</text>`;
      //     break;
      //   }
      //   case "w":
      //   {
      //     const labelX = junction.x - width;
      //     const labelY = junction.y;
      //     const text = route.name;
      //     rendered += `<text x="${labelX}" y="${labelY}" text-anchor="end" dominant-baseline="middle" font-family="Fira Sans Condensed" font-size="50px">${text}</text>`;
      //     break;
      //   }
      //   default: {
      //     const msg = `Unexpected terminator label offset, "${junction.terminatorLabelOffset}", on "${context.data._parent.key}.${context.data.key}". Valid offsets are "e", and "w".`;
      //     console.log(msg);
      //   }
      // }
      // return new Handlebars.SafeString(rendered);
    }
  });
};
