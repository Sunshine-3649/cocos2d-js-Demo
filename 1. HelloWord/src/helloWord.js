var HelloWorldLayer = cc.Layer.extend({
  sprite: null, // 精灵
  ctor: function() {
    //////////////////////////////
    // 1. super init first
    // 1.先调用父类的 init 方法初始化
    this._super();

    /////////////////////////////
    // 2. add a menu item with "X" image, which is clicked to quit the program
    //    you may modify it.
    // ask the window size
    // 2.添加一个 X 关闭按钮单击退出程序
    var size = cc.winSize;

    /////////////////////////////
    // 3. add your codes below...
    // add a label shows "Hello World"
    // create and initialize a label
    // 3.添加你的代码
    // 3.1添加一个 label 展示的 'Hello Word' 文字
    var helloLabel = new cc.LabelTTF('Hello 我是测试文字', 'Arial', 50);
    // position the label on the center of the screen
    // 3.2设置文字的位置
    helloLabel.x = size.width / 2;
    helloLabel.y = size.height / 2 + 200;
    // add the label as a child to this layer
    // 3.3将 label 作为子节点添加到 layer 层中; 5 代表渲染时的被指定的 z-order 相互叠加
    this.addChild(helloLabel, 5);

    // add "HelloWorld" splash screen"
    // 4. 添加精灵图在场景中
    this.sprite = new cc.Sprite(res.HelloWorld_png);
    // 4.1 设置精灵图位置
    this.sprite.attr({
      x: size.width / 2,
      y: size.height / 2
    });
    // 4.2 添加到场景中
    this.addChild(this.sprite, 0);

    // 5 实现菜单
    // 5.1.1 文字菜单一
    // var menuItemLabel = new cc.MenuItemLabel(
    //   new cc.LabelTTF('MenuItemLabel', 'Aria', 50),
    //   function() {
    //     cc.log('LabelTTF, Aria, 50');
    //   },
    //   this
    // );

    // 5.1.2 文字菜单二
    // var menuItemFont = new cc.MenuItemFont(
    //   'MenuItemFont',
    //   function() {
    //     cc.log('MenuItemFont');
    //   },
    //   this
    // );

    // 5.1.3 文字菜单三
    /**
     * @param  {} '0'  显示文本
     * @param  {} res.HelloWorld_png  图片集合文件
     * @param  {} 37   要截取的文字宽度
     * @param  {} 60  要截取的文字宽度
     * @param  {} '/'  要截取的文字宽度
     * @param  {} function 回调函数
     * @param  {} this 添加的节点
     */
    // var menuItemAtlasFont = new cc.MenuItemAtlasFont(
    //   '0',
    //   res.HelloWorld_png,
    //   37,
    //   60,
    //   '/',
    //   function() {
    //     cc.log('MenuItemAtlasFont');
    //   },
    //   this
    // );

    // var menu = new cc.Menu(menuItemLabel, menuItemFont, menuItemAtlasFont);
    // this.addChild(menu, menuItemFont);
    return true;
  }
});

var HelloWorldScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new HelloWorldLayer();
    this.addChild(layer);
    return true;
  }
});
