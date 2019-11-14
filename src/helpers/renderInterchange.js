const standard = require("./common/standardConsts");
const Handlebars = require("handlebars");

module.exports = function (plop) {
  plop.addHelper("renderInterchange", function (junction, context) {
    let rendered = "";
    if (junction.type === "interchange") {
      rendered += "\n<!-- Interchange: --> ";
      if (junction.stretchX || junction.stretchY) {
        const stretchX = junction.stretchX ? junction.stretchX : 0;
        const stretchY = junction.stretchY ? junction.stretchY : 0;
        rendered += `<line x1="${junction.x}" y1="${junction.y}" x2="${junction.x + stretchX}" y2="${junction.y + stretchY}" stroke="black" stroke-width="${standard.cellSize + (standard.interchangeLineWidth*2)}" stroke-linecap="round" />`;
        rendered += `<line x1="${junction.x}" y1="${junction.y}" x2="${junction.x + stretchX}" y2="${junction.y + stretchY}" stroke="white" stroke-width="${standard.cellSize}" stroke-linecap="round" />`;
      } else {
        rendered += `<circle cx="${junction.x}" cy="${junction.y}" r="${standard.interchangeRadius}" fill="white" stroke="black" stroke-width="${standard.interchangeLineWidth}" />`;
      }
    }
    return new Handlebars.SafeString(rendered);
  });
};
