// 2.添加图层
var MyLayer = cc.Layer.extend({
  ctor: function() {
    this._super();
    // 7.添加背景颜色
    var colorLayer = new cc.LayerColor(cc.color(240, 200, 200, 255), cc.winSize.width, cc.winSize.height);
    this.addChild(colorLayer);
    
    // 3.添加精灵到图层
    var helloLabel = new cc.LabelTTF('hello, wo shi yangyang', 'Arias', 60);
    helloLabel.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    this.addChild(helloLabel);

    // 4.添加sprite
    var spriteImg = new cc.Sprite(res.HelloWorld_png);
    spriteImg.setPosition(
      helloLabel.getPositionX(),
      helloLabel.getPositionY() - helloLabel.height / 2 - spriteImg.height / 2
    );
    this.addChild(spriteImg);

    // 6.返回主菜单- (切换场景)
    // var backItem = new cc.MenuItemFont('返回主菜单', this.backScene, this);
    // 6.1返回主菜单位置
    // backItem.setPosition(
    //   helloLabel.getPositionX() - 100,
    //   helloLabel.getPositionY() - backItem.height / 2 + 50
    // );
    // 7.实例化
    var menu = new cc.Menu(backItem);
    // 8.添加到节点中
    this.addChild(menu);
    var backItem = new cc.MenuItemFont('返回', this.backCallback, this);
    var menu = new cc.Menu(backItem);
    this.addChild(menu)
    return true;
  },
  backCallback: function() {
    cc.director.runScene(new FirstScene());
  }
});

// 1.创建场景
var MyScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var myLayer = new MyLayer();
    this.addChild(myLayer);
    return true;
  }
});
