
const GAMe = new Phaser.Game(480, 320, Phaser.AUTO, null, {
  preload: preload, create: create, update: update
});
function preload() {
  GAME.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  GAME.scale.pageAlignHorizontally = true;
  GAME.scale.pageAlignVertically = true;
}

function create() {}

function update() {} 