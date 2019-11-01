module.exports = function getRoute (context) {
  const routeKey = context.data._parent.key;
  const route = context.data.root.routes[routeKey];
  return route;
};