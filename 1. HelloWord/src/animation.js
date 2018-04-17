var AnimationLayer = cc.Layer.extend({
  sprite: null,
  ac: null,
  npcDirect: "right",
  ctor: function () {
      this._super();
      var size = cc.winSize;
      //添加背景
      var bg = new cc.Sprite("res/bg.jpg");
      this.addChild(bg);
      bg.setPosition(size.width / 2, size.height / 2);
      //添加动画层
      var sphero = new cc.Sprite("res/walk01.png");
      var animation = new cc.Animation();
      for (var i = 1; i <= 5; i++) {
          var frameName = "res/walk0" + i + ".png";
          animation.addSpriteFrameWithFile(frameName);
      }
      animation.setDelayPerUnit(0.1);//300毫秒每帧
      this.ac = cc.animate(animation).repeatForever();//包装成动作
      this.addChild(sphero);
      sphero.setTag(1);
      sphero.setPosition(200, 200);
      return true;
  },
  onEnter: function (touch, event) {
      this._super();
      //添加触屏事件
      cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,//吞噬事件 不再传递
          onTouchBegan: this.touchbegan,
          onTouchMoved: this.touchmoved,
          onTouchEnded: this.touchended
      }, this);
  },
  touchbegan: function (touch, event) {
      var x = touch.getLocation().x;
      var y = touch.getLocation().y;
      var bn = event.getCurrentTarget().getChildByTag(1);
      // 走路时间
      var time = Math.round(Math.sqrt(Math.pow(x - bn.getPositionX(), 2) + Math.pow(y - bn.getPositionY(), 2))) / 100;
      bn.stopAllActions();
      if (event.getCurrentTarget().npcDirect == "right" && x < bn.getPositionX()) {
          // 转向
          event.getCurrentTarget().npcDirect = "left";
          bn.runAction(cc.flipX(true));// 水平翻转
      } else if (event.getCurrentTarget().npcDirect == "left" && x > bn.getPositionX()) {
          // 转向
          event.getCurrentTarget().npcDirect = "right";
          bn.runAction(cc.flipX(false));// 翻转回来
      }
      cc.log(event.getCurrentTarget().ac);
      // 执行走路动画
      bn.runAction(event.getCurrentTarget().ac);
      bn.runAction(cc.sequence(cc.moveTo(time, cc.p(x, y)), cc.callFunc(function (bn) {
          // 移动动作完成之后停止精灵的动画，并设置精灵图片为第一张
          bn.stopAllActions();
          bn.setTexture("res/walk01.png");
      }, bn)));
      return true;
  },
  touchmoved: function (touch, event) {
      return true;
  },
  touchended: function (touch, event) {
      return true;
  }
});

var AnimationScene = cc.Scene.extend({
  onEnter: function () {
      this._super();
      var layer = new AnimationLayer();
      this.addChild(layer);
  }
});