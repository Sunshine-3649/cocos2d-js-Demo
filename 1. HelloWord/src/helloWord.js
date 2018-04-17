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
    // 添加缩放
    helloLabel.setScale(2, 1);
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
    // 添加缩放
    this.sprite.setScale(2, 2);
    this.sprite.setRotation(60);
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

    // 6.计划任务
    // 6.1开始 scheduleUpadte 调用
    var starScheduleUpdateMenu = new cc.MenuItemFont(
      'Start Update',
      function() {
        this.scheduleUpdate();
      },
      this
    );
    starScheduleUpdateMenu.setPosition(
      starScheduleUpdateMenu.width / 2,
      size.height / 2
    );

    // 6.2停止 scheduleUpdate 调用
    var stopScheduleUpdateMenu = new cc.MenuItemFont(
      'stop Update',
      function() {
        this.unscheduleUpdate();
      },
      this
    );
    stopScheduleUpdateMenu.setPosition(
      stopScheduleUpdateMenu.width / 2,
      starScheduleUpdateMenu.y -
        starScheduleUpdateMenu.height / 2 -
        stopScheduleUpdateMenu.height / 2
    );

    // 6.3开始 schedule 调用
    var startScheduMenu = new cc.MenuItemFont(
      'start myUpdate',
      function() {
        this.schedule(this.myUpdate, 1, cc.REPEAT_FOREVER, 0, 'myUpdate');
      },
      this
    );
    startScheduMenu.setPosition(
      startScheduMenu.width / 2,
      stopScheduleUpdateMenu.y -
        stopScheduleUpdateMenu.height / 2 -
        startScheduMenu.height / 2
    );

    // 6.4停止 schedule 调用
    var stopScheduleMenu = new cc.MenuItemFont(
      'stop myUpdate',
      function() {
        this.unschedule(this.myUpdate);
      },
      this
    );
    stopScheduleMenu.setPosition(
      stopScheduleMenu.width / 2,
      startScheduMenu.y -
        startScheduMenu.height / 2 -
        stopScheduleMenu.height / 2
    );
    // 菜单按钮
    var menu = new cc.Menu(
      starScheduleUpdateMenu,
      stopScheduleUpdateMenu,
      startScheduMenu,
      stopScheduleMenu
    );
    menu.setPosition(0, 0);
    this.addChild(menu);
    return true;
  },
  // 按频率执行
  update: function(dt) {
    this.sprite.setRotation(this.sprite.getRotation() + 10);
  },
  // 1s执行一次
  myUpdate() {
    this.sprite.setRotation(this.sprite.getRotation() - 10);
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
