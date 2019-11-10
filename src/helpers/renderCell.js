const Handlebars = require("handlebars");
const standard = require("./common/standardConsts");
const generatePolyline = require("./common/generatePolyline");

function generateDashedOutline (top, left, bottom, right) {
  let rendered = generatePolyline([
    { x: left, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom },
    { x: left, y: top }],
  { stroke: "silver", fill: "none", "stroke-dasharray": "3" });
  rendered += generatePolyline([
    { x: left, y: top },
    { x: right, y: bottom }],
  { stroke: "silver", fill: "none", "stroke-dasharray": "3" });
  rendered += generatePolyline([
    { x: right, y: top },
    { x: left, y: bottom }],
  { stroke: "silver", fill: "none", "stroke-dasharray": "3" });
  return rendered;
}

module.exports = function (plop) {
  plop.addHelper("renderCell", function (junction, context) {
    let rendered = `\n<!-- Cell: --> <circle cx="${junction.x}" cy="${junction.y}" r="${standard.cellHalfSize}" stroke="red" stroke-width="2" stroke-dasharray="3" fill="none" />`;
    switch (junction.angle) {
      case "ew": {
        const deciWidth = standard.cellSize / 10;
        const halfWidth = standard.cellSize / 2;
        const deciHeight = standard.cellSize / 10;
        const halfHeight = standard.cellSize / 2;
        const left = junction.x - halfWidth;
        const right = junction.x + halfWidth;
        const top = junction.y - halfHeight;
        const bottom = junction.y + halfHeight;

        // Generate dashed lines
        rendered += generateDashedOutline(top, left, bottom, right);

        // Generate corner elements
        rendered += generatePolyline([
          { x: left, y: top + deciHeight },
          { x: left, y: top },
          { x: left + deciWidth, y: top }],
        { stroke: "black", fill: "none" });
        rendered += generatePolyline([
          { x: right, y: top + deciHeight },
          { x: right, y: top },
          { x: right - deciWidth, y: top }],
        { stroke: "black", fill: "none" });
        rendered += generatePolyline([
          { x: right, y: bottom - deciHeight },
          { x: right, y: bottom },
          { x: right - deciWidth, y: bottom }],
        { stroke: "black", fill: "none" });
        rendered += generatePolyline([
          { x: left, y: bottom - deciHeight },
          { x: left, y: bottom },
          { x: left + deciWidth, y: bottom }],
        { stroke: "black", fill: "none" });

        // Generate edge elements
        rendered += generatePolyline([
          { x: junction.x - deciWidth, y: top },
          { x: junction.x + deciWidth, y: top }],
        { stroke: "black", fill: "none" });
        rendered += generatePolyline([
          { x: junction.x - deciWidth, y: bottom },
          { x: junction.x + deciWidth, y: bottom }],
        { stroke: "black", fill: "none" });
        rendered += generatePolyline([
          { x: left, y: junction.y - deciHeight },
          { x: left, y: junction.y + deciHeight }],
        { stroke: "black", fill: "none" });
        rendered += generatePolyline([
          { x: right, y: junction.y - deciHeight },
          { x: right, y: junction.y + deciHeight }],
        { stroke: "black", fill: "none" });

        // Centre cross-hair
        rendered += generatePolyline([
          { x: junction.x - deciWidth, y: junction.y },
          { x: junction.x + deciWidth, y: junction.y }],
        { stroke: "black", fill: "none" });
        rendered += generatePolyline([
          { x: junction.x, y: junction.y - deciHeight },
          { x: junction.x, y: junction.y + deciHeight }],
        { stroke: "black", fill: "none" });
        break;
      }
      case "ns": {
        const deciWidth = standard.cellSize / 10;
        const deciHeight = standard.cellSize / 10;
        const left = junction.x - standard.cellHalfSize;
        const right = junction.x + standard.cellHalfSize;
        const top = junction.y - standard.cellHalfSize;
        const bottom = junction.y + standard.cellHalfSize;

        // Generate dashed lines
        generateDashedOutline(top, left, bottom, right);

        // Generate corner elements
        rendered += generatePolyline([
          { x: left, y: top + standard.cellDeciSize },
          { x: left, y: top },
          { x: left + deciWidth, y: top }],
        { stroke: "black", fill: "none" });
        rendered += generatePolyline([
          { x: right, y: top + standard.cellDeciSize },
          { x: right, y: top },
          { x: right - standard.cellDeciSize, y: top }],
        { stroke: "black", fill: "none" });
        rendered += generatePolyline([
          { x: right, y: bottom - standard.cellDeciSize },
          { x: right, y: bottom },
          { x: right - standard.cellDeciSize, y: bottom }],
        { stroke: "black", fill: "none" });
        rendered += generatePolyline([
          { x: left, y: bottom - standard.cellDeciSize },
          { x: left, y: bottom },
          { x: left + standard.cellDeciSize, y: bottom }],
        { stroke: "black", fill: "none" });

        // Generate edge elements
        rendered += generatePolyline([
          { x: junction.x - standard.cellDeciSize, y: top },
          { x: junction.x + standard.cellDeciSize, y: top }],
        { stroke: "black", fill: "none" });
        rendered += generatePolyline([
          { x: junction.x - standard.cellDeciSize, y: bottom },
          { x: junction.x + standard.cellDeciSize, y: bottom }],
        { stroke: "black", fill: "none" });
        rendered += generatePolyline([
          { x: left, y: junction.y - standard.cellDeciSize },
          { x: left, y: junction.y + standard.cellDeciSize }],
        { stroke: "black", fill: "none" });
        rendered += generatePolyline([
          { x: right, y: junction.y - standard.cellDeciSize },
          { x: right, y: junction.y + standard.cellDeciSize }],
        { stroke: "black", fill: "none" });

        // Centre cross-hair
        rendered += generatePolyline([
          { x: junction.x - standard.cellDeciSize, y: junction.y },
          { x: junction.x + standard.cellDeciSize, y: junction.y }],
        { stroke: "black", fill: "none" });
        rendered += generatePolyline([
          { x: junction.x, y: junction.y - standard.cellDeciSize },
          { x: junction.x, y: junction.y + standard.cellDeciSize }],
        { stroke: "black", fill: "none" });
        break;
      }

      default: {}
    }

    return new Handlebars.SafeString(rendered);
  });
};
