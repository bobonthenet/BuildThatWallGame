var preloader = {};

preloader.preload = function () {
  this.game.load.image('logo', 'images/phaser.png');
  this.game.load.atlas('breakout', 'images/breakout.png', 'images/breakout.json');
  this.game.load.image('seal', 'images/seal.png');
  this.game.load.atlas('trump', 'images/trump.png', 'images/trump.json');

  this.game.load.audio('weNeedToBuild', [ 'audio/WeNeedToBuild.mp3', 'audio/WeNeedToBuild.ogg' ]);

  this.game.load.audio('smash1', [ 'audio/smash1.mp3', 'audio/smash1.ogg' ]);
  this.game.load.audio('smash2', [ 'audio/smash2.mp3', 'audio/smash2.ogg' ]);

  //Hit Trump sounds.
  this.game.load.audio('beef', [ 'audio/beef.mp3', 'audio/beef.ogg' ]);
  this.game.load.audio('stopIt', [ 'audio/stopit.mp3', 'audio/stopit.ogg' ]);
  this.game.load.audio('cameoutofnowhere', [ 'audio/cameoutofnowhere.mp3', 'audio/cameoutofnowhere.ogg' ]);
  this.game.load.audio('stupidpeopleinourcountry', [ 'audio/stupidpeopleinourcountry.mp3', 'audio/stupidpeopleinourcountry.ogg' ]);

};

preloader.create = function () {
  this.game.state.start('game');
};

module.exports = preloader;
