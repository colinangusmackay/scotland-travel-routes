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

// From-To angle/direction combinations
// ╔═════════════╦═══════════╦═══════╦══════╗
// ║    angle    ║           ║       ║      ║
// ╠══════╦══════╣ direction ║ Valid ║ Done ║
// ║ from ║  to  ║           ║       ║      ║
// ╠══════╬══════╬═══════════╬═══════╬══════╣
// ║  ew  ║  ew  ║ north     ║   ×   ║  -   ║
// ║  ew  ║  ew  ║ northeast ║   √   ║ YES  ║
// ║  ew  ║  ew  ║ east      ║   √   ║ YES  ║
// ║  ew  ║  ew  ║ southeast ║   √   ║ YES  ║
// ║  ew  ║  ew  ║ south     ║   ×   ║  -   ║
// ║  ew  ║  ew  ║ southwest ║   √   ║ YES  ║
// ║  ew  ║  ew  ║ west      ║   √   ║ YES  ║
// ║  ew  ║  ew  ║ northwest ║   √   ║ YES  ║
// ╟──────╫──────╫───────────╫───────╫──────╢
// ║  ew  ║  ns  ║ north     ║   ×   ║      ║
// ║  ew  ║  ns  ║ northeast ║   √   ║      ║
// ║  ew  ║  ns  ║ east      ║   ×   ║      ║
// ║  ew  ║  ns  ║ southeast ║   √   ║      ║
// ║  ew  ║  ns  ║ south     ║   ×   ║      ║
// ║  ew  ║  ns  ║ southwest ║   √   ║      ║
// ║  ew  ║  ns  ║ west      ║   ×   ║      ║
// ║  ew  ║  ns  ║ northwest ║   √   ║      ║
// ╟──────╫──────╫───────────╫───────╫──────╢
// ║  ns  ║  ew  ║ north     ║   ×   ║      ║
// ║  ns  ║  ew  ║ northeast ║   √   ║      ║
// ║  ns  ║  ew  ║ east      ║   ×   ║      ║
// ║  ns  ║  ew  ║ southeast ║   √   ║      ║
// ║  ns  ║  ew  ║ south     ║   ×   ║      ║
// ║  ns  ║  ew  ║ southwest ║   √   ║      ║
// ║  ns  ║  ew  ║ west      ║   ×   ║      ║
// ║  ns  ║  ew  ║ northwest ║   √   ║      ║
// ╟──────╫──────╫───────────╫───────╫──────╢
// ║  ns  ║  ns  ║ north     ║   √   ║      ║
// ║  ns  ║  ns  ║ northeast ║   √   ║      ║
// ║  ns  ║  ns  ║ east      ║   ×   ║      ║
// ║  ns  ║  ns  ║ southeast ║   √   ║      ║
// ║  ns  ║  ns  ║ south     ║   √   ║      ║
// ║  ns  ║  ns  ║ southwest ║   √   ║      ║
// ║  ns  ║  ns  ║ west      ║   ×   ║      ║
// ║  ns  ║  ns  ║ northwest ║   √   ║      ║
// ╚══════╩══════╩═══════════╩═══════╩══════╝

function lastItemIn (array) {
  return array[array.length - 1];
}

function appendEastWestToEastWestPath (path, from, to, dir, route) {
  const fromExit = getCellExitPoint(from, dir, route);
  const toEntry = getCellEntryPoint(to, dir, route);
  const transform = lastItemIn(dir) === "e" ? 1 : -1;
  path.push({
    command: "C",
    x1: fromExit.x + (standard.cellSize * transform),
    y1: fromExit.y,
    x2: toEntry.x - (standard.cellSize * transform),
    y2: toEntry.y,
    x: toEntry.x,
    y: toEntry.y
  });
}

module.exports = function generateTwoPartRoundedPath (from, to, route) {
  const dir = getDirection(from, to);

  const path = initPath(from, dir, route);
  const style = `${from.angle};${to.angle};${dir}`;
  switch (style) {
    case "ew;ew;e":
    case "ew;ew;w":
      return generateStraightPath(from, to);
    case "ew;ew;ne":
    case "ew;ew;se":
    case "ew;ew;sw":
    case "ew;ew;nw":
      appendEastWestToEastWestPath(path, from, to, dir, route);
      break;
    case "ns;ew;ne": {
      const fromExit = getCellExitPoint(from, dir, route);
      const toEntry = getCellEntryPoint(to, dir, route);
      let xDist = Math.abs(fromExit.x - toEntry.x);
      let yDist = Math.abs(fromExit.y - toEntry.y);
      let equiDist = Math.min(xDist, yDist);
      const turnCells = Math.floor(equiDist / (standard.cellSize * 2));
      const turnSize = standard.cellSize * turnCells;
      if (turnCells > 0) { equiDist -= turnCells * standard.cellSize; }
      xDist -= equiDist;
      yDist -= equiDist;
      if (yDist > 0) {
        path.push({ x: fromExit.x, y: fromExit.y - yDist });
      }

      const firstTurn = generateArcPath(fromExit.x + turnSize, fromExit.y - yDist, turnSize, 270, 315);
      path.push(firstTurn.path);

      const secondTurn = generateArcPath(toEntry.x - xDist, toEntry.y + turnSize, turnSize, 315, 360);
      path.push({ x: secondTurn.start.x, y: secondTurn.start.y });
      path.push(secondTurn.path);

      if (xDist > 0) {
        path.push({ x: toEntry.x, y: toEntry.y });
      }
      break;
    }
    case "ew;ew;n":
    case "ew;ew;s":
      log(`"${style}" is not a valid combination. ${route.name} from ${from.number}/${from.name} (${from.angle}) to ${to.number}/${to.name} (${to.angle}) travelling in a ${dir} direction.`);
      break;
    default:
      log(`"${style}" is an unknown combination. ${route.name} from ${from.number}/${from.name} (${from.angle}) to ${to.number}/${to.name} (${to.angle}) travelling in a ${dir} direction.`);
      break;
  }

  terminatePath(path, to);
  return path;
};
