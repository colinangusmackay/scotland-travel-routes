const Handlebars = require("handlebars");
const standard = require("./common/standardConsts");
const getRoute = require("./common/getRoute");
const log = require("./common/log");

function renderBlockTerminator (junction, route) {
  const width = standard.lineWidth;
  const height = standard.cellSize;

  let rendered = "\n<!-- Terminator: --> ";
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
      console.log(`Unexpected junction angle, "${junction.angle}", on "${context.data._parent.key}.${context.data.key}".`);
      break;
    }
  }

  switch (junction.terminatorLabelOffset) {
    // TODO: Add the other offsets
    case null:
    case undefined:
    case "":
      break;
    case "n": {
      const labelX = junction.x;
      const labelY = junction.y - standard.cellHalfSize;
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
    case "s": {
      const labelX = junction.x;
      const labelY = junction.y + standard.cellHalfSize;
      const text = route.name;
      rendered += `<text x="${labelX}" y="${labelY}" text-anchor="middle" dominant-baseline="hanging" font-family="Fira Sans Condensed" font-size="50px">${text}</text>`;
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
      log(`Unexpected terminator label offset, "${junction.terminatorLabelOffset}", on "${route.name}.${junction.number}".`);
    }
  }
  return rendered;
}

function renderDottedTerminator (junction, route) {
  return `<circle cx="${junction.x}" cy="${junction.y}" r="${standard.lineWidth / 2}" fill="black" stroke="white" stroke-width="${standard.lineWidth / 10}" />`;
}

module.exports = function (plop) {
  plop.addHelper("renderTerminator", function (junction, context) {
    const route = getRoute(context);
    let rendered = "";
    switch (junction.type) {
      case "terminator":
        rendered = renderBlockTerminator(junction, route);
        break;
      case "dotted-terminator":
        rendered = renderDottedTerminator(junction, route);
        break;
    }
    return new Handlebars.SafeString(rendered);
  });
};
