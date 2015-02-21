$(document).ready(function() {
  setUpGame()
  updateCanvas() //Loop

  ////Functions run on load
  function setUpGame() {
    createKeyListenerController()
    addEnemyInterval() //new enemy added every 2 seconds
    $("#game").html(Game.canvas)
  }

  function updateCanvas() {
    //Guard clause to end updateCanvas Loop
    if (Game.over) {
      return
    }
    
    renderBG()

    moveHero() //moved via keyboard input
    moveEnemies() //enemies chase hero, also checks if enemies have caught hero
    Game.coin.render()

    checkCoinCollect()
    renderCoinsCollected() 
    
    requestAnimationFrame(updateCanvas);
    //https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame
  }
  //// \end functions run on load

  /////Set Up Game functions
  function createKeyListenerController() {
    window.addEventListener("keydown", function (e) {
      Game.keysDown[e.keyCode] = true;
    }, false);

    window.addEventListener("keyup", function (e) {
      delete Game.keysDown[e.keyCode];
    }, false);
  }

  function addEnemyInterval() {
    window.setInterval(function() {
      Game.enemies.push(newRandomEnemy())
    }, 2000)
  }

  //// \end Set Up Game functions

  ////Update canvas functions
  function renderBG() {
    Game.ctx.drawImage(Game.spaceImg, 0, 0);
  }

  function moveEnemies() {
    var enemies = Game.enemies;
    for (var i = 0, enemiesLength = enemies.length; i < enemiesLength; i++) {
      enemies[i].chase()
      enemies[i].render()
      checkEnemyTouch(enemies[i])
    }
  }

  function moveHero() {
    var heroShip = Game.heroShip;

    heroShip.move();
    heroShip.render()
  }

  function checkCoinCollect() {
    var heroShip = Game.heroShip,
        coin = Game.coin
    if (
        heroShip.x <= (coin.x + 32)
        && coin.x <= (heroShip.x + 32)
        && heroShip.y <= (coin.y + 32)
        && coin.y <= (heroShip.y + 32)
      ) {
      Game.coinsCollected++;
      Game.coin = newCoin();
    }
  }

  function renderCoinsCollected() {
    Game.ctx.fillStyle = "rgb(250, 250, 250)";
    Game.ctx.font = "24px Helvetica";
    Game.ctx.textAlign = "left";
    Game.ctx.textBaseline = "top";
    Game.ctx.fillText("Coins: " + Game.coinsCollected, 32, 32);
  }

  //// \end Update Canvas Functions

  //Used in addEnemyInterval(), runs every interval
  function newRandomEnemy() {
    var options = new randomCoordinatesObj()
    options.image = "images/enemyShip.png"
    options.speed = 2
    options.hero = Game.heroShip
    return new EnemyShip({
      x: randomCoordinate("x"), 
      y: randomCoordinate("y"),
      image:"images/enemyShip.png", 
      speed: 2, 
      hero: Game.heroShip
    })
  }

  //Used in moveEnemies() inside enimies array itteration
  function checkEnemyTouch(enemy) {
    var heroShip = Game.heroShip;
    if (
        heroShip.x <= (enemy.x + 32)
        && enemy.x <= (heroShip.x + 32)
        && heroShip.y <= (enemy.y + 32)
        && enemy.y <= (heroShip.y + 32)
      ){
      Game.ctx.font = "60px Helvetica";
      Game.ctx.fillText("GAME OVER", 275, 300);
      Game.ctx.fillText("Score: " + Game.coinsCollected, 275, 380);
      Game.over = true
    }
  }

  //Used in renderCoinsCollected() if coin is collected
  function newCoin() {
    var options = new randomCoordinatesObj()
    options.image = "images/coin.png"
    return new Coin(options)
  }


  //Functions used to create random spawn point for new coin and new enemy
  function randomCoordinatesObj() {
    this.x = randomCoordinate("x");
    this.y = randomCoordinate("y");
  }

  function randomCoordinate(type) {
    if (type == "x"){
      return 32 + (Math.random() * (Game.canvas.width - 64))
    } else {
      return 32 + (Math.random() * (Game.canvas.height - 64))
    }
  }
})