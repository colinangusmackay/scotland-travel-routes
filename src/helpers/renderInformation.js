const Handlebars = require("handlebars");
const standard = require("./common/standardConsts");
const lineSpacing = 1.25;

module.exports = function (plop) {
  plop.addHelper("renderInformation", function (information, context) {
    if (!information.lines || information.lines.length === 0) { return ""; }
    let rendered = context.data.root.displayDebugGuides ? "<!-- Information -->\n" : "";
    rendered += `<g font-family="Fira Sans Condensed" font-size="${standard.fontSize.information}px">`;
    rendered += "\n";

    information.lines.forEach((line, index) => {
      const y = information.y + (index * (standard.fontSize.information * lineSpacing));
      rendered += `<text x="${information.x}" y="${y}">${line}</text>`;
      rendered += "\n";
    });
    rendered += "</g>";
    return new Handlebars.SafeString(rendered);
  });
};
