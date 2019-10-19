const moment = require("moment");
const timeFormat = "dddd, MMMM Do YYYY, HH:mm:ss Z";

module.exports = function (plop) {
  const timers = {};

  plop.setActionType("timer", function (answers, actionArgs, plop) {
    const name = actionArgs.name;
    const state = actionArgs.state;
    const now = Date.now();

    switch (state) {
      case "start":
      {
        timers[name] = now;
        return `Start timer "${name}" at ${moment(now).format(timeFormat)}`;
      }
      case "end":
      {
        const start = timers[name];
        if (start === undefined || start === null) {
          return `Cannot end timer ${name} because it was not started. Time now: ${moment(now).format(timeFormat)}`;
        }
        const end = Date.now();
        const duration = end - start;
        return `End timer "${name}" at ${moment(now).format(timeFormat)}. Duration was ${duration}ms`;
      }
    }

    return `Timer "${name}": state "${state}" is invalid. Use "start" or "end".`;
  });
};
