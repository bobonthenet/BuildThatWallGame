var menu = {};

menu.init = function() {
  //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            //  If you have any desktop specific settings, they can go in here
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            //  Same goes for mobile settings.
            //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"


            // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // var width = window.innerWidth;
            // var height = 600 * (width/800);
            // // this.scale.startFullScreen(false);
            // this.scale.maxWidth = width;
            // this.scale.maxHeight = height;
            // this.scale.refresh();
            this.goFull();
        }
}

menu.preload = function() {

  // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  // this.game.scale.minWidth = 200;
  // this.game.scale.minHeight = 150;
  // this.game.scale.maxWidth = 800;
  // this.game.scale.maxHeight = 600;
  // this.game.scale.pageAlignHorizontally = true;
  // this.game.scale.pageAlignVertically = true;
  // this.game.scale.setGameSize();
  // this.game.scale.refresh();

  this.game.load.image('menu', 'images/MenuScreen.png');
}

menu.create = function() {

  this.s = this.game.add.tileSprite(0, 0, 800, 600, 'menu');

  var playGameButton = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Play Game",
  {
    font: "24px Arial",
    fill: "#fff",
    align: "center" }
  );
  playGameButton.anchor.set(0.5);
  playGameButton.inputEnabled = true;
  playGameButton.events.onInputDown.add(this.playGame, this);
}

menu.playGame = function() {
  this.game.state.start('boot');
}

menu.goFull = function() {
  var width = window.screen.width;
  var height = 500 * (width/800);
  this.game.scale.startFullScreen(false);
  this.game.scale.maxWidth = width;
  this.game.scale.maxHeight = height;
  this.game.scale.refresh();
}

module.exports = menu;
