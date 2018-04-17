/**
 * 节点可以实现整体的操作, 或者单个节点的操作
 */
var JieDianLayer = cc.Layer.extend({
  sprite: null,
  ctor: function() {
    this._super();
    // 定义根节点
    var rootNode = new cc.Node();
    rootNode.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
    this.addChild(rootNode);
    // 添加label到根节点
    var rootNodeLabel = new cc.LabelTTF("rootNode", "", 40);
    rootNodeLabel.setPosition(0, 50);
    rootNode.addChild(rootNodeLabel);

    // 定义子节点1
    var subNode1 = new cc.Node();
    rootNode.addChild(subNode1);
    var subNode1Label = new cc.LabelTTF("subNode1", "", 40);
    subNode1Label.setPosition(0, 100);
    subNode1.addChild(subNode1Label);
    // 定义子节点2
    var subNode2 = new cc.Node();
    rootNode.addChild(subNode2);
    var subNode2Label = new cc.LabelTTF("subNode2", "", 40);
    subNode2Label.setPosition(0, 150);
    subNode2.addChild(subNode2Label);
    // 定义子节点21
    var subNode21 = new cc.Node();
    subNode2.addChild(subNode21);
    var subNode21Label = new cc.LabelTTF("subNode21", "", 40);
    subNode21Label.setPosition(0, 200);
    subNode21.addChild(subNode21Label);
    // 定义子节点22
    var subNode22 = new cc.Node();
    subNode2.addChild(subNode22);
    var subNode22Label = new cc.LabelTTF("subNode22", "", 40);
    subNode22Label.setPosition(0, 250);
    subNode22.addChild(subNode22Label);

    // 操作菜单
    var rootItemLeft = new cc.MenuItemFont(
      'rootNode左移动',
      function() {
        rootNode.x -= 10;
      },
      this
    );
    rootItemLeft.setPosition(
      rootItemLeft.width / 2,
      cc.winSize.height - rootItemLeft.height / 2
    );
    var rootItemRight = new cc.MenuItemFont(
      'rootNode右移动',
      function() {
        rootNode.x += 10;
      },
      this
    );
    rootItemRight.setPosition(
      rootItemRight.width / 2,
      rootItemLeft.y - rootItemLeft.height / 2 - rootItemRight.height / 2
    );
    var subNode1ItemLeft = new cc.MenuItemFont(
      'subNode1左移动',
      function() {
        subNode1.x -= 10;
      },
      this
    );
    subNode1ItemLeft.setPosition(
      subNode1ItemLeft.width / 2,
      rootItemRight.y - rootItemRight.height / 2 - subNode1ItemLeft.height / 2
    );
    var subNode1ItemRight = new cc.MenuItemFont(
      'subNode1右移动',
      function() {
        subNode1.x += 10;
      },
      this
    );
    subNode1ItemRight.setPosition(
      subNode1ItemRight.width / 2,
      subNode1ItemLeft.y -
        subNode1ItemLeft.height / 2 -
        subNode1ItemRight.height / 2
    );
    var subNode2ItemLeft = new cc.MenuItemFont(
      'subNode2左移动',
      function() {
        subNode2.x -= 10;
      },
      this
    );
    subNode2ItemLeft.setPosition(
      subNode2ItemLeft.width / 2,
      subNode1ItemRight.y -
        subNode1ItemRight.height / 2 -
        subNode2ItemLeft.height / 2
    );
    var subNode2ItemRight = new cc.MenuItemFont(
      'subNode2右移动',
      function() {
        subNode2.x += 10;
      },
      this
    );
    subNode2ItemRight.setPosition(
      subNode2ItemRight.width / 2,
      subNode2ItemLeft.y -
        subNode2ItemLeft.height / 2 -
        subNode2ItemRight.height / 2
    );
    var subNode21ItemLeft = new cc.MenuItemFont(
      'subNode21左移动',
      function() {
        subNode21.x -= 10;
      },
      this
    );
    subNode21ItemLeft.setPosition(
      subNode21ItemLeft.width / 2,
      subNode2ItemRight.y -
        subNode2ItemRight.height / 2 -
        subNode21ItemLeft.height / 2
    );
    var subNode21ItemRight = new cc.MenuItemFont(
      'subNode21右移动',
      function() {
        subNode21.x += 10;
      },
      this
    );
    subNode21ItemRight.setPosition(
      subNode21ItemRight.width / 2,
      subNode21ItemLeft.y -
        subNode21ItemLeft.height / 2 -
        subNode21ItemRight.height / 2
    );
    var subNode22ItemLeft = new cc.MenuItemFont(
      'subNode22左移动',
      function() {
        subNode22.x -= 10;
      },
      this
    );
    subNode22ItemLeft.setPosition(
      subNode22ItemLeft.width / 2,
      subNode21ItemRight.y -
        subNode21ItemRight.height / 2 -
        subNode22ItemLeft.height / 2
    );
    var subNode22ItemRight = new cc.MenuItemFont(
      'subNode22右移动',
      function() {
        subNode22.x += 10;
      },
      this
    );
    subNode22ItemRight.setPosition(
      subNode21ItemRight.width / 2,
      subNode22ItemLeft.y -
        subNode22ItemLeft.height / 2 -
        subNode22ItemRight.height / 2
    );
    var menu = new cc.Menu(
      rootItemLeft,
      rootItemRight,
      subNode1ItemLeft,
      subNode1ItemRight,
      subNode2ItemLeft,
      subNode2ItemRight,
      subNode21ItemLeft,
      subNode21ItemRight,
      subNode22ItemLeft,
      subNode22ItemLeft,
      subNode22ItemRight
    );
    menu.setAnchorPoint(0.5, 0.5);
    menu.setPosition(0, 0);
    this.addChild(menu);
    return true;
  }
});

var JieDianScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var jieDianLayer = new JieDianLayer();
    this.addChild(jieDianLayer);
    return true;
  }
});
