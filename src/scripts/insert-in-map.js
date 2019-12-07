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
  .option("-n, --north-of <offset>", "Offset only points north of value", parseInteger, -1)
  .option("-e, --east-of <offset>", "Offset only points east of value", parseInteger, -1)
  .option("-s, --south-of <offset>", "Offset only points south of value", parseInteger, -1)
  .option("-w, --west-of <offset>", "Offset only points west of value", parseInteger, -1)
  .parse(process.argv);
console.log(program.opts());

const jsonString = fs.readFileSync(program.file, "utf8");
fs.writeFileSync(program.file + ".bak", jsonString, "utf8");
const data = JSON.parse(jsonString);
const routes = data.routes ? data.routes : data;

Object.getOwnPropertyNames(routes).forEach((routeId, index) => {
  const route = routes[routeId];
  Object.getOwnPropertyNames(route.junctions).forEach((junctionId, index) => {
    const junction = route.junctions[junctionId];

    if ((program.northOf === -1 || junction.y < program.northOf) &&
        (program.eastOf === -1 || junction.x > program.eastOf) &&
        (program.southOf === -1 || junction.y > program.southOf) &&
        (program.westOf === -1 || junction.x < program.westOf)) {
      junction.x += program.xOffset;
      junction.y += program.yOffset;
    }
  });
});

let result = "";
if (data.routes) {
  data.routes = routes;
  result = JSON.stringify(data, null, 2);
} else {
  result = JSON.stringify(routes, null, 2);
}

fs.writeFileSync(program.file, result, "utf8");
