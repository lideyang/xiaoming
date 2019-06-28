/**
 * Created by lidy on 2019/6/28.
 */
export const formatCurrency = (num, flag = true) => {//保留两位小数
  let argNum = arguments.length;
  if (num == null || num == 0) {
    return flag ? "0.00" : "0";
  }
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num))
    num = "0";
  let sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10)
    cents = "0" + cents;
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ','
      + num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + (flag ? ('.' + cents) : ''));
}
