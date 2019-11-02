module.exports = function getDirection (from, to) {
  // Yvv       / X>>
  // north     / west        east
  //  0        / 0   1   2   3
  //  1
  //  2
  //  3
  // south

  const y = from.y === to.y
    ? ""
    : (from.y > to.y // "from" is south of "to", so going north
      ? "n"
      : "s");
  const x = from.x === to.x
    ? ""
    : (from.x > to.x // "from" is east of "to", so going west
      ? "w"
      : "e");
  return `${y}${x}`;
};
