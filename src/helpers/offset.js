module.exports = function (plop) {
  plop.setHelper("offset", (base, offset, context) => {
    if (typeof (base) !== "number" || typeof (offset) !== "number") {
      throw new Error(`Cannot compute offset between ${typeof (base)} (base) and ${typeof (offset)} (offset), both values must be a number.`);
    }

    return base + offset;
  });
};
