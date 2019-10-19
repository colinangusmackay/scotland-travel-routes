module.exports = function (plop) {
  plop.handlebars.registerHelper("setData", function (name, options) {
    // console.log("setData CALL:");
    // console.log("name:");
    // console.log(name);
    // console.log("");
    // console.log("options:");
    // console.log(options);
    // console.log("");
    const text = options.fn("");
    // console.log("Text:");
    // console.log(text);
    // console.log("");
    const obj = JSON.parse(text);
    // console.log("JSON:");
    // console.log(obj);
    // console.log("");
    options.data.root[name] = obj;
  });
};
