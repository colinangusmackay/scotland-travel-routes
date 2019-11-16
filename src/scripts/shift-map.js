const log = require("../helpers/common/log");
const process = require("process");
const program = require("commander");
const fs = require("fs");
const path = require("path");

process.argv.forEach((val, index) => {
  log(`${index}: ${val}`);
});

function parseFile (value, previous) {
  const absolutePath = path.resolve(value);
  if (fs.existsSync(absolutePath)) { return absolutePath; }
  log(`The file ${value} (Full: ${absolutePath}) does not exist.`);
  throw new Error(`The file ${value} (Full: ${absolutePath}) does not exist.`);
}

function parseInteger (value, previous) {
  if (!value) { return 0; }
  return parseInt(value);
}

program
  .requiredOption("-f, --file <file>", "Routes file", parseFile)
  .option("-x, --x-offset <offset>", "How much to offset the X values", parseInteger, 0)
  .option("-y, --y-offset <offset>", "How much to offset the Y values", parseInteger, 0)
  .parse(process.argv);
console.log(program.opts());

const jsonString = fs.readFileSync(program.file, "utf8");
fs.writeFileSync(program.file + ".bak", jsonString, "utf8");
const routes = JSON.parse(jsonString);

Object.getOwnPropertyNames(routes).forEach((routeId, index) => {
  const route = routes[routeId];
  Object.getOwnPropertyNames(route.junctions).forEach((junctionId, index) => {
    const junction = route.junctions[junctionId];
    junction.x += program.xOffset;
    junction.y += program.yOffset;
  });
});

const result = JSON.stringify(routes, null, 2);

fs.writeFileSync(program.file, result, "utf8");
