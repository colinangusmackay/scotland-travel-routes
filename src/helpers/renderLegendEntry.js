const Handlebars = require("handlebars");

module.exports = function (plop) {
  plop.addHelper("renderLegendEntry", function (route, context) {
    let rendered = context.data.root.displayDebugGuides ? `<!-- Legend for ${route.name} : ${route.route} -->\n` : "";
    rendered += `<rect x="${route.dx}" y="${route.dy}" fill="${route.colour}" height="200" width="4000" stroke="white" stroke-width="1"/>`;
    rendered += `<g text-anchor="start" font-size="180px" dominant-baseline="hanging" fill="${route.contrastColour}" font-family="Fira Sans Condensed">`;
    rendered += `<text x="${route.dx + 50}" y="${route.dy + 10}" font-weight="bold">${route.name}</text>`;
    rendered += `<text x="${route.dx + 600}" y="${route.dy + 10}">${route.route}</text>`;
    rendered += "</g>";

    return new Handlebars.SafeString(rendered);
  });
};
