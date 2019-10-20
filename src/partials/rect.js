module.exports = function (plop, x, y, width, height) {
  plop.setPartial("rect", "<rect x=\"{{x}}\" y=\"{{y}}\" width=\"{{width}}\" height=\"{{height}}\">");
  // used in template as {{> rect }}
};
