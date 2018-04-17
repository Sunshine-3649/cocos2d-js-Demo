var ImageLoadLayer = cc.Layer.extend({
  process: 0, // 加载进度
  sprite: null,
  size: cc.winSize,
  ctor: function() {
    this._super();
    //系统在main.js cc.LoadScene.preload进行资源预处理
    //源码文件在frameworks/cocos2d-html5/cocos2d/core/scenes/CCloaderScene.js
    //有兴趣可以看看引擎源码 其原理是用一个场景加载进度
    //当loading完成，显示data游戏战斗画面
    var allpic = [
      'res/bg.jpg',
      'res/role.png',
      'res/walk01.png',
      'res/walk02.png',
      'res/walk03.png',
      'res/walk04.png',
      'res/walk05.png'
    ];
    //使用异步任务加载所有图片，定义全局进度process
    for (var n = 0; n < allpic.length; n++) {
      //异步加载图片
      cc.textureCache.addImageAsync(allpic[n], this.callback, this);
    }
    return true;
  },
  callback: function() {
    //每个图片加载完成都会回调
    this.process++;
    var width = this.size.width - 50;
    // 画外框
    this.drawProgress(
      1,
      (this.size.width - width) / 2,
      100,
      width,
      50,
      cc.color(255, 0, 0, 255),
      5,
      cc.color(255, 0, 0, 0)
    );
    var np = this.process * 100 / 7; //计算进度
    // 画进度
    this.drawProgress(
      2,
      (this.size.width - width) / 2,
      100,
      width * (np / 100),
      50,
      cc.color(255, 0, 0, 255),
      5,
      cc.color(255, 0, 0, 255)
    );
    if (np == 100) {
      // 加载完成，清除进度条，显示场景资源或通过导演切换场景
      this.removeChild(100, true);
      var spbg = new cc.Sprite('res/bg.jpg'); //这时候就会从缓存读取
      this.addChild(spbg);
      var sphero = new cc.Sprite('res/role.png'); //
      this.addChild(sphero);
      spbg.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
      sphero.setScale(0.3);
      sphero.setPosition(200, 200);
    }
  },
  // 绘制进度条
  drawProgress: function(
    tag,
    x,
    y,
    width,
    height,
    borderColor,
    border,
    fillColor
  ) {
    if (this.getChildByTag(tag) != null) {
      this.removeChildByTag(tag);
    }
    var rect = new cc.DrawNode();
    this.addChild(rect);
    rect.setTag(tag);
    var points = [
      cc.p(x, y),
      cc.p(x + width, y),
      cc.p(x + width, y + height),
      cc.p(x, y + height)
    ];
    rect.drawPoly(points, fillColor, border, borderColor);
  }
});

var ImageLoadScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new ImageLoadLayer();
    this.addChild(layer);
  }
});
