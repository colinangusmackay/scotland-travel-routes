const standard = require("./common/standardConsts");
const Handlebars = require("handlebars");
const log = require("./common/log");

module.exports = function (plop) {
  plop.addHelper("renderLabel", function (junction, context) {
    if (junction.name === "" || !junction.labelOffset){
      return new Handlebars.SafeString("");
    }
    let rendered = "\n<!-- Label: --> ";
    switch (junction.labelOffset) {
      case "n": {
        rendered += `<text x="${junction.x}" y="${junction.y - (standard.cellHeight * 1.6)}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="middle" font-size="${standard.cellHeight}px">${junction.name}</text>`;
        break;
      }
      case "ne": {
        rendered += `<text x="${junction.x + (standard.cellWidth * 0.6)}" y="${junction.y - (standard.cellHeight * 1.6)}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="start" font-size="${standard.cellHeight}px">${junction.name}</text>`;
        break;
      }
      case "e": {
        rendered += `<text x="${junction.x + (standard.cellWidth * 0.6)}" y="${junction.y - standard.cellHalfHeight}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="start" font-size="${standard.cellHeight}px">${junction.name}</text>`;
        break;
      }
      case "s": {
        rendered += `<text x="${junction.x}" y="${junction.y + (standard.cellHeight * 0.6)}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="middle" font-size="${standard.cellHeight}px">${junction.name}</text>`;
        break;
      }
      case "w": {
        rendered += `<text x="${junction.x - (standard.cellWidth * 0.6)}" y="${junction.y - standard.cellHalfHeight}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="end" font-size="${standard.cellHeight}px">${junction.name}</text>`;
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
