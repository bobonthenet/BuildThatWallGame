var game = {};

game.init = function() {
  this.ball= {};
  this.paddle= {};
  this.bricks= {};

  this.ballOnPaddle = true;
  this.wallBuilt = false;
  this.wallBuiltAudio = false;
  this.deadBricks = 0;
  this.brickX = 0;
  this.brickY = 0;

  this.lives = 3;
  this.score = 0;

  this.scoreText= {};
  this.livesText= {};
  this.introText= {};
  this.s= {};
};

game.create = function () {
  this.weNeedToBuild = game.add.audio('weNeedToBuild');

  this.smash1 = game.add.audio('smash1');
  this.smash2 = game.add.audio('smash2');

  this.stopIt = game.add.audio('stopIt');
  this.beef = game.add.audio('beef');
  this.cameoutofnowhere = game.add.audio('cameoutofnowhere');
  this.stupidpeopleinourcountry = game.add.audio('stupidpeopleinourcountry');

  game.physics.startSystem(Phaser.Physics.ARCADE);

  //  We check bounds collisions against all walls other than the bottom one
  game.physics.arcade.checkCollision.down = false;

  this.s = game.add.tileSprite(game.world.centerX, game.world.centerY, 600, 600, 'seal');
  this.s.anchor.setTo(0.5, 0.5);

  this.bricks = game.add.group();
  this.bricks.enableBody = true;
  this.bricks.physicsBodyType = Phaser.Physics.ARCADE;

  this.trump = game.add.sprite(game.world.centerX, 0, 'trump', 'smugtrump.png');
  game.physics.enable(this.trump, Phaser.Physics.ARCADE);

  this.trump.body.collideWorldBounds = true;
  this.trump.body.bounce.set(1);
  this.trump.body.drag.x = 300;

  this.paddle = game.add.sprite(game.world.centerX, 500, 'breakout', 'bumper.png');
  this.paddle.anchor.setTo(0.5, 0.5);

  game.physics.enable(this.paddle, Phaser.Physics.ARCADE);

  this.paddle.body.collideWorldBounds = true;
  this.paddle.body.bounce.set(1);
  this.paddle.body.immovable = true;

  this.ball = game.add.sprite(game.world.centerX, this.paddle.y - 16, 'breakout', 'ball1.png');
  this.ball.anchor.set(0.5);
  this.ball.checkWorldBounds = true;

  game.physics.enable(this.ball, Phaser.Physics.ARCADE);

  this.ball.body.collideWorldBounds = true;
  this.ball.body.bounce.set(1);
  this.ball.body.maxVelocity.x = 700;
  this.ball.body.maxVelocity.y = 700;

  this.ball.animations.add('spin', [ 'ball1.png', 'ball2.png', 'ball3.png', 'ball4.png', 'ball5.png' ], 50, true, false);

  this.ball.events.onOutOfBounds.add(game.ballLost, this);

  this.scoreText = game.add.text(32, 600, 'score: 0', { font: '20px Arial', fill: '#ffffff', align: 'left' });
  this.liveText = game.add.text(520, 600, 'lives: 3', { font: '20px Arial', fill: '#ffffff', align: 'left' });
  this.introText = game.add.text(game.world.centerX, 400, '- click to start -', { font: '40px Arial', fill: 'red', align: 'center' });
  this.introText.anchor.setTo(0.5, 0.5);

  game.input.onDown.add(game.releaseBall, this);

};

game.update = function () {

  if(this.trump.body.velocity.x === 0) {
    this.trump.loadTexture('trump', 0);
  }
  this.trump.body.velocity.y = 0;

  //  Fun, but a little sea-sick inducing :) Uncomment if you like!
  // s.tilePosition.x += (game.input.speed.x / 2);

  game.buildThatWall();

  this.paddle.x = game.input.x;

  if (this.paddle.x < 24)
  {
      this.paddle.x = 24;
  }
  else if (this.paddle.x > game.width - 24)
  {
      this.paddle.x = game.width - 24;
  }

  if (this.ballOnPaddle)
  {
      this.ball.body.x = this.paddle.x;
  }
  else
  {
      game.physics.arcade.collide(this.ball, this.paddle, game.ballHitPaddle, null, this);
      game.physics.arcade.collide(this.ball, this.bricks, game.ballHitBrick, null, this);
      game.physics.arcade.collide(this.ball, this.trump, game.ballHitTrump, null, this);
  }
};

game.releaseBall = function () {

    if (this.ballOnPaddle)
    {
        this.ballOnPaddle = false;
        this.ball.body.velocity.y = -300;
        this.ball.body.velocity.x = -75;
        this.ball.animations.play('spin');
        this.introText.visible = false;
    }

};

game.ballLost = function () {
    this.stupidpeopleinourcountry.play();
    this.lives--;
    this.liveText.text = 'lives: ' + this.lives;

    if (this.lives === 0)
    {
        game.gameOver();
    }
    else
    {
        this.ballOnPaddle = true;

        this.ball.reset(this.paddle.body.x + 16, this.paddle.y - 16);

        this.ball.animations.stop();
    }

};

game.gameOver = function () {

    this.ball.body.velocity.setTo(0, 0);

    this.introText.text = 'Game Over!';
    this.introText.visible = true;
    this.time.events.add(Phaser.Timer.SECOND * 4, function() { this.state.start('menu'); }, this);

};

game.ballHitBrick = function (_ball, _brick) {

    if(this.rnd.integerInRange(0, 1) === 1){
      this.smash1.play();
    } else {
      this.smash2.play();
    }

    _brick.kill();

    this.score += 10;

    this.scoreText.text = 'score: ' + this.score;

    //  Are they any bricks left?
    if (this.bricks.countLiving() === 0)
    {
        //  New level starts
        this.score += 1000;
        this.scoreText.text = 'score: ' + this.score;
        this.introText.text = '- Next Level -';

        //  Let's move the ball back to the paddle
        this.ballOnPaddle = true;
        this.ball.body.velocity.set(0);
        this.ball.x = this.paddle.x + 16;
        this.ball.y = this.paddle.y - 16;
        this.ball.animations.stop();

        //  And bring the bricks back from the dead :)
        // this.bricks.callAll('revive');
        this.wallBuilt = false;
        this.wallBuiltAudio = false;
    }

};

game.ballHitPaddle = function (_ball, _paddle) {

    var diff = 0;

    if (_ball.x < _paddle.x)
    {
        //  Ball is on the left-hand side of the paddle
        diff = _paddle.x - _ball.x;
        _ball.body.velocity.x = (-10 * diff);
    }
    else if (_ball.x > _paddle.x)
    {
        //  Ball is on the right-hand side of the paddle
        diff = _ball.x -_paddle.x;
        _ball.body.velocity.x = (10 * diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        _ball.body.velocity.x = 2 + Math.random() * 8;
    }
  };

  game.ballHitTrump = function (_ball, _trump) {

    var trumpHit = this.rnd.integerInRange(0, 2);

    switch(trumpHit) {
      case 0:
        this.stopIt.play();
        break;
      case 1:
        this.beef.play();
        break;
      case 2:
        this.cameoutofnowhere.play();
        break;
    }




    _trump.loadTexture('trump', 1);
    var diff = 0;
    this.score += 100;
    this.scoreText.text = 'score: ' + this.score;

    if (_ball.x < _trump.x)
    {
        //  Ball is on the left-hand side of the paddle
        diff = _trump.x - _ball.x;
        _ball.body.velocity.x = (-10 * diff);
    }
    else if (_ball.x > _trump.x)
    {
        //  Ball is on the right-hand side of the paddle
        diff = _ball.x -_trump.x;
        _ball.body.velocity.x = (10 * diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        _ball.body.velocity.x = 2 + Math.random() * 8;
    }

    if (_ball.y < _trump.y)
    {
        //  Ball is on the left-hand side of the paddle
        diff = _trump.y - _ball.y;
        _ball.body.velocity.y = (-10 * diff);
    }
    else if (_ball.y > _trump.y)
    {
        //  Ball is on the right-hand side of the paddle
        diff = _ball.y -_trump.y;
        _ball.body.velocity.y = (10 * diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        _ball.body.velocity.y = 2 + Math.random() * 8;
    }

    if(this.ball.body.velocity.y === 0){
      this.ball.body.velocity.y = 10;
    }
  };

  game.buildThatWall = function () {

    if(!this.wallBuiltAudio) {
      this.weNeedToBuild.play();
      this.wallBuiltAudio = true;
    }

    if(!this.wallBuilt)
    {
      if(this.bricks.length === 60) { //60
        if(this.bricks.countDead() > 0) {
          var dead = this.bricks.getFirstDead();
          dead.revive();
          this.deadBricks ++;
        } else {
          this.deadBricks = 0;
          this.wallBuilt = true;
        }

      } else {
        if(this.brickY === 4) { //4
          this.wallBuilt = true;
        } else {
          var brick;
          brick = this.bricks.create(30 + (this.brickX * 36), 100 + (this.brickY * 52), 'breakout', 'brick.png');
          brick.body.bounce.set(1);
          brick.body.immovable = true;
          this.brickX ++;

          if(this.brickX === 15)
          {
            this.brickX = 0;
            this.brickY ++;
          }
        }
      }
    }
  };

module.exports = game;
