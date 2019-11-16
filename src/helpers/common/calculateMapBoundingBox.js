const standard = require("./standardConsts");
const maxCoord = 1000000;
const minCoord = -maxCoord;

module.exports = function calculateMapBoundingBox (routes) {
  let east = minCoord;
  let west = maxCoord;
  let north = maxCoord;
  let south = minCoord;

  Object.getOwnPropertyNames(routes).forEach((routeId, index) => {
    const route = routes[routeId];
    const buffer = route.buffer;
    let eastBuffer = standard.cellSize;
    let westBuffer = standard.cellSize;
    let northBuffer = standard.cellSize;
    let southBuffer = standard.cellSize;
    if (buffer) {
      eastBuffer = buffer.east ? buffer.east : standard.cellSize;
      westBuffer = buffer.west ? buffer.west : standard.cellSize;
      northBuffer = buffer.north ? buffer.north : standard.cellSize;
      southBuffer = buffer.south ? buffer.south : standard.cellSize;
    }
    Object.getOwnPropertyNames(route.junctions).forEach((junctionId, index) => {
      const junction = route.junctions[junctionId];
      north = Math.min(junction.y - northBuffer, north);
      east = Math.max(junction.x + eastBuffer, east);
      south = Math.max(junction.y + southBuffer, south);
      west = Math.min(junction.x - westBuffer, west);
    });
  });

  return { north, west, south, east };
};
