// TODO: Diagnonal angles
const log = require("../log");
const getDirection = require("./getDirection");
const initPath = require("./initPath");
const terminatePath = require("./terminatePath");
const generateStraightPath = require("./generateStraightPath");
const getCellEntryPoint = require("./getCellEntryPoint");
const getCellExitPoint = require("./getCellExitPoint");
const standard = require("../standardConsts");

function lastItemIn (array) {
  return array[array.length - 1];
}

function getXDir (dir) {
  switch (dir) {
    case "ne":
    case "e":
    case "se":
      return "e";
    case "sw":
    case "w":
    case "nw":
      return "w";
    case "n":
    case "s":
      return "-";
  }
  return "?";
}

function getYDir (dir) {
  switch (dir) {
    case "nw":
    case "n":
    case "ne":
      return "n";
    case "se":
    case "s":
    case "sw":
      return "s";
    case "e":
    case "w":
      return "-";
  }
  return "?";
}

module.exports = function generateRoundedPath (from, to, route) {
  const dir = getDirection(from, to);
  const xDir = getXDir(dir);
  const yDir = getYDir(dir);
  const path = initPath(from, dir, route);
  const fromExit = lastItemIn(path);
  const toEntry = getCellEntryPoint(to, dir, route);

  const straightX = Math.abs(fromExit.x - toEntry.x) - standard.cellSize;
  const straightY = Math.abs(fromExit.y - toEntry.y) - standard.cellSize;
  const transformX = xDir === "w" ? -1 : 1;
  const transformY = yDir === "n" ? -1 : 1;

  const style = `${from.angle};${to.angle};${dir}`;

  switch (style) {
    case "ew;ew;e":
    case "ew;ew;w":
      return generateStraightPath(from, to);
    case "ew;ns;ne":
    case "ew;ns;se":
    case "ew;ns;sw":
    case "ew;ns;nw": {
      const isClockwise = dir === "se" || dir === "nw";
      path.push({ x: fromExit.x + (straightX * transformX), y: fromExit.y });
      path.push({
        x: fromExit.x + ((standard.cellSize + straightX) * transformX),
        y: fromExit.y + (standard.cellSize * transformY),
        command: "A",
        rx: standard.cellSize,
        ry: standard.cellSize,
        angle: 0,
        largeArc: false,
        sweep: isClockwise
      });
      break;
    }
    case "ns;ns;n":
    case "ns;ns;s":
      return generateStraightPath(from, to);
    case "ns;ew;ne":
    case "ns;ew;se":
    case "ns;ew;sw":
    case "ns;ew;nw": {
      const isClockwise = dir === "sw" || dir === "ne";
      path.push({ x: fromExit.x, y: fromExit.y + (straightY * transformY) });
      path.push({
        x: fromExit.x + (standard.cellSize * transformX),
        y: fromExit.y + ((straightY + standard.cellSize) * transformY),
        command: "A",
        rx: standard.cellSize,
        ry: standard.cellSize,
        angle: 0,
        largeArc: false,
        sweep: isClockwise
      });
      break;
    }
    default:
      log(`Unexpected Rounded connection going "${dir}" from "${route.name}.${from.number}/${from.name}" (${from.angle}) to "${to.number}/${to.name}" (${to.angle}).`);
      break;
  }

  terminatePath(path, to, dir, route);
  return path;
};
