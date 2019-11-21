// TODO: Diagnonal angles
const log = require("../log");
const getDirection = require("./getDirection");
const initPath = require("./initPath");
const terminatePath = require("./terminatePath");
const generateStraightPath = require("./generateStraightPath");
const getCellEntryPoint = require("./getCellEntryPoint");
const getCellExitPoint = require("./getCellExitPoint");
const generateArcPath = require("./generateArcPath");
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

function getPathForEWtoNS (from, to, route, dir) {
  const xDir = getXDir(dir);
  const yDir = getYDir(dir);
  const transformX = getTransformX(xDir);
  const transformY = getTransformY(yDir);
  const fromExit = getCellExitPoint(from, dir, route);
  const toEntry = getCellEntryPoint(to, dir, route);
  const straightX = Math.abs(fromExit.x - toEntry.x) - standard.cellSize;
  const isClockwise = dir === "se" || dir === "nw";

  const path = initPath(from, dir, route);
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
  terminatePath(path, to, dir, route);
  return path;
}

function getTransformX (xDir) {
  return xDir === "w" ? -1 : 1;
}

function getTransformY (yDir) {
  return yDir === "n" ? -1 : 1;
}

function getPathForNStoEW (from, to, route, dir) {
  const xDir = getXDir(dir);
  const yDir = getYDir(dir);
  const path = initPath(from, dir, route);
  const fromExit = lastItemIn(path);
  const toEntry = getCellEntryPoint(to, dir, route);
  const straightY = Math.abs(fromExit.y - toEntry.y) - standard.cellSize;
  const transformX = getTransformX(xDir);
  const transformY = getTransformY(yDir);
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
  terminatePath(path, to, dir, route);
  return path;
}

function generatePathForEWtoNWSE (from, to, route, dir) {
  log(`Rounded connection going "${dir}" from "${route.name}.${from.number}/${from.name}" (${from.angle}) to "${to.number}/${to.name}" (${to.angle}).`);

  const xDir = getXDir(dir);
  const yDir = getYDir(dir);
  const path = initPath(from, dir, route);
  const fromExit = lastItemIn(path);
  const toEntry = getCellEntryPoint(to, dir, route);
  const transformX = getTransformX(xDir);
  const transformY = getTransformY(yDir);

  const startAngle = (function () {
    switch (dir) {
      case "se":
        return 0;
      default:
        return 180;
    }
  }());
  const endAngle = (function () {
    switch (dir) {
      case "se":
        return 45;
      default:
        return 225;
    }
  }());

  const arc = generateArcPath(0, 0, standard.cellSize, startAngle, endAngle);
  const diagnonal = Math.min(Math.abs(fromExit.x - toEntry.x), Math.abs(fromExit.y - toEntry.y)) - Math.abs(arc.path.y);
  const straightX = Math.abs(fromExit.x - toEntry.x) - (Math.abs(arc.path.x) * 2) - diagnonal;
  log(`StraightX = ${straightX}; transformX = ${transformX}`);
  path.push({ x: fromExit.x + (straightX * transformX), y: fromExit.y });

  const isClockwise = dir === "se" || dir === "nw";
  const last = lastItemIn(path);
  arc.path.x = arc.path.x + last.x;
  arc.path.y = arc.path.y + last.y + (standard.cellSize * transformY);
  path.push(arc.path);

  path.push({ x: toEntry.x, y: toEntry.y });
  terminatePath(path, to, dir, route);
  return path;
}

function generatePathForEWtoSWNE (from, to, route, dir) {
  log(`Rounded connection going "${dir}" from "${route.name}.${from.number}/${from.name}" (${from.angle}) to "${to.number}/${to.name}" (${to.angle}).`);

  const xDir = getXDir(dir);
  const yDir = getYDir(dir);
  const path = initPath(from, dir, route);
  const fromExit = lastItemIn(path);
  const toEntry = getCellEntryPoint(to, dir, route);
  const transformX = getTransformX(xDir);
  const transformY = getTransformY(yDir);

  const arc = generateArcPath(0, 0, standard.cellSize, 180, 135);
  const diagnonal = Math.min(Math.abs(fromExit.x - toEntry.x), Math.abs(fromExit.y - toEntry.y)) - Math.abs(arc.path.y);
  const straightX = Math.abs(fromExit.x - toEntry.x) - (Math.abs(arc.path.x) * 2) - diagnonal;
  log(`StraightX = ${straightX}; transformX = ${transformX}`);
  path.push({ x: fromExit.x + (straightX * transformX), y: fromExit.y });

  const last = lastItemIn(path);
  arc.path.x = arc.path.x + last.x;
  arc.path.y = arc.path.y + last.y + (standard.cellSize * transformY);
  path.push(arc.path);

  path.push({ x: toEntry.x, y: toEntry.y });
  terminatePath(path, to, dir, route);
  return path;
}

function generatePathForSWNEtoNS (from, to, route, dir) {
  log(`Rounded connection going "${dir}" from "${route.name}.${from.number}/${from.name}" (${from.angle}) to "${to.number}/${to.name}" (${to.angle}).`);

  const xDir = getXDir(dir);
  const yDir = getYDir(dir);
  const path = initPath(from, dir, route);
  const fromExit = lastItemIn(path);
  const toEntry = getCellEntryPoint(to, dir, route);
  const transformX = getTransformX(xDir);
  const transformY = getTransformY(yDir);

  const arc = generateArcPath(0, 0, standard.cellSize, 45, 0);
  const diagnonal = Math.min(Math.abs(fromExit.x - toEntry.x), Math.abs(fromExit.y - toEntry.y)) - arc.height;
  const straightY = Math.abs(fromExit.y - toEntry.y) - (arc.height * 2) - diagnonal;
  path.push({ x: fromExit.x + (diagnonal * transformX), y: fromExit.y + (diagnonal * transformY) });

  arc.path.x = toEntry.x; // arc.path.x + last.x;
  arc.path.y = toEntry.y + straightY; // .path.y + last.y;
  path.push(arc.path);

  path.push({ x: toEntry.x, y: toEntry.y });
  terminatePath(path, to, dir, route);
  return path;
}

function generatePathForNWSEtoEW (from, to, route, dir) {
  const xDir = getXDir(dir);
  const yDir = getYDir(dir);
  const path = initPath(from, dir, route);
  const fromExit = lastItemIn(path);
  const toEntry = getCellEntryPoint(to, dir, route);
  const transformX = getTransformX(xDir);
  const transformY = getTransformY(yDir);

  const arc = generateArcPath(0, 0, standard.cellSize, 135, 90);
  const diagnonal = Math.min(Math.abs(fromExit.x - toEntry.x), Math.abs(fromExit.y - toEntry.y)) - arc.width;
  const straightX = Math.abs(fromExit.x - toEntry.x) - (arc.width * 2) - diagnonal;
  path.push({ x: fromExit.x + (diagnonal * transformX), y: fromExit.y + (diagnonal * transformY) });

  arc.path.x = toEntry.x - straightX;
  arc.path.y = toEntry.y;
  path.push(arc.path);

  path.push({ x: toEntry.x, y: toEntry.y });
  terminatePath(path, to, dir, route);
  return path;
}

module.exports = function generateRoundedPath (from, to, route) {
  const dir = getDirection(from, to);
  const style = `${from.angle};${to.angle};${dir}`;
  const path = initPath(from, dir, route);

  switch (style) {
    case "ew;ew;e":
    case "ew;ew;w":
      return generateStraightPath(from, to);
    case "ew;ns;ne":
    case "ew;ns;se":
    case "ew;ns;sw":
    case "ew;ns;nw":
      return getPathForEWtoNS(from, to, route, dir);
    case "ew;nw-se;nw":
    case "ew;nw-se;se":
      return generatePathForEWtoNWSE(from, to, route, dir, path);
    case "ew;sw-ne;ne":
      return generatePathForEWtoSWNE(from, to, route, dir, path);
    case "ns;ns;n":
    case "ns;ns;s":
      return generateStraightPath(from, to);
    case "ns;ew;ne":
    case "ns;ew;se":
    case "ns;ew;sw":
    case "ns;ew;nw":
      return getPathForNStoEW(from, to, route, dir);
    case "nw-se;ew;se":
      return generatePathForNWSEtoEW(from, to, route, dir);
    case "sw-ne;ns;ne":
      return generatePathForSWNEtoNS(from, to, route, dir, path);
    default:
      log(`Unexpected Rounded connection (style: "${style}") going "${dir}" from "${route.name}.${from.number}/${from.name}" (${from.angle}) to "${to.number}/${to.name}" (${to.angle}).`);
      break;
  }

  terminatePath(path, to, dir, route);
  return path;
};
