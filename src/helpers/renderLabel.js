const standard = require("./common/standardConsts");
const Handlebars = require("handlebars");
const log = require("./common/log");

module.exports = function (plop) {
  plop.addHelper("renderLabel", function (junction, context) {
    if (!junction.name || junction.name === "" || !junction.labelOffset) {
      return new Handlebars.SafeString("");
    }
    const labelOffsetX = junction.labelOffsetX ? junction.labelOffsetX : 0;
    const initialLabelOffsetY = junction.labelOffsetY ? junction.labelOffsetY : 0;
    let rendered = context.data.root.displayDebugGuides ? "<!-- Label -->" : "";
    const lines = junction.name.split("\n");
    lines.forEach((line, index) => {
      const labelOffsetY = initialLabelOffsetY + (standard.cellSize * standard.lineSpacing * index);
      switch (junction.labelOffset) {
        case "n": {
          rendered += `<text x="${junction.x + labelOffsetX}" y="${junction.y - (standard.cellSize * 1.6) + labelOffsetY}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="middle" font-size="${standard.cellSize}px">${line}</text>`;
          break;
        }
        case "ne": {
          rendered += `<text x="${junction.x + labelOffsetX + (standard.cellSize * 0.6)}" y="${junction.y - (standard.cellSize * 1.6) + labelOffsetY}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="start" font-size="${standard.cellSize}px">${line}</text>`;
          break;
        }
        case "e": {
          rendered += `<text x="${junction.x + labelOffsetX + (standard.cellSize * 0.6)}" y="${junction.y - standard.cellHalfSize + labelOffsetY}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="start" font-size="${standard.cellSize}px">${line}</text>`;
          break;
        }
        case "se": {
          rendered += `<text x="${junction.x + labelOffsetX + (standard.cellSize * 0.6)}" y="${junction.y + (standard.cellSize * 0.6) + labelOffsetY}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="start" font-size="${standard.cellSize}px">${line}</text>`;
          break;
        }
        case "s": {
          rendered += `<text x="${junction.x + labelOffsetX}" y="${junction.y + (standard.cellSize * 0.6) + labelOffsetY}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="middle" font-size="${standard.cellSize}px">${line}</text>`;
          break;
        }
        case "sw": {
          rendered += `<text x="${junction.x + labelOffsetX - (standard.cellSize * 0.6)}" y="${junction.y + (standard.cellSize * 0.6) + labelOffsetY}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="end" font-size="${standard.cellSize}px">${line}</text>`;
          break;
        }
        case "w": {
          rendered += `<text x="${junction.x + labelOffsetX - (standard.cellSize * 0.6)}" y="${junction.y - standard.cellHalfSize + labelOffsetY}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="end" font-size="${standard.cellSize}px">${line}</text>`;
          break;
        }
        case "nw": {
          rendered += `<text x="${junction.x + labelOffsetX - (standard.cellSize * 0.6)}" y="${junction.y - (standard.cellSize * 1.6) + labelOffsetY}" font-family="Fira Sans Condensed" dominant-baseline="hanging" text-anchor="end" font-size="${standard.cellSize}px">${line}</text>`;
          break;
        }
        default: {
          log(`Unexpected junction label offset, "${junction.labelOffset}", on "${context.data._parent.key}.${context.data.key}".`);
          break;
        }
      }
    });
    return new Handlebars.SafeString(rendered);
  });
};
