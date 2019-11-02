const standard = require("./standardConsts");
const generatePath = require("./generatePath");
const log = require("./log");

function renderPath (path, route) {
  return generatePath(path, {
    stroke: route.colour,
    fill: "none",
    "stroke-width": standard.lineWidth,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  });
}

function generateStraightConnector (junction, previousJunction, route) {
  const path = [
    { x: previousJunction.x, y: previousJunction.y },
    { x: junction.x, y: junction.y }
  ];
  return renderPath(path, route);
}

module.exports = function generateConnector (junction, previousJunction, route) {
  if (!junction.connectionToPrevious || junction.connectionToPrevious === "straight") {
    return generateStraightConnector(junction, previousJunction, route);
  }

  const jx = junction.x;
  const jy = junction.y;
  const jd = junction.angle;
  const pjx = previousJunction.x;
  const pjy = previousJunction.y;
  const pjd = previousJunction.angle;

  const xdir = jx === pjx ? "-" : (jx < pjx ? "e" : "w");
  const ydir = jy === pjy ? "-" : (jy < pjy ? "s" : "n");

  let lastX = 0;
  let lastY = 0;

  const path = [];
  switch (jd) {
    case "ew": {
      switch (xdir) {
        case "e": {
          path.push({ x: jx, y: jy });
          lastX = jx + standard.cellHalfSize;
          lastY = jy;
          path.push({ x: lastX, y: lastY });
          break;
        }
        case "w": {
          path.push({ x: jx, y: jy });
          lastX = jx - standard.cellHalfSize;
          lastY = jy;
          path.push({ x: lastX, y: lastY });
          break;
        }
        default: {
          log(`Unexpected x direction for an ew junction, "${xdir}", on "${route.name}.${junction.number}/${junction.name}".`);
        }
      }
      break;
    }
    case "ns": {
      switch (ydir) {
        case "s": {
          path.push({ x: jx, y: jy });
          lastX = jx;
          lastY = jy + standard.cellHalfSize;
          path.push({ x: lastX, y: lastY });
          break;
        }
        case "n": {
          path.push({ x: jx, y: jy - standard.cellHalfSize });
          lastX = jx;
          lastY = jy;
          path.push({ x: lastX, y: lastY });
          break;
        }
        default: {
          log(`Unexpected y direction for an ns junction, "${ydir}", on "${route.name}.${junction.number}/${junction.name}".`);
        }
      }
      break;
    }
    default: {
      log(`Unexpected junction direction, "${jd}", between "${route.name}.${previousJunction.number}/${previousJunction.name} and ${junction.number}/${junction.name}".`);
      break;
    }
  }

  let nextX = 0;
  let nextY = 0;
  switch (pjd) {
    case "ew": {
      switch (xdir) {
        case "e": {
          nextX = pjx - standard.cellHalfSize;
          nextY = pjy;
          break;
        }
        case "w": {
          nextX = pjx + standard.cellHalfSize;
          nextY = pjy;
          break;
        }
        default: {
          log(`Unexpected X direction, "${xdir}", on "${route.name}.${junction.number}/${junction.name}".`);
          break;
        }
      }
      break;
    }
    case "ns": {
      switch (ydir) {
        case "s": {
          nextX = pjx;
          nextY = pjy - standard.cellHalfSize;
          break;
        }
        case "n": {
          nextX = pjx;
          nextY = pjy + standard.cellHalfSize;
          break;
        }
        default: {
          log(`Unexpected Y direction, "${ydir}", on "${route.name}.${junction.number}/${junction.name}".`);
          break;
        }
      }
    }
  }

  switch (junction.connectionToPrevious) {
    case "rounded-s": {
      log(`Rounded-S connection from "${route.name}.${junction.number}/${junction.name}" to "${previousJunction.number}/${previousJunction.name}".`);
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
    case "rounded": {
      log(`Rounded connection from "${route.name}.${junction.number}/${junction.name}"(${junction.angle}) to "${previousJunction.number}/${previousJunction.name}"(${previousJunction.angle}) (${xdir},${ydir}).`);
      const straightX = (Math.abs(lastX - nextX) - standard.cellSize);
      const straightY = (Math.abs(lastY - nextY) - standard.cellSize);

      if (junction.angle === "ns" && previousJunction.angle === "ew") {
        if (xdir === "e") {
          path.push({ x: lastX, y: lastY - straightY });
          path.push({
            x: lastX + standard.cellSize,
            y: lastY - straightY - standard.cellSize,
            command: "A",
            rx: standard.cellSize,
            ry: standard.cellSize,
            angle: 0,
            largeArc: false,
            sweep: true
          });
        } else if (xdir === "w") {
          path.push({ x: lastX, y: lastY - straightY });
          path.push({
            x: lastX - standard.cellSize,
            y: lastY - straightY - standard.cellSize,
            command: "A",
            rx: standard.cellSize,
            ry: standard.cellSize,
            angle: 0,
            largeArc: false,
            sweep: true
          });
        }
      } else if (junction.angle === "ew" && previousJunction.angle === "ns") {
        if (xdir === "e") {
          path.push({ x: lastX + straightX, y: lastY });
          path.push({
            x: lastX + straightX + standard.cellSize,
            y: lastY - standard.cellSize,
            command: "A",
            rx: standard.cellSize,
            ry: standard.cellSize,
            angle: 0,
            largeArc: false,
            sweep: false
          });
        } else if (xdir === "w") {
          path.push({ x: lastX - straightX, y: lastY });
          path.push({
            x: lastX - straightX - standard.cellSize,
            y: lastY - standard.cellSize,
            command: "A",
            rx: standard.cellSize,
            ry: standard.cellSize,
            angle: 0,
            largeArc: false,
            sweep: true
          });
        }
      } else {
        log(`Unexpected Rounded connection from "${route.name}.${junction.number}/${junction.name}" (${junction.angle}) to "${previousJunction.number}/${previousJunction.name}" (${previousJunction.angle}).`);
      }
      break;
    }
    case undefined:
    case null:
      break;
    default: {
      log(`Unknown connection, "${junction.connectionToPrevious}", from "${route.name}.${junction.number}/${junction.name}" to "${previousJunction.number}/${previousJunction.name}".`);
    }
  }

  path.push({ x: nextX, y: nextY });
  path.push({ x: pjx, y: pjy });

  const result = renderPath(path, route);
  return result;
};
