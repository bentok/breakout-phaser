'use strict';

// Define game object and assign preload, create, and update objects
var GAME = new Phaser.Game(480, 320, Phaser.AUTO, null, {
  preload: preload, create: create, update: update
});

var ball, paddle, bricks, newBrick, brickInfo;

// Preload assets
function preload() {
  GAME.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  GAME.scale.pageAlignHorizontally = true;
  GAME.scale.pageAlignVertically = true;
  GAME.stage.backgroundColor = '#eee';
  GAME.load.image('ball', '../src/img/ball.png');
  GAME.load.image('paddle', '../src/img/paddle.png');
  GAME.load.image('brick', '../src/img/brick.png');
}

// Calculate behaviors outside of game loop
function create() {
  // Initialize arcade physics
  GAME.physics.startSystem(Phaser.Physics.ARCADE);

  // Create ball sprite and assign arcade physics
  ball = GAME.add.sprite(GAME.world.width * 0.5, GAME.world.height - 22, 'ball');
  GAME.physics.enable(ball, Phaser.Physics.ARCADE);
  // Set bounds (except bottom boundary)
  ball.body.collideWorldBounds = true;
  ball.checkWorldBounds = true;
  GAME.physics.arcade.checkCollision.down = false;
  // Ball behavior
  ball.anchor.set(0.5);
  ball.body.velocity.set(150, -150);
  ball.body.bounce.set(1);
  ball.events.onOutOfBounds.add(function () {
    alert('Game over!');
    location.reload();
  }, this);

  // Create paddle sprite and assign arcade physics
  paddle = GAME.add.sprite(GAME.world.width * 0.5, GAME.world.height - 22, 'paddle');
  GAME.physics.enable(paddle, Phaser.Physics.ARCADE);
  paddle.anchor.set(0.5, 0);
  // Paddle immovable so ball does not affect paddle
  paddle.body.immovable = true;

  // Draw bricks
  initBricks();
}

// Game loop behavior
function update() {
  GAME.physics.arcade.collide(ball, paddle);
  paddle.x = GAME.input.x || GAME.world.width * 0.5;
}

function initBricks() {
  brickInfo = {
    width: 50,
    height: 20,
    count: {
      row: 7,
      col: 3
    },
    offset: {
      top: 50,
      left: 60
    },
    padding: 10
  };

  bricks = GAME.add.group();
  for (var c = 0; c < brickInfo.count.col; c++) {
    for (var r = 0; r < brickInfo.count.row; r++) {
      var brickX = r * (brickInfo.width + brickInfo.padding) + brickInfo.offset.left;
      var brickY = c * (brickInfo.height + brickInfo.padding) + brickInfo.offset.top;
      newBrick = GAME.add.sprite(brickX, brickY, 'brick');
      GAME.physics.enable(newBrick, Phaser.Physics.ARCADE);
      newBrick.body.immovable = true;
      newBrick.anchor.set(0.5);
      bricks.add(newBrick);
    }
  }
}