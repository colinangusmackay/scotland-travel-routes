const Handlebars = require("handlebars");
const generateConnector = require("./common/generateConnector");
const getRoute = require("./common/getRoute");

function getPreviousJunction (context) {
  const previousIndex = context.data.index - 1;
  const routeKey = context.data._parent.key;
  const junctions = context.data.root.routes[routeKey].junctions;
  const junctionKey = Object.keys(junctions)[previousIndex];
  const previousJunction = junctions[junctionKey];
  return previousJunction;
}

module.exports = function (plop) {
  plop.addHelper("renderConnector", function (junction, context) {
    if (!context.data.first) {
      const previousJunction = getPreviousJunction(context);
      const route = getRoute(context);
      let rendered = context.data.root.displayDebugGuides ? `<!-- ${route.name} from: ${previousJunction.number}/${previousJunction.name} to: ${junction.number}/${junction.name} -->` : "";
      rendered += generateConnector(junction, previousJunction, route);
      return new Handlebars.SafeString(rendered);
    }
  });
};

