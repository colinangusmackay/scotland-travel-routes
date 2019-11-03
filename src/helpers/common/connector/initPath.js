const getCellExitPoint = require("./getCellExitPoint");

module.exports = function initPath (junction, dir, route) {
  const path = [
    { x: junction.x, y: junction.y }
  ];

  const cellExit = getCellExitPoint(junction, dir, route);
  if (cellExit) { path.push(cellExit); }
  return path;
};
