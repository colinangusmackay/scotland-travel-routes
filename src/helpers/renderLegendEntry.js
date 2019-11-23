const Handlebars = require("handlebars");

module.exports = function (plop) {
  plop.addHelper("renderLegendEntry", function (route, context) {
    let rendered = `<!-- Legend for ${route.name} : ${route.route} -->`;
    rendered += "\n";
    rendered += `<rect x="${route.dx}" y="${route.dy}" fill="${route.colour}" height="200" width="4000" stroke="white" stroke-width="1"/>`;
    rendered += "\n";
    rendered += `<g text-anchor="start" font-size="180px" dominant-baseline="hanging" fill="${route.contrastColour}" font-family="Fira Sans Condensed">`;
    rendered += "\n";
    rendered += `<text x="${route.dx + 50}" y="${route.dy + 10}" font-weight="bold">${route.name}</text>`;
    rendered += "\n";
    rendered += `<text x="${route.dx + 600}" y="${route.dy + 10}">${route.route}</text>`;
    rendered += "\n</g>";

    return new Handlebars.SafeString(rendered);
  });
};
