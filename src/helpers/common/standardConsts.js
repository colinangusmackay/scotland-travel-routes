const cellWidth = 50;
const cellHeight = 50;

module.exports = {
  cellWidth: cellWidth,
  cellHeight: cellHeight,
  cellHalfWidth: cellWidth / 2,
  cellHalfHeight: cellHeight / 2,
  cellDemiWidth: cellWidth / 10,
  cellDemiHeight: cellHeight / 10,
  lineWidth: (cellHeight < cellWidth ? cellHeight : cellWidth) / 2.5,
  interchangeRadius: (cellHeight < cellWidth ? cellHeight : cellWidth) / 2,
  interchangeLineWidth: (cellHeight < cellWidth ? cellHeight : cellWidth) / 8
};
