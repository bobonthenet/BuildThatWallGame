var menu = {};

menu.init = function() {
  //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

}

menu.preload = function() {
  this.game.load.image('menu', 'images/MenuScreen.png');
}

menu.create = function() {
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;


  this.s = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'menu');
  this.s.anchor.set(0.5);

  var playGameButton = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Press or Click to Play Game",
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

module.exports = menu;
