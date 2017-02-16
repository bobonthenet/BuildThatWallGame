var preloader = {};

preloader.preload = function () {
  this.game.load.image('logo', 'images/phaser.png');
  this.game.load.atlas('breakout', 'images/breakout.png', 'images/breakout.json');
  this.game.load.image('starfield', 'images/starfield.jpg');
};

preloader.create = function () {
  this.game.state.start('game');
};

module.exports = preloader;
