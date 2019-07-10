// 自定义高精度浮点数运算
export function float_calculator(f, digit) {
  var m = Math.pow(10, digit);
  return Math.round(f * m, 10) / m;
}

