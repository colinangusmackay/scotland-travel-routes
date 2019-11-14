const standard = require("./common/standardConsts");
const Handlebars = require("handlebars");
const log = require("./common/log");

module.exports = function (plop) {
  plop.addHelper("renderLabel", function (junction, context) {
    if (junction.name === "" || !junction.labelOffset) {
      return new Handlebars.SafeString("");
    }
    const labelOffsetX = junction.labelOffsetX ? junction.labelOffsetX : 0;
    let rendered = "\n<!-- Label: --> ";
    switch (junction.labelOffset) {
      case "n": {
        rendered += `<text x="${junction.x + labelOffsetX}" y="${junction.y - (standard.cellSize * 1.6)}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="middle" font-size="${standard.cellSize}px">${junction.name}</text>`;
        break;
      }
      case "ne": {
        rendered += `<text x="${junction.x + labelOffsetX + (standard.cellSize * 0.6)}" y="${junction.y - (standard.cellSize * 1.6)}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="start" font-size="${standard.cellSize}px">${junction.name}</text>`;
        break;
      }
      case "e": {
        rendered += `<text x="${junction.x + labelOffsetX + (standard.cellSize * 0.6)}" y="${junction.y - standard.cellHalfSize}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="start" font-size="${standard.cellSize}px">${junction.name}</text>`;
        break;
      }
      case "se": {
        rendered += `<text x="${junction.x + labelOffsetX + (standard.cellSize * 0.6)}" y="${junction.y + (standard.cellSize * 0.6)}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="start" font-size="${standard.cellSize}px">${junction.name}</text>`;
        break;
      }
      case "s": {
        rendered += `<text x="${junction.x + labelOffsetX}" y="${junction.y + (standard.cellSize * 0.6)}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="middle" font-size="${standard.cellSize}px">${junction.name}</text>`;
        break;
      }
      case "sw": {
        rendered += `<text x="${junction.x + labelOffsetX - (standard.cellSize * 0.6)}" y="${junction.y + (standard.cellSize * 0.6)}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="end" font-size="${standard.cellSize}px">${junction.name}</text>`;
        break;
      }
      case "w": {
        rendered += `<text x="${junction.x + labelOffsetX - (standard.cellSize * 0.6)}" y="${junction.y - standard.cellHalfSize}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="end" font-size="${standard.cellSize}px">${junction.name}</text>`;
        break;
      }
      case "nw": {
        rendered += `<text x="${junction.x + labelOffsetX - (standard.cellSize * 0.6)}" y="${junction.y - (standard.cellSize * 1.6)}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="end" font-size="${standard.cellSize}px">${junction.name}</text>`;
        break;
      }
      default: {
        log(`Unexpected junction label offset, "${junction.labelOffset}", on "${context.data._parent.key}.${context.data.key}".`);
        break;
      }
    }
    return new Handlebars.SafeString(rendered);
  });
};
