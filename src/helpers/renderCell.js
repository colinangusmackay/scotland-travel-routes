const Handlebars = require("handlebars");
const standard = require("./common/standardConsts");
const generatePolyline = require("./common/generatePolyline");

module.exports = function (plop) {
  plop.addHelper("renderCell", function (junction, context) {
    let rendered = "";
    switch (junction.angle) {
      case "ew": {
        const deciWidth = standard.cellWidth / 10;
        const halfWidth = standard.cellWidth / 2;
        const deciHeight = standard.cellHeight / 10;
        const halfHeight = standard.cellHeight / 2;
        const left = junction.x - halfWidth;
        const right = junction.x + halfWidth;
        const top = junction.y - halfHeight;
        const bottom = junction.y + halfHeight;

        // Generate dashed lines
        rendered += generatePolyline([
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
      }
      default: {}
    }

    return new Handlebars.SafeString(rendered);
  });
};
