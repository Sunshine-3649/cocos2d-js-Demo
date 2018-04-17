var ChosePlayerLayer = cc.Layer.extend({
  sprite: null, // 当前角色精灵
  chooseRole: 0, // 选择的角色,1-鸣人,2-小樱
  ctor: function() {
    //////////////////////////////
    // 1. super init first
    this._super();
    //添加背景
    var bg = new cc.Sprite('res/bg.jpg');
    this.addChild(bg);
    bg.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    // 创建纹理缓存
    var sp1Texture = cc.textureCache.addImage('res/1.png');
    var sp2Texture = cc.textureCache.addImage('res/2.png');
    // 精灵1
    var sp1FrameUp = [];
    var sp1FrameDown = [];
    var sp1FrameLeft = [];
    var sp1FrameRight = [];
    // 精灵2
    var sp2FrameUp = [];
    var sp2FrameDown = [];
    var sp2FrameLeft = [];
    var sp2FrameRight = [];
    //添加帧序列
    for (var n = 0; n < 4; n++) {
      // 精灵1
      var sp1Nowframedown = new cc.SpriteFrame(
        sp1Texture,
        cc.rect(32 * n, 0, 32, 48)
      );
      var sp1Nowframeleft = new cc.SpriteFrame(
        sp1Texture,
        cc.rect(32 * n, 48, 32, 48)
      );
      var sp1Nowframeright = new cc.SpriteFrame(
        sp1Texture,
        cc.rect(32 * n, 48 * 2, 32, 48)
      );
      var sp1Nowframeup = new cc.SpriteFrame(
        sp1Texture,
        cc.rect(32 * n, 48 * 3, 32, 48)
      );
      sp1FrameDown.push(sp1Nowframedown);
      sp1FrameLeft.push(sp1Nowframeleft);
      sp1FrameRight.push(sp1Nowframeright);
      sp1FrameUp.push(sp1Nowframeup);
      // 精灵2
      var sp2Nowframedown = new cc.SpriteFrame(
        sp2Texture,
        cc.rect(32 * n, 0, 32, 48)
      );
      var sp2Nowframeleft = new cc.SpriteFrame(
        sp2Texture,
        cc.rect(32 * n, 48 * 1, 32, 48)
      );
      var sp2Nowframeright = new cc.SpriteFrame(
        sp2Texture,
        cc.rect(32 * n, 48 * 2, 32, 48)
      );
      var sp2Nowframeup = new cc.SpriteFrame(
        sp2Texture,
        cc.rect(32 * n, 48 * 3, 32, 48)
      );
      sp2FrameUp.push(sp2Nowframeup);
      sp2FrameDown.push(sp2Nowframedown);
      sp2FrameLeft.push(sp2Nowframeleft);
      sp2FrameRight.push(sp2Nowframeright);
    }
    //创建动画
    // 精灵1
    var sp1AnimationUp = new cc.Animation(sp1FrameUp, 0.1);
    var sp1AnimationDown = new cc.Animation(sp1FrameDown, 0.1);
    var sp1AnimationLeft = new cc.Animation(sp1FrameLeft, 0.1);
    var sp1AnimationRight = new cc.Animation(sp1FrameRight, 0.1);
    // 精灵2
    var sp2AnimationUp = new cc.Animation(sp2FrameUp, 0.1);
    var sp2AnimationDown = new cc.Animation(sp2FrameDown, 0.1);
    var sp2AnimationLeft = new cc.Animation(sp2FrameLeft, 0.1);
    var sp2AnimationRight = new cc.Animation(sp2FrameRight, 0.1);
    //添加到缓存里
    // 精灵1
    cc.animationCache.addAnimation(sp1AnimationUp, 'sp1up');
    cc.animationCache.addAnimation(sp1AnimationDown, 'sp1down');
    cc.animationCache.addAnimation(sp1AnimationLeft, 'sp1left');
    cc.animationCache.addAnimation(sp1AnimationRight, 'sp1right');
    // 精灵2
    cc.animationCache.addAnimation(sp2AnimationUp, 'sp2up');
    cc.animationCache.addAnimation(sp2AnimationDown, 'sp2down');
    cc.animationCache.addAnimation(sp2AnimationLeft, 'sp2left');
    cc.animationCache.addAnimation(sp2AnimationRight, 'sp2right');
    //创建sprite并运行
    this.sprite = new cc.Sprite(sp1Texture, cc.rect(32, 0, 32, 48));
    this.chooseRole = 1; // 默认选择鸣人
    this.addChild(this.sprite);
    this.sprite.setTag(1);
    this.sprite.setScale(4);
    this.sprite.setPosition(200, 200);
    //添加按钮改变精灵
    var sp1 = new cc.MenuItemFont('选鸣人', this.callback, this);
    var sp2 = new cc.MenuItemFont('选小樱', this.callback, this);
    sp1.setTag(11);
    sp2.setTag(12);
    sp1.setPositionY(50);
    var menu = new cc.Menu(sp1, sp2);
    this.addChild(menu);
    return true;
  },
  getRole: function() {
    return this.chooseRole;
  },
  callback: function(obj) {
    switch (obj.tag) {
      case 11: //鸣人
        this.chooseRole = 1;
        break;
      case 12: //小樱
        this.chooseRole = 2;
        break;
    }
    this.sprite.stopAllActions();
    this.sprite.setTexture('res/' + this.chooseRole + '.png');
    this.sprite.setTextureRect(cc.rect(32, 0, 32, 48));
  },
  onEnter: function() {
    this._super();
    //添加触屏事件
    cc.eventManager.addListener(
      {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true, //吞噬事件 不再传递
        onTouchBegan: this.touchbegan,
        onTouchMoved: this.touchmoved,
        onTouchEnded: this.touchended
      },
      this
    );
  },
  touchbegan: function(touch, event) {
    var x = touch.getLocation().x;
    var y = touch.getLocation().y;
    var bn = event.getCurrentTarget().getChildByTag(1);
    // 走路时间
    var time =
      Math.round(
        Math.sqrt(
          Math.pow(x - bn.getPositionX(), 2) +
            Math.pow(y - bn.getPositionY(), 2)
        )
      ) / 100;
    bn.stopAllActions();
    if (x < bn.getPositionX()) {
      // 点击人物左侧
      if (
        Math.abs(x - bn.getPositionX()) / Math.abs(y - bn.getPositionY()) <
        1
      ) {
        if (y < bn.getPositionY()) {
          //  向下走
          var role = Number(event.getCurrentTarget().getRole());
          var act =
            role == 1
              ? cc
                  .animate(cc.animationCache.getAnimation('sp1down'))
                  .repeatForever()
              : cc
                  .animate(cc.animationCache.getAnimation('sp2down'))
                  .repeatForever();
          bn.runAction(act);
          bn.runAction(
            cc.sequence(
              cc.moveTo(time, cc.p(x, y)),
              cc.callFunc(function(sprite) {
                sprite.stopAllActions();
              }, event.getCurrentTarget().sprite)
            )
          );
        } else {
          // 向上走
          var role = event.getCurrentTarget().getRole();
          var act =
            role == 1
              ? cc
                  .animate(cc.animationCache.getAnimation('sp1up'))
                  .repeatForever()
              : cc
                  .animate(cc.animationCache.getAnimation('sp2up'))
                  .repeatForever();
          bn.runAction(act);
          bn.runAction(
            cc.sequence(
              cc.moveTo(time, cc.p(x, y)),
              cc.callFunc(function(sprite) {
                sprite.stopAllActions();
              }, event.getCurrentTarget().sprite)
            )
          );
        }
      } else if (
        Math.abs(x - bn.getPositionX()) / Math.abs(y - bn.getPositionY()) >=
        1
      ) {
        // 向左走
        var role = event.getCurrentTarget().getRole();
        var act =
          role == 1
            ? cc
                .animate(cc.animationCache.getAnimation('sp1left'))
                .repeatForever()
            : cc
                .animate(cc.animationCache.getAnimation('sp2left'))
                .repeatForever();
        bn.runAction(act);
        bn.runAction(
          cc.sequence(
            cc.moveTo(time, cc.p(x, y)),
            cc.callFunc(function(sprite) {
              sprite.stopAllActions();
            }, event.getCurrentTarget().sprite)
          )
        );
      }
    } else if (x > bn.getPositionX()) {
      if (
        Math.abs(x - bn.getPositionX()) / Math.abs(y - bn.getPositionY()) <
        1
      ) {
        if (y < bn.getPositionY()) {
          //  向下走
          var role = event.getCurrentTarget().getRole();
          var act =
            role == 1
              ? cc
                  .animate(cc.animationCache.getAnimation('sp1down'))
                  .repeatForever()
              : cc
                  .animate(cc.animationCache.getAnimation('sp2down'))
                  .repeatForever();
          bn.runAction(act);
          bn.runAction(
            cc.sequence(
              cc.moveTo(time, cc.p(x, y)),
              cc.callFunc(function(sprite) {
                sprite.stopAllActions();
              }, event.getCurrentTarget().sprite)
            )
          );
        } else {
          // 向上走
          var role = event.getCurrentTarget().getRole();
          var act =
            role == 1
              ? cc
                  .animate(cc.animationCache.getAnimation('sp1up'))
                  .repeatForever()
              : cc
                  .animate(cc.animationCache.getAnimation('sp2up'))
                  .repeatForever();
          bn.runAction(act);
          bn.runAction(
            cc.sequence(
              cc.moveTo(time, cc.p(x, y)),
              cc.callFunc(function(sprite) {
                sprite.stopAllActions();
              }, event.getCurrentTarget().sprite)
            )
          );
        }
      } else if (
        Math.abs(x - bn.getPositionX()) / Math.abs(y - bn.getPositionY()) >=
        1
      ) {
        // 向右走
        var role = event.getCurrentTarget().getRole();
        var act =
          role == 1
            ? cc
                .animate(cc.animationCache.getAnimation('sp1right'))
                .repeatForever()
            : cc
                .animate(cc.animationCache.getAnimation('sp2right'))
                .repeatForever();
        bn.runAction(act);
        bn.runAction(
          cc.sequence(
            cc.moveTo(time, cc.p(x, y)),
            cc.callFunc(function(sprite) {
              sprite.stopAllActions();
            }, event.getCurrentTarget().sprite)
          )
        );
      }
    }
    return true;
  },
  touchmoved: function() {
    return true;
  },
  touchended: function(touch, event) {
    return true;
  }
});

var ChosePlayerScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new ChosePlayerLayer();
    this.addChild(layer);
  }
});
