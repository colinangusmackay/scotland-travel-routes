const fs = require("fs");
const path = require("path");
const log = require("./common/log");

module.exports = function (plop) {
  plop.handlebars.registerHelper("setData", function (name, location, options) {
    let text = "";
    if (location === "inline") {
      text = options.fn("");
    } else {
      const absoluteLocation = path.resolve(location);
      log(`Looking for the "${name}" data at "${absoluteLocation}"`);
      text = fs.readFileSync(absoluteLocation, "utf8");
    }
    const obj = JSON.parse(text);
    if (Object.prototype.hasOwnProperty.call(obj, name)) {
      options.data.root[name] = obj[name];
    } else {
      options.data.root[name] = obj;
    }
  });
};
