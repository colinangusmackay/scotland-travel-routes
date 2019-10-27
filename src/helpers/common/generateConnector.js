const standard = require("./standardConsts");
const generatePolyline = require("./generatePolyline");

module.exports = function generateConnector (junction, previousJunction, route) {
  const jx = junction.x;
  const jy = junction.y;
  const jd = junction.angle;
  const pjx = previousJunction.x;
  const pjy = previousJunction.y;
  const pjd = previousJunction.angle;

  const xdir = jx === pjx ? "-" : (jx < pjx ? "e" : "w");
  const ydir = jy === pjy ? "-" : (jy < pjy ? "s" : "n");

  const line = [];

  switch (jd) {
    case "ew": {
      switch (xdir) {
        case "e": {
          line.push({ x: jx, y: jy });
          line.push({ x: jx + standard.cellHalfWidth, y: jy });
          break;
        }
        default: {
          const msg = `Unexpected x direction for an ew junction, "${xdir}", on "${route.name}.${junction.number}/${junction.name}". Valid values are "e".`;
          console.log(msg);
        }
      }
      break;
    }
    case "ns": {
      switch (ydir) {
        case "s": {
          line.push({ x: jx, y: jy });
          line.push({ x: jx, y: jy + standard.cellHalfHeight });
          break;
        }
        default: {
          const msg = `Unexpected y direction for an ns junction, "${ydir}", on "${route.name}.${junction.number}/${junction.name}". Valid values are "s".`;
          console.log(msg);
        }
      }
      break;
    }
    default: {
      const msg = `Unexpected junction direction, "${jd}", on "${route.name}.${junction.number}/${junction.name}". Valid values are "ew".`;
      console.log(msg);
    }
  }

  switch (pjd) {
    case "ew": {
      switch (xdir) {
        case "e": {
          line.push({ x: pjx - standard.cellHalfWidth, y: pjy });
          line.push({ x: pjx, y: pjy });
          break;
        }
      }
      break;
    }
    case "ns": {
      switch (ydir) {
        case "s": {
          line.push({ x: pjx, y: pjy - standard.cellHalfHeight });
          line.push({ x: pjx, y: pjy });
          break;
        }
      }
    }
  }

  return generatePolyline(line, {
    stroke: route.colour,
    fill: "none",
    "stroke-width": standard.lineWidth,
    "stroke-linecap": "round"
  });
};
