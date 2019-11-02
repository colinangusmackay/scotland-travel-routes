const test = require("ava");
const getDirection = require("./getDirection");

test("Identical x,y results in no direction.", t => {
  const from = { x: 0, y: 0 };
  const to = { x: 0, y: 0 };

  const dir = getDirection(from, to);

  t.assert(dir === "", "Expected to have no direction.");
});

test("Going North, returns 'n'.", t => {
  const from = { x: 0, y: 10 };
  const to = { x: 0, y: 0 };

  const dir = getDirection(from, to);

  t.assert(dir === "n", "Expected direction to be 'n' (North)");
});

test("Going North-East, returns 'ne'.", t => {
  const from = { x: 0, y: 10 };
  const to = { x: 10, y: 0 };

  const dir = getDirection(from, to);

  t.assert(dir === "ne", "Expected direction to be 'ne' (North)");
});

test("Going East, returns 'e'.", t => {
  const from = { x: 0, y: 0 };
  const to = { x: 10, y: 0 };

  const dir = getDirection(from, to);

  t.assert(dir === "e", "Expected to be 'e' (East).");
});

test("Going South-East, returns 'se'.", t => {
  const from = { x: 0, y: 0 };
  const to = { x: 10, y: 10 };

  const dir = getDirection(from, to);

  t.assert(dir === "se", "Expected to be 'se' (East).");
});

test("Going South, returns 's'.", t => {
  const from = { x: 0, y: 0 };
  const to = { x: 0, y: 10 };

  const dir = getDirection(from, to);

  t.assert(dir === "s", "Expected to be 's' (south).");
});

test("Going South-west, returns 'sw'.", t => {
  const from = { x: 10, y: 0 };
  const to = { x: 0, y: 10 };

  const dir = getDirection(from, to);

  t.assert(dir === "sw", "Expected to be 's' (south).");
});

test("Going West, returns 'w'.", t => {
  const from = { x: 10, y: 0 };
  const to = { x: 0, y: 0 };

  const dir = getDirection(from, to);

  t.assert(dir === "w", "Expected to be 'w' (West).");
});

test("Going North-West, returns 'nw'.", t => {
  const from = { x: 10, y: 10 };
  const to = { x: 0, y: 0 };

  const dir = getDirection(from, to);

  t.assert(dir === "nw", "Expected to be 'w' (West).");
});
