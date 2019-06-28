/**
 * Created by lidy on 2017/12/21.
 */
/**
 *
 * @param {type} radius 圆环半径
 * @param {type} lineWidth 圆环宽度
 * @param {type} strokeStyle 默认背景
 * @param {type} fillStyleArray 数组，圆环色块颜色
 * @param {type} capType 类型：round是圆角，square正方形顶帽，butt是正常
 * @param {type} percentArray ，数字，每个占据的百分比
 * @param {type} startAngle 开始的角度
 *  @param {type} criclex，cricley 圆心坐标，一般是canvas的一半，例如：canvas给的宽度是250，高度是250，那么criclex是125
 */

class Circle {
  constructor(radius, lineWidth, opt, capType) {
    this.radius = radius; // 圆环半径
    this.lineWidth = lineWidth; // 圆环边的宽度
    this.bgStyle = opt.bgColor; //圆环的背景颜色
    this.lineCap = capType;
    this.title = opt.title;
  }

  draw(ctx, criclex, cricley, opt) {
    ctx.beginPath();
    ctx.arc(criclex, cricley, this.radius, 0, Math.PI * 2, true); // 坐标为90的圆，这里起始角度是0，结束角度是Math.PI*2
    ctx.lineWidth = this.lineWidth;
    ctx.fillStyle = this.bgStyle;
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.font = 'bold 20px 微软雅黑';
    ctx.fillText(this.title, criclex, criclex * 2 + 40);
  }
}

class Ring {
  constructor(radius, lineWidth, opt, capType) {
    this.circle = new Circle(radius, lineWidth, opt, capType);
  }

  drawRing(ctx, startAngle, list, criclex, cricley) {
    var _this = this;

    startAngle = startAngle || 1.5 * Math.PI;
    var list = list || [];
    this.circle.draw(ctx, criclex, cricley); // 调用Circle的draw方法画圈圈
    var radius = criclex - 20; //半径
    var ox = radius + 20,
      oy = radius + 20; //圆心
    var width = 8,
      height = 8; //图例宽和高
    var posX = ox * 2 + 30,
      posY = 30; //
    var textX = posX + width + 8,
      textY = posY + 10;
    // angle
    list.forEach(function (item, index) {
      ctx.beginPath();
      var anglePerSec = 2 * Math.PI / (100 / item.val); // 蓝色的弧度
      ctx.arc(criclex, cricley, _this.circle.radius, startAngle, startAngle + anglePerSec, false); //这里的圆心坐标要和cirle的保持一致
      startAngle = startAngle + anglePerSec;
      ctx.strokeStyle = list[index].color;
      ctx.lineCap = _this.circle.lineCap;
      ctx.stroke();
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fillRect(posX, posY + 30 * index, width, height);
      ctx.moveTo(posX, posY + 30 * index);
      ctx.font = 'normal 16px 微软雅黑';
      ctx.fillStyle = "#666"; //填充颜色
      ctx.textAlign = "left";
      var percent = item.text;
      ctx.fillText(percent, textX, textY + 30 * index);
    });
  }
}

export const setArea = (element, w, h) => {
  var ctx = element.getContext('2d');
  var devicePixelRatio = window.devicePixelRatio || 1,
    backingStoreRatio = ctx.backingStorePixelRatio || ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
  var ratio = devicePixelRatio / backingStoreRatio;
  element.style.cssText = `width: ${w + 180}px;height: ${h + 80}px`
  console.log(`width: ${w + 180};height: ${h + 80}`)
  element.setAttribute('width', (w + 180) * ratio);
  element.setAttribute('height', (h + 80) * ratio);
  console.log(ratio);
  ctx.scale(ratio, ratio);
  return ctx;
}
export {Ring}
