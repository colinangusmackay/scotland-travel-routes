// TODO: Diagnonal junctions
const standard = require("../standardConsts");
const log = require("../log");

module.exports = function getCellExitPoint (junction, dir, route) {
  switch (junction.angle) {
    case "ew": {
      switch (dir) {
        case "e":
        case "ne":
        case "se": {
          return { x: junction.x + standard.cellHalfSize, y: junction.y };
        }
        case "w":
        case "nw":
        case "sw": {
          return { x: junction.x - standard.cellHalfSize, y: junction.y };
        }
        default: {
          log(`invalid exit direction ("${dir}") for a "${junction.angle}" junction. (${route.name}, ${junction.number}/${junction.name}).`);
          break;
        }
      }
      break;
    }
    case "ns": {
      switch (dir) {
        case "n":
        case "ne":
        case "nw": {
          return { x: junction.x, y: junction.y - standard.cellHalfSize };
        }
        case "s":
        case "se":
        case "sw": {
          return { x: junction.x, y: junction.y + standard.cellHalfSize };
        }
        default: {
          log(`Invalid exit direction ("${dir}") for a "${junction.angle}" junction. (${route.name}, ${junction.number}/${junction.name}).`);
          break;
        }
      }
      break;
    }
    case "sw-ne": {
      switch (dir) {
        case "ne":
          return { x: junction.x + (standard.cellHalfSize * standard.cos45), y: junction.y - (standard.cellHalfSize * standard.sin45) };
        default: {
          log(`Invalid exit direction ("${dir}") for a "${junction.angle}" junction. (${route.name}, ${junction.number}/${junction.name}).`);
          break;
        }
      }
      break;
    }
    default: {
      log(`invalid angle ("${junction.angle}") for an junction. (${route.name}, ${junction.number}/${junction.name}).`);
      break;
    }
  }
};
