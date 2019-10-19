
module.exports = function (plop) {
  plop.setActionType("displayDiagnostics", function (answers, config, plop) {
    console.log("Command line Arguments:");
    for (let i = 0; i <= process.argv.length; i++) {
      console.log(" * " + process.argv[i]);
    }
    console.log("");
    console.log("Answers:");
    console.log(answers);
    console.log("");
    console.log("Config:");
    console.log(config);
    console.log("");
    console.log("Plop:");
    console.log(plop);
    console.log("");
    return "--------------------";
  });
};
