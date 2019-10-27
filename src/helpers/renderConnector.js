const Handlebars = require("handlebars");
const generateConnector = require("./common/generateConnector");

function getPreviousJunction (context) {
  const previousIndex = context.data.index - 1;
  const routeKey = context.data._parent.key;
  const junctions = context.data.root.routes[routeKey].junctions;
  const junctionKey = Object.keys(junctions)[previousIndex];
  const previousJunction = junctions[junctionKey];
  return previousJunction;
}

function getRoute (context) {
  const routeKey = context.data._parent.key;
  const route = context.data.root.routes[routeKey];
  return route;
}

module.exports = function (plop) {
  plop.addHelper("renderConnector", function (junction, context) {
    if (!context.data.first) {
      const previousJunction = getPreviousJunction(context);
      const route = getRoute(context);
      const rendered = generateConnector(junction, previousJunction, route);
      return new Handlebars.SafeString(rendered);
    }
  });
};
