var preloader = {};

preloader.preload = function () {
  this.game.load.image('logo', 'images/phaser.png');
  this.game.load.atlas('breakout', 'images/breakout.png', 'images/breakout.json');
  this.game.load.image('starfield', 'images/starfield.jpg');
  this.game.load.image('trumphead1', 'images/TrumpHead1.png');

  this.game.load.audio('weNeedToBuild', [ 'audio/WeNeedToBuild.mp3', 'audio/WeNeedToBuild.ogg' ]);
  this.game.load.audio('stopIt', [ 'audio/stopit.mp3', 'audio/stopit.ogg' ]);
};

preloader.create = function () {
  this.game.state.start('game');
};

module.exports = preloader;
