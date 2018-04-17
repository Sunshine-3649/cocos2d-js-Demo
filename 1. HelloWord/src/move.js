// 2.添加图层
var MoveLayer = cc.Layer.extend({
  sprite: null, // 精灵
  ctor: function() {
    this._super();
    var size = cc.winSize;
    var helloLabel = new cc.LabelTTF('Hello World', 'Arial', 38);
    helloLabel.x = size.width / 2;
    helloLabel.y = size.height / 2 + 200;
    this.addChild(helloLabel, 5);
    this.sprite = new cc.Sprite(res.HelloWorld_png);
    this.sprite.attr({
      x: size.width / 2,
      y: size.height / 2
    });
    this.addChild(this.sprite, 0);
    // 执行序列动作:
    //      1.2s内向x轴移动100,y轴移动100
    //      2.2s内向y轴移动-100
    //      3.2s内向x轴移动-100
    //      4.组合动作
    //          4.1 2s内向x轴跳跃100,向y轴跳跃100,跳跃高度50,共跳5次
    //          4.2 2s内旋转360度
    var sequenceAction = new cc.sequence(
      new cc.moveBy(2, cc.p(100, 100)),
      new cc.moveBy(2, cc.p(0, -100)),
      new cc.moveBy(2, cc.p(-100, 0)),
      new cc.spawn(
        new cc.jumpBy(2, cc.p(100, 100), 50, 5),
        new cc.rotateBy(2, 360)
      )
    );
    this.sprite.runAction(sequenceAction);
    return true;
  }
});

// 1.创建场景
var MoveScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var myLayer = new MoveLayer();
    this.addChild(myLayer);
    return true;
  }
});
