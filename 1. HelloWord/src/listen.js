// 2.添加图层
var ListenLayer = cc.Layer.extend({
  sprite: null,
  label: null,
  label2: null,
  _item1Count: 0,
  ctor: function() {
    this._super();
    var size = cc.winSize;

    // 创建键盘监听label
    var label = new cc.LabelTTF('键盘事件监听', '', 50);
    label.setPosition(size.width / 2, size.height / 2);
    this.addChild(label, 30);
    this.label = label;
    // 创建键盘监听label2
    var label2 = new cc.LabelTTF('自定义事件监听', '', 50);
    label2.setPosition(
      size.width / 2,
      label.y - label.height / 2 - label2.height / 2
    );
    this.addChild(label2, 30);
    this.label2 = label2;

    // 创建精灵1
    var sprite1 = new cc.Sprite(res.HelloWorld_png);
    sprite1.x = size.width / 2 - 80;
    sprite1.y = size.height / 2 + 80;
    this.addChild(sprite1, 10);
    // 创建精灵2
    var sprite2 = new cc.Sprite(res.HelloWorld_png);
    sprite2.x = size.width / 2;
    sprite2.y = size.height / 2;
    this.addChild(sprite2, 20);
    // 创建精灵3
    var sprite3 = new cc.Sprite(res.HelloWorld_png);
    sprite3.x = size.width / 2 + 80;
    sprite3.y = size.height / 2 - 80;
    this.addChild(sprite3, 1);

    // 添加监听器到管理器
    cc.eventManager.addListener(this.listener1, sprite1);
    cc.eventManager.addListener(this.listener1.clone(), sprite2);
    cc.eventManager.addListener(this.listener1.clone(), sprite3);
    return true;
  },
  
  // 创建一个事件监听器 OneByOne 为单点触摸
  listener1: cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true, // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
    onTouchBegan: function(touch, event) {
      // 实现 onTouchBegan 事件处理回调函数
      var target = event.getCurrentTarget(); // 获取事件所绑定的 target, 通常是cc.Node及其子类
      // 获取当前触摸点相对于按钮所在的坐标
      var locationInNode = target.convertToNodeSpace(touch.getLocation());
      var s = target.getContentSize();
      var rect = cc.rect(0, 0, s.width, s.height);
      if (cc.rectContainsPoint(rect, locationInNode)) {
        // 判断触摸点是否在按钮范围内
        target.opacity = 180;
        return true;
      }
      return false;
    },
    onTouchMoved: function(touch, event) {
      //实现onTouchMoved事件处理回调函数, 触摸移动时触发
      // 移动当前按钮精灵的坐标位置
      var target = event.getCurrentTarget();
      var delta = touch.getDelta(); //获取事件数据: delta
      target.x += delta.x;
      target.y += delta.y;
    },
    onTouchEnded: function(touch, event) {
      // 实现onTouchEnded事件处理回调函数
      var target = event.getCurrentTarget();
      target.setOpacity(255);
    }
  }),
  onEnter: function() {
    this._super();
    // 快速添加事件监听
    cc.eventManager.addListener(
      {
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        onTouchBegan: function(touch, event) {
          // 实现 onTouchBegan 事件处理回调函数
          cc.log(
            '快速添加的事件监听的onTouchBegan x:' +
              touch.getLocationX() +
              ', ' +
              touch.getLocationY() +
              ''
          );
          return true;
        }
      },
      this
    );
    //给label绑定键盘事件
    cc.eventManager.addListener(
      {
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: function(keyCode, event) {
          var label = event.getCurrentTarget();
          //通过判断keyCode来确定用户按下了哪个键
          label.setString('用户按下了' + keyCode.toString() + '');
        },
        onKeyReleased: function(keyCode, event) {
          var label = event.getCurrentTarget();
          label.setString('用户释放了' + keyCode.toString() + '');
        }
      },
      this.label
    );
    // 在使用加速计事件监听器之前，需要先启用此硬件设备
    cc.inputManager.setAccelerometerEnabled(true);
    // 添加加速器事件监听器
    cc.eventManager.addListener(
      {
        event: cc.EventListener.ACCELERATION,
        callback: function(acc, event) {
          // cc.log("accleration event listener");
        }
      },
      this
    );
    // 添加鼠标事件监听器
    cc.eventManager.addListener(
      {
        event: cc.EventListener.MOUSE,
        onMouseMove: function(event) {
          // cc.log("鼠标移动位置 X: " + event.getLocationX() + "  Y:" + event.getLocationY());
        },
        onMouseUp: function(event) {
          // cc.log("鼠标抬起, Key: " + event.getButton());
        },
        onMouseDown: function(event) {
          // cc.log("鼠标按下: " + event.getButton());
        },
        onMouseScroll: function(event) {
          // cc.log("鼠标滚轮滑动, X: " + event.getLocationX() + "  Y:" + event.getLocationY());
        }
      },
      this
    );
    // 创建自定义事件监听器
    var label2 = this.label2;
    var customListener = cc.EventListener.create({
      event: cc.EventListener.CUSTOM,
      eventName: 'GameCustomListener',
      callback: function(event) {
        // 可以通过getUserData来设置需要传输的用户自定义数据
        label2.setString('触发自定义事件监听:' + event.getUserData() + '次');
      }
    });
    cc.eventManager.addListener(customListener, 1);
    // 创建触发按钮
    var menuItem = new cc.MenuItemImage(
      res.HelloWorld_png,
      res.HelloWorld_png,
      res.HelloWorld_png,
      function() {
        ++this._item1Count;
        var event = new cc.EventCustom('GameCustomListener');
        event.setUserData(this._item1Count.toString());
        cc.eventManager.dispatchEvent(event);
      },
      this
    );
    menuItem.setPosition(
      cc.winSize.width / 2,
      this.label2.y - this.label2.height / 2 - menuItem.height / 2
    );
    var menu = new cc.Menu(menuItem);
    menu.setAnchorPoint(0, 0);
    menu.setPosition(0, 0);
    this.addChild(menu, 40);
    // 移除已添加的事件监听
    // cc.eventManager.removeListener(customListener);
    // // 移除指定类型事件监听
    // cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE);
    // // 移除目标相关事件监听
    // cc.eventManager.removeListeners(this.label);
    // // 移除所有事件监听
    // cc.eventManager.removeAllListeners();
    // //让label2对象暂停响应事件
    // cc.eventManager.pauseTarget(this.label2, true);
    // //让label2对象恢复响应事件
    // cc.eventManager.resumeTarget(this.label2, true);
  }
});

// 1.创建场景
var ListenScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var myLayer = new ListenLayer();
    this.addChild(myLayer);
    return true;
  }
});
