// 2.添加图层
var MyFirst = cc.Layer.extend({
  sprite: null, // 精灵
  ctor: function() {
    this._super();

    // 3.添加标题(用于页面提示信息)
    var tit = new cc.LabelTTF('切换', '', 60);
    tit.setPosition(240, 330);
    this.addChild(tit);
    tit.setTag(1);

    // 4.点击添加问题显示 (回调执行方法)
    var clickItem = new cc.MenuItemFont('添加文字', this.clickCallback, this);
    // 5.点击切换场景-开始 (切换场景)
    var itemStar = new cc.MenuItemFont('开始', this.startScene, this);
    // 5.1文字位置
    itemStar.setPosition(
      clickItem.getPositionX(),
      clickItem.getPositionY() - clickItem.height / 2 - 50
    );

    // 6.点击切换场景-帮助 (切换场景)
    var itemHelp = new cc.MenuItemFont('帮助', this.helpScene, this);
    // 6.1文字位置
    itemHelp.setPosition(
      itemStar.getPositionX(),
      itemStar.getPositionY() - itemStar.height / 2 - 50
    );
    // 7.实例化
    var menu = new cc.Menu(itemStar, itemHelp, clickItem);
    // 8.添加到节点中
    this.addChild(menu);

    return true;
  },
  // 4.1
  clickCallback: function() {
    var text = new cc.LabelTTF('添加', '', 25);
    var tit = this.getChildByTag(1);
    text.setPosition(tit.getPositionX(), tit.getPositionY() - 100);
    this.addChild(text);
  },
  // 5.2开始-切换场景
  startScene: function() {
    cc.director.runScene(getRandomTransition(3, new HelloWorldScene()));
  },
  // 6.2帮助-切换场景
  helpScene: function () {
    cc.director.runScene(getRandomTransition(3, new MyScene()));
  }
});

// 1.创建场景
var FirstScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var myFirst = new MyFirst();
    this.addChild(myFirst);
    return true;
  }
});

// 随机获取转场特效
var getRandomTransition = function (t, s) {
  var index = Math.round(Math.random() * 23);
  return arr[index](t, s);
}

// 常用特效的数组
var arr = [];
arr.push(function (t, s) {
  // Zoom out and jump the outgoing scene, and then jump and zoom in the incoming
  return new cc.TransitionJumpZoom(t, s);
});
arr.push(function (t, s) {
  // Fade out the outgoing scene and then fade in the incoming scene
  return new cc.TransitionFade(t, s);
});

arr.push(function (t, s) {
  // Fade out the outgoing scene and then fade in the incoming scene
  return new cc.TransitionFade(t, s, cc.color(255, 255, 255));
});

arr.push(function (t, s) {
  // Shrink the outgoing scene while grow the incoming scene
  return new cc.TransitionShrinkGrow(t, s);
});

arr.push(function (t, s) {
  // Rotate and zoom out the outgoing scene, and then rotate and zoom in the incoming
  return new cc.TransitionRotoZoom(t, s);
});

arr.push(function (t, s) {
  // Move in from to the left the incoming scene
  return new cc.TransitionMoveInL(t, s);
});

arr.push(function (t, s) {
  // Move in from to the right the incoming scene
  return new cc.TransitionMoveInR(t, s);
});

arr.push(function (t, s) {
  // Move in from to the top the incoming scen
  return new cc.TransitionMoveInT(t, s);
});

arr.push(function (t, s) {
  // Move in from to the bottom the incoming scene
  return new cc.TransitionMoveInB(t, s);
});

arr.push(function (t, s) {
  // a transition that a new scene is slided from left
  return new cc.TransitionSlideInL(t, s);
});

arr.push(function (t, s) {
  // Slide in the incoming scene from the right border
  return new cc.TransitionSlideInR(t, s);
});

arr.push(function (t, s) {
  // Slide in the incoming scene from the top border
  return new cc.TransitionSlideInT(t, s);
});

arr.push(function (t, s) {
  // Slide in the incoming scene from the bottom border
  return new cc.TransitionSlideInB(t, s);
});

arr.push(function (t, s) {
  // Cross fades two scenes using the cc.RenderTexture object
  return new cc.TransitionCrossFade(t, s);
});

arr.push(function (t, s) {
  // A counter clock-wise radial transition to the next scene
  return new cc.TransitionProgressRadialCCW(t, s);
});

arr.push(function (t, s) {
  // A counter colock-wise radial transition to the next scene
  return new cc.TransitionProgressRadialCW(t, s);
});

arr.push(function (t, s) {
  // A transition which peels back the bottom right hand corner of a scene
  // to transition to the scene beneath it simulating a page turn.
  // This uses a 3DAction so it's strongly recommended that depth buffering
  // is turned on in cc.director using:cc.director.setDepthBufferFormat(kDepthBuffer16);
  cc.director.setDepthTest(true);
  return new cc.TransitionPageTurn(t, s, false);
});

arr.push(function (t, s) {
  // A transition which peels back the bottom right hand corner of a scene
  // to transition to the scene beneath it simulating a page turn.
  // This uses a 3DAction so it's strongly recommended that depth buffering
  // is turned on in cc.director using:cc.director.setDepthBufferFormat(kDepthBuffer16);
  cc.director.setDepthTest(true);
  return new cc.TransitionPageTurn(t, s, true);
});

arr.push(function (t, s) {
  // Fade the tiles of the outgoing scene from the left-bottom corner the to top-right corner
  return new cc.TransitionFadeTR(t, s);
});

arr.push(function (t, s) {
  // Fade the tiles of the outgoing scene from the top-right corner to the bottom-left corner
  return new cc.TransitionFadeBL(t, s);
});

arr.push(function (t, s) {
  // Fade the tiles of the outgoing scene from the top-right corner to the bottom-left corner
  return new cc.TransitionFadeUp(t, s);
});

arr.push(function (t, s) {
  // Fade the tiles of the outgoing scene from the top to the bottom
  return new cc.TransitionFadeDown(t, s);
});

arr.push(function (t, s) {
  // Turn off the tiles of the outgoing scene in random order
  return new cc.TransitionTurnOffTiles(t, s);
});

arr.push(function (t, s) {
  // The odd rows goes to the left while the even rows goes to the right
  return new cc.TransitionSplitRows(t, s);
});

arr.push(function (t, s) {
  // The odd columns goes upwards while the even columns goes downward
  return new cc.TransitionSplitCols(t, s);
});