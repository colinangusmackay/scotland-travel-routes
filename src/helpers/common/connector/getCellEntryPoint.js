// TODO: Diagnonal junctions
const standard = require("../standardConsts");
const log = require("../log");

module.exports = function getCellEntryPoint (junction, dir, route) {
  switch (junction.angle) {
    case "ew": {
      switch (dir) {
        case "e":
        case "ne":
        case "se": {
          return { x: junction.x - standard.cellHalfSize, y: junction.y };
        }
        case "w":
        case "nw":
        case "sw": {
          return { x: junction.x + standard.cellHalfSize, y: junction.y };
        }
        default: {
          log(`invalid exit direction ("${dir}") for an "${junction.angle}" junction. (${route.name}, ${junction.number}/${junction.name}).`);
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
          return { x: junction.x, y: junction.y + standard.cellHalfSize };
        }
        case "s":
        case "se":
        case "sw": {
          return { x: junction.x, y: junction.y - standard.cellHalfSize };
        }
        default: {
          log(`invalid exit direction ("${dir}") for a "${junction.angle}" junction. (${route.name}, ${junction.number}/${junction.name}).`);
          break;
        }
      }
      break;
    }
    case "nw-se": {
      log(`Direction of nw-se junction is ${dir}`);
      switch (dir) {
        case "nw":
          return { x: junction.x + (standard.cellHalfSize * standard.cos45), y: junction.y + (standard.cellHalfSize * standard.sin45) };
        case "se":
          return { x: junction.x - (standard.cellHalfSize * standard.cos45), y: junction.y - (standard.cellHalfSize * standard.sin45) };
        default: {
          log(`invalid exit direction ("${dir}") for a "${junction.angle}" junction. (${route.name}, ${junction.number}/${junction.name}).`);
          break;
        }
      }
      break;
    }
    case "sw-ne": {
      log(`Direction of sw-ne junction is ${dir}`);
      switch (dir) {
        case "ne":
          return { x: junction.x - (standard.cellHalfSize * standard.cos45), y: junction.y + (standard.cellHalfSize * standard.sin45) };
        default: {
          log(`invalid exit direction ("${dir}") for a "${junction.angle}" junction. (${route.name}, ${junction.number}/${junction.name}).`);
          break;
        }
      }
      break;
    }
    default: {
      log(`invalid angle ("${junction.angle}") for a junction. (${route.name}, ${junction.number}/${junction.name}).`);
      break;
    }
  }
};
