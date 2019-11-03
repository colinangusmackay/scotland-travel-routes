const log = require("./log");

module.exports = function generatePolyline (path, attr) {
  let result = "<path d=\"";

  path.forEach((c, i) => {
    let command = c.command;
    const space = i === 0 ? "" : " ";
    if (!command) {
      if (i === 0) { command = "M"; } else { command = "L"; }
    }
    switch (command) {
      case "A": {
        const largeArc = c.largeArc ? "1" : "0";
        const sweep = c.sweep ? "1" : "0";
        const arc = `${space}${command}${c.rx} ${c.ry} ${c.angle} ${largeArc} ${sweep} ${c.x},${c.y}`;
        result += arc;
        break;
      }
      case "C": {
        result += `${space}${command}${c.x1},${c.y1} ${c.x2},${c.y2} ${c.x},${c.y} `;
        break;
      }
      case "Q": {
        result += `${space}${command}${c.x1},${c.y1} ${c.x},${c.y}`;
        break;
      }
      default:
        result += `${space}${command}${c.x},${c.y}`;
        break;
    }
  });

  result += "\"";

  Object.entries(attr).forEach(([k, v]) => {
    result += ` ${k}="${v}"`;
  });

  result += "/>";
  return result;
};
