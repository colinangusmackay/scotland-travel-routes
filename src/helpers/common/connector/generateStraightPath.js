module.exports = function generateStraightPath(junction, previousJunction){
  return [
    { x: previousJunction.x, y: previousJunction.y },
    { x: junction.x, y: junction.y }
  ];
};