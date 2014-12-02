$(document).ready(function() {
  createKeyListenerController()
  addEnemyInterval() //new enemy added every 2 seconds
  $("#game").html(Game.canvas)
  updateCanvas()
})

function updateCanvas() {
  //Guard clause to end updateCanvas Loop
  if (Game.over) {
    return
  }
  
  Game.renderBG()

  moveHero() //moved via keyboard input
  moveEnemies() //enemies chase hero, also checks if enemies have caught hero
  
  checkCoinCollect()
 
  Game.coin.render()

  renderCoinsCollected() 
  
  requestAnimationFrame(updateCanvas);
}

var Game = (function() {
  var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d")
      heroShip = new HeroShip({
          x:300,
          y:300,
          image:"images/heroShip.png",
          speed: 4
        }),
      spaceImg = createImage("images/spaceBG.png")

  canvas.width = 912;
  canvas.height = 718;

  return {
    canvas: canvas,
    coin: new Coin({
      x: 400, 
      y: 400,
      image:"images/coin.png"
    }),
    coinsCollected: 0,
    ctx: ctx,
    enemies: [new EnemyShip({
      x: 0, 
      y: 0,
      image:"images/enemyShip.png", 
      speed: 2, 
      hero: heroShip
    })],
    heroShip: heroShip,
    keysDown: {},
    over: false,
    renderBG: function() {
      this.ctx.drawImage(spaceImg, 0, 0);
    }
  }
}())

function randomCoordinate(type) {
  if (type == "x"){
    return 32 + (Math.random() * (Game.canvas.width - 64))
  } else {
    return 32 + (Math.random() * (Game.canvas.height - 64))
  }
}

function randomCoordinatesObj() {
  this.x = randomCoordinate("x");
  this.y = randomCoordinate("y");
}

function newCoin() {
  var options = new randomCoordinatesObj()
  options.image = "images/coin.png"
  return new Coin(options)
}

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

function addEnemyInterval() {
  window.setInterval(function() {
    Game.enemies.push(newRandomEnemy())
  }, 2000)
}

function createKeyListenerController() {
  window.addEventListener("keydown", function (e) {
    Game.keysDown[e.keyCode] = true;
  }, false);

  window.addEventListener("keyup", function (e) {
    delete Game.keysDown[e.keyCode];
  }, false);
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