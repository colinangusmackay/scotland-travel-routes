const Handlebars = require("handlebars");
const getRoute = require("./common/getRoute");

module.exports = function (plop) {
  plop.addHelper("junctionComment", function (junction, context) {
    if (!context.data.root.displayDebugGuides) { return ""; }

    // Originally inline as:  <!-- {{../name}} {{number}} : {{name}} -->
    const route = getRoute(context);
    const rendered = `<!-- ${route.name} ${junction.number}/${junction.name} -->`;
    return new Handlebars.SafeString(rendered);
  });
};
