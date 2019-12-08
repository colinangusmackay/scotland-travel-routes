const cellSize = 50;

module.exports = {
  fontSize: {
    legend: 180,
    map: cellSize,
    information: cellSize * (2 / 5)
  },
  cellSize: cellSize,
  cellHalfSize: cellSize / 2,
  cellQuarterSize: cellSize / 4,
  cellDeciSize: cellSize / 10,
  lineWidth: cellSize / 2.5,
  roundedRadius: cellSize,
  roundedSRadius: cellSize / 2,
  interchangeRadius: cellSize / 2,
  interchangeLineWidth: cellSize / 8,
  sin45: Math.sin(Math.PI / 4),
  cos45: Math.cos(Math.PI / 4),
  lineSpacing: 1.1
};
