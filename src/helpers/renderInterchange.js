const standard = require("./common/standardConsts");
const Handlebars = require("handlebars");

module.exports = function (plop) {
  plop.addHelper("renderInterchange", function (junction, context) {
    let rendered = "";
    if (junction.type === "interchange") {
      rendered = `<circle cx="${junction.x}" cy="${junction.y}" r="${standard.interchangeRadius}" fill="white" stroke="black" stroke-width="${standard.interchangeLineWidth}" />`
    }
    return new Handlebars.SafeString(rendered);
  });
};
