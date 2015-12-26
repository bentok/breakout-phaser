
// Define game object and assign preload, create, and update objects
const GAME = new Phaser.Game(480, 320, Phaser.AUTO, null, {
  preload: preload, create: create, update: update
});

// Ball settings
let ball;

function preload() {
  GAME.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  GAME.scale.pageAlignHorizontally = true;
  GAME.scale.pageAlignVertically = true;
  GAME.stage.backgroundColor = '#eee';
  GAME.load.image('ball', '../src/img/ball.png');
}

function create() {
  ball = GAME.add.sprite(50, 50, 'ball');
}

function update() {} 