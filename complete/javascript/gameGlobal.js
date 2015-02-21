//Hold "global variables" in one closure/self-executing function
//Suggested reading of the Revealing Module Patter:
//http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
//https://carldanley.com/js-revealing-module-pattern/

var Game = (function() {
  var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d")
      heroShip = new HeroShip({
          x:300,
          y:300,
          image:"images/heroShip.png",
          speed: 4
        }),
      enemies =  [new EnemyShip({
        x: 0, 
        y: 0,
        image:"images/enemyShip.png", 
        speed: 2, 
        hero: heroShip
      })],
      coin = new Coin({
        x: 400, 
        y: 400,
        image:"images/coin.png"
      }),
      bullets = [],
      spaceImg = createImage("images/spaceBG.png");
  canvas.width = 912;
  canvas.height = 718;

  return {
    canvas: canvas,
    coin: coin,
    coinsCollected: 0,
    ctx: ctx,
    enemies: enemies,
    heroShip: heroShip,
    keysDown: {},
    over: false,
    spaceImg: spaceImg,
    bullets : bullets
  }
}())