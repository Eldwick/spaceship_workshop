
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var spaceImg = createImage("images/spaceBG.png")
var heroShip = new HeroShip({x:300, y:300, image:"images/heroShip.png", speed: 4})
var enemyShip = new EnemyShip({x:0, y:0, image:"images/enemyShip.png", speed: 2, hero:heroShip})
var enemyShip2 = new EnemyShip({x:600, y:300, image:"images/enemyShip.png", speed: 2, hero:heroShip})
var coin = newCoin()
var coins = 0;
var enemies = [newRandomEnemy() ,newRandomEnemy()];
canvas.width = 912;
canvas.height = 718;

function newRandomEnemy() {
  return new EnemyShip({
    x:32 + (Math.random() * (canvas.width - 64)), 
    y:32 + (Math.random() * (canvas.height - 64)),
    image:"images/enemyShip.png", 
    speed: 2, 
    hero:heroShip
  })
}
setInterval(function() {
  enemies.push(newRandomEnemy())
}, 2000)

var keysDown = {};

addEventListener("keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

function newCoin() {
  return new Coin({
    x:32 + (Math.random() * (canvas.width - 64)), 
    y:32 + (Math.random() * (canvas.height - 64)),
    image:"images/coin.png"
  })
}

function render() {
  ctx.drawImage(spaceImg, 0, 0);
  heroShip.move();
  heroShip.render()
  for (var i = 0, enemiesLength = enemies.length; i < enemiesLength; i++) {
    enemies[i].chase()
    enemies[i].render()
    if (
      heroShip.x <= (enemies[i].x + 32)
      && enemies[i].x <= (heroShip.x + 32)
      && heroShip.y <= (enemies[i].y + 32)
      && enemies[i].y <= (heroShip.y + 32)
    ) {
      ctx.drawImage(spaceImg, 0, 0);
    ctx.font = "60px Helvetica";
    ctx.fillText("GAME OVER", 275, 300);
    ctx.fillText("Score: " + coins, 275, 380);
      return
    }
  }
  if (
    heroShip.x <= (coin.x + 32)
    && coin.x <= (heroShip.x + 32)
    && heroShip.y <= (coin.y + 32)
    && coin.y <= (heroShip.y + 32)
    ) {
    coins++;
    coin = newCoin();
  }
  coin.render()
  ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
  ctx.fillText("Coins: " + coins, 32, 32);
  requestAnimationFrame(render);
}


$(document).ready(function() {
  $("#game").html(canvas)
  render()
})

