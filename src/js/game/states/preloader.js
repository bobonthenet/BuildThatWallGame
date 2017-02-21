var preloader = {};

preloader.preload = function () {
  this.game.load.image('logo', './images/phaser.png');
  this.game.load.atlas('breakout', './images/breakout.png', './images/breakout.json');
  this.game.load.image('seal', './images/seal.png');
  this.game.load.atlas('trump', './images/trump.png', './images/trump.json');

  this.game.load.audio('weNeedToBuild', [ './audio/WeNeedToBuild.ogg', './audio/WeNeedToBuild.mp3' ]);

  this.game.load.audio('smash1', [ './audio/smash1.ogg', './audio/smash1.mp3' ]);
  this.game.load.audio('smash2', [ './audio/smash2.ogg', './audio/smash2.mp3' ]);

  //Hit Trump sounds.
  this.game.load.audio('beef', [ './audio/beef.ogg', './audio/beef.mp3' ]);
  this.game.load.audio('stopIt', [ './audio/stopit.ogg', './audio/stopit.mp3' ]);
  this.game.load.audio('cameoutofnowhere', [ './audio/cameoutofnowhere.ogg', './audio/cameoutofnowhere.mp3' ]);
  this.game.load.audio('stupidpeopleinourcountry', [ './audio/stupidpeopleinourcountry.ogg', './audio/stupidpeopleinourcountry.mp3' ]);

};

preloader.create = function () {
  this.game.state.start('game');
};

module.exports = preloader;
