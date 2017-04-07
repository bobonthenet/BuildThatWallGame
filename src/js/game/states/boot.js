var Stats = require('Stats')
  , properties = require('../properties')
  , boot = {};

boot.init = function () {
  // this.game.sound.touchLocked = true;
  // this.game.input.touch.addTouchLockCallback(function () {
  //     if (this.noAudio || !this.touchLocked || this._unlockSource !== null) {
  //         return true;
  //     }
  //     if (this.usingWebAudio) {
  //         // Create empty buffer and play it
  //         // The SoundManager.update loop captures the state of it and then resets touchLocked to false

  //         var buffer = this.context.createBuffer(1, 1, 22050);
  //         this._unlockSource = this.context.createBufferSource();
  //         this._unlockSource.buffer = buffer;
  //         this._unlockSource.connect(this.context.destination);

  //         if (this._unlockSource.start === undefined) {
  //             this._unlockSource.noteOn(0);
  //         }
  //         else {
  //             this._unlockSource.start(0);
  //         }

  //         //Hello Chrome 55!
  //         if (this._unlockSource.context.state === 'suspended') {
  //             this._unlockSource.context.resume();
  //         }
  //     }

  //     //  We can remove the event because we've done what we needed (started the unlock sound playing)
  //     return true;

  // }, this.game.sound, true);

  this.game.device.whenReady(function(){
    if(this.game.device.cordova) {
      if(typeof Cocoon.Ad.AdMob !== 'undefined' && Cocoon.Ad.AdMob) {
        this.setupAdmob();
      }
    }
  }, this)
};

boot.create = function () {

  if (properties.showStats) {
    addStats(this.game);
  }

  this.game.sound.mute = properties.mute;

  this.game.state.start('preloader');
};

boot.setupAdmob = function() {
  this.game.interstitial = Cocoon.Ad.AdMob.createInterstitial('ca-app-pub-1293320384874950/4095392425');

  this.game.interstitial.on("load", function(){
      console.log("Interstitial loaded");
  });
  
  this.game.interstitial.on("fail", function(){
      console.log("Interstitial failed");
  });
  
  this.game.interstitial.on("show", function(){
      console.log("Interstitial shown");
  });
  
  this.game.interstitial.on("dismiss", function(){
    console.log("Interstitial dismissed");
    this.game.interstitial.load();
  });
}

function addStats(game) {
  var stats = new Stats();

  stats.setMode(0);

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.right = '0px';
  stats.domElement.style.top = '0px';

  document.body.appendChild(stats.domElement);

  // In order to correctly monitor FPS, we have to make calls to the stats package before and after phaser's update.
  var oldUpdate = game.update;
  game.update = function() {
    stats.begin();
    oldUpdate.apply(game, arguments);
    stats.end();
  };
}

module.exports = boot;
