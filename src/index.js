module.exports = function (plop) {
  require("./helpers")(plop);
  require("./partials")(plop);
  require("./actions")(plop);

  plop.setGenerator("esvg", {
    description: "This generates an SVG file from an ESVG template",
    prompts: require("./prompts"),
    actions: function (data) {
      const actions = [{
        type: "timer",
        state: "start",
        name: "all"
      }];

      if (data.displayDiagnostics) {
        actions.push({
          type: "displayDiagnostics",
          actionsData: data
        });
      }

      actions.push({
        type: "add",
        force: true,
        path: "{{destination}}",
        templateFile: "{{template}}"
      });

      actions.push({
        type: "timer",
        state: "end",
        name: "all"
      });

      return actions;
    }
  });
};
