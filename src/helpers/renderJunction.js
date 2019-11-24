const standard = require("./common/standardConsts");
const generatePolyline = require("./common/generatePolyline");
const getRoute = require("./common/getRoute");
const Handlebars = require("handlebars");
const log = require("./common/log");

function renderStandardJunction (junction, route) {
  let rendered = "\n<!-- Junction: --> ";
  const path = [{ x: junction.x, y: junction.y }];
  switch (junction.labelOffset) {
    case "n": {
      path.push({ x: junction.x, y: junction.y - standard.cellHalfSize });
      break;
    }
    case "ne": {
      path.push({ x: junction.x + (standard.cellHalfSize * standard.cos45), y: junction.y - (standard.cellHalfSize * standard.sin45) });
      break;
    }
    case "e": {
      path.push({ x: junction.x + standard.cellHalfSize, y: junction.y });
      break;
    }
    case "se": {
      path.push({ x: junction.x + standard.cellHalfSize, y: junction.y + standard.cellHalfSize });
      break;
    }
    case "s": {
      path.push({ x: junction.x, y: junction.y + standard.cellHalfSize });
      break;
    }
    case "sw": {
      path.push({ x: junction.x - (standard.cellHalfSize * standard.cos45), y: junction.y + (standard.cellHalfSize * standard.sin45) });
      break;
    }
    case "w": {
      path.push({ x: junction.x - standard.cellHalfSize, y: junction.y });
      break;
    }
    case "nw": {
      path.push({ x: junction.x - standard.cellHalfSize, y: junction.y - standard.cellHalfSize });
      break;
    }
    default: {
      log(`Unexpected junction marker direction, "${junction.labelOffset}", on "${route.name}.${junction.number}".`);
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
  return rendered;
}

function renderStandardDottedJunction (junction, route) {
  let rendered = "\n<!-- Junction: --> ";
  rendered += `<circle cx="${junction.x}" cy="${junction.y}" r="${standard.lineWidth / 2}" fill="white" stroke="black" stroke-width="${standard.lineWidth / 5}" />`;
  return rendered;
}

module.exports = function (plop) {
  plop.addHelper("renderJunction", function (junction, context) {
    const route = getRoute(context);

    let rendered = "";
    if ((junction.type === "standard") && (junction.labelOffset)) {
      rendered = renderStandardJunction(junction, route);
    } else if ((junction.type === "dotted-junction")) {
      rendered = renderStandardDottedJunction(junction, route);
    }

    return new Handlebars.SafeString(rendered);
  });
};
