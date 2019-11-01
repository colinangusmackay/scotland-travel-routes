module.exports = function generatePolygon (path, attr) {
  let result = "<polygon points=\"";

  path.forEach((c, i) => {
    result += `${i !== 0 ? " " : ""}${c.x},${c.y}`;
  });

  result += "\"";

  Object.entries(attr).forEach(([k, v]) => {
    result += ` ${k}=\"${v}\"`;
  });

  result += "/>";
  return result;
};
