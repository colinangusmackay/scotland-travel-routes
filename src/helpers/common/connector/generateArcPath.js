function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
  // https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

module.exports = function generateArcPath (x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, startAngle);
  const end = polarToCartesian(x, y, radius, endAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  const sweep = 1;

  const path = { command: "A", rx: radius, ry: radius, angle: 0, largeArc: largeArcFlag, sweep: sweep, x: end.x, y: end.y };

  return { path, start, end };
}