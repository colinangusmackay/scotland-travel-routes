const standard = require("./standardConsts");
const generatePath = require("./generatePath");
const log = require("./log");
const connector = require("./connector/index");

function renderPath (path, route) {
  return generatePath(path, {
    stroke: route.colour,
    fill: "none",
    "stroke-width": standard.lineWidth,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  });
}

function generateStraightConnector (from, to, route) {
  const path = connector.generateStraightPath(from, to);
  return renderPath(path, route);
}

function generateRoundedConnector (from, to, route) {
  const path = connector.generateRoundedPath(from, to, route);
  return renderPath(path, route);
}

function generateTwoPartRoundedConnector (from, to, route) {
  const path = connector.generateTwoPartRoundedPath(from, to, route);
  return renderPath(path, route);
}

module.exports = function generateConnector (to, from, route) {
  if (!to.connectionToPrevious || to.connectionToPrevious === "straight") {
    return generateStraightConnector(from, to, route);
  }
  if (to.connectionToPrevious === "two-part-rounded") {
    return generateTwoPartRoundedConnector(from, to, route);
  }
  if (to.connectionToPrevious === "rounded") {
    return generateRoundedConnector(from, to, route);
  }

  const toX = to.x;
  const toY = to.y;
  const toD = to.angle;
  const fromX = from.x;
  const fromY = from.y;
  const fromD = from.angle;

  const xdir = toX === fromX ? "-" : (toX < fromX ? "e" : "w");
  const ydir = toY === fromY ? "-" : (toY < fromY ? "s" : "n");

  let lastX = 0;
  let lastY = 0;

  const path = [];
  switch (toD) {
    case "ew": {
      switch (xdir) {
        case "e": {
          path.push({ x: toX, y: toY });
          lastX = toX + standard.cellHalfSize;
          lastY = toY;
          path.push({ x: lastX, y: lastY });
          break;
        }
        case "w": {
          path.push({ x: toX, y: toY });
          lastX = toX - standard.cellHalfSize;
          lastY = toY;
          path.push({ x: lastX, y: lastY });
          break;
        }
        default: {
          log(`Unexpected x direction for an ew junction, "${xdir}", on "${route.name}.${to.number}/${to.name}".`);
        }
      }
      break;
    }
    case "ns": {
      switch (ydir) {
        case "s": {
          path.push({ x: toX, y: toY });
          lastX = toX;
          lastY = toY + standard.cellHalfSize;
          path.push({ x: lastX, y: lastY });
          break;
        }
        case "n": {
          path.push({ x: toX, y: toY - standard.cellHalfSize });
          lastX = toX;
          lastY = toY;
          path.push({ x: lastX, y: lastY });
          break;
        }
        default: {
          log(`Unexpected y direction for an ns junction, "${ydir}", on "${route.name}.${to.number}/${to.name}".`);
        }
      }
      break;
    }
    default: {
      log(`Unexpected junction direction, "${toD}", between "${route.name}.${from.number}/${from.name} and ${to.number}/${to.name}".`);
      break;
    }
  }

  let nextX = 0;
  let nextY = 0;
  switch (fromD) {
    case "ew": {
      switch (xdir) {
        case "e": {
          nextX = fromX - standard.cellHalfSize;
          nextY = fromY;
          break;
        }
        case "w": {
          nextX = fromX + standard.cellHalfSize;
          nextY = fromY;
          break;
        }
        default: {
          log(`Unexpected X direction, "${xdir}", on "${route.name}.${to.number}/${to.name}".`);
          break;
        }
      }
      break;
    }
    case "ns": {
      switch (ydir) {
        case "s": {
          nextX = fromX;
          nextY = fromY - standard.cellHalfSize;
          break;
        }
        case "n": {
          nextX = fromX;
          nextY = fromY + standard.cellHalfSize;
          break;
        }
        default: {
          log(`Unexpected Y direction, "${ydir}", on "${route.name}.${to.number}/${to.name}".`);
          break;
        }
      }
    }
  }

  switch (to.connectionToPrevious) {
    case "rounded-s": {
      log(`Rounded-S connection from "${route.name}.${to.number}/${to.name}" to "${from.number}/${from.name}".`);
      if (xdir === "e" && ydir === "s") {
        const straightX = (Math.abs(lastX - nextX) - standard.cellSize) / 2;
        const straightY = (Math.abs(lastY - nextY) - standard.cellSize);
        path.push({ x: lastX + straightX, y: lastY });
        path.push({
          x: lastX + straightX + standard.cellHalfSize,
          y: lastY + standard.cellHalfSize,
          command: "A",
          rx: standard.cellHalfSize,
          ry: standard.cellHalfSize,
          angle: 0,
          largeArc: false,
          sweep: true
        });
        path.push({ x: lastX + straightX + standard.cellHalfSize, y: lastY + standard.cellHalfSize + straightY });
        path.push({
          x: lastX + straightX + standard.cellSize,
          y: lastY + standard.cellSize + straightY,
          command: "A",
          rx: standard.cellHalfSize,
          ry: standard.cellHalfSize,
          angle: 0,
          largeArc: false,
          sweep: false
        });
      }
      break;
    }
    case undefined:
    case null:
      break;
    default: {
      log(`Unknown connection, "${to.connectionToPrevious}", from "${route.name}.${to.number}/${to.name}" to "${from.number}/${from.name}".`);
    }
  }

  path.push({ x: nextX, y: nextY });
  path.push({ x: fromX, y: fromY });

  const result = renderPath(path, route);
  return result;
};
