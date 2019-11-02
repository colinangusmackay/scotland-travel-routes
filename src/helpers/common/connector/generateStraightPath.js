module.exports = function generateStraightPath (from, to) {
  return [
    { x: from.x, y: from.y },
    { x: to.x, y: to.y }
  ];
};
