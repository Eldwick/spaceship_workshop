function createImage(url){
  new_image = new Image();
  new_image.src = url
  return new_image
}

var Renderable = function(options) {
  this.x = options.x 
  this.y = options.y
  this.image = createImage(options.image)
  this.render = function() {
    Game.ctx.drawImage(this.image, this.x, this.y);
  }
}

var Coin = function(options) {
  Renderable.call(this, options)
}

var Ship = function(options) {
  Renderable.call(this, options)
  this.speed = options.speed
}

var HeroShip = function(options) {
  Ship.call(this, options);
}

HeroShip.prototype.move = function() {
  if (38 in Game.keysDown) { // Player holding up
    this.y -= this.speed;
  }
  if (40 in Game.keysDown) { // Player holding down
    this.y += this.speed;
  }
  if (37 in Game.keysDown) { // Player holding left
    this.x -= this.speed;
  }
  if (39 in Game.keysDown) { // Player holding right
    this.x += this.speed;
  }
}

var EnemyShip = function(options) {
  this.hero = options.hero
  Ship.call(this, options);
}

EnemyShip.prototype.chase = function() {
  if (this.x < this.hero.x) {
    this.x += this.speed
  } else {
    this.x -= this.speed
  } 
  if (this.y < this.hero.y) {
    this.y += this.speed 
  } else {
    this.y -= this.speed
  }
}