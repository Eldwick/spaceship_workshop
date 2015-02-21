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

var Bullet = function(options) {
  Ship.call(this, options)
}  

Bullet.prototype.move = function() {
  this.y -= this.speed
}


var HeroShip = function(options) {
  Ship.call(this, options);
  this.shooting = false;
}

HeroShip.prototype.shoot = function() {
  if (32 in Game.keysDown && !this.shooting) {//Spacebar shoots bullet!
    Game.bullets.push(new Bullet({
        x : this.x + 11,
        y : this.y,
        speed : this.speed + 3,
        image : "images/bullet.png"
    }))
    this.shooting = true;
    var self = this
    setTimeout(function(){
      self.shooting = false;
    }, 250);
  }
} 

HeroShip.prototype.move = function() {
  if (38 in Game.keysDown) { // Player holding up
    if (this.y > (-20)){
      this.y -= this.speed;
    } else {
      this.y = 718
    }
  }
  if (40 in Game.keysDown) { // Player holding down
    if (this.y < 728){
      this.y += this.speed;
    } else {
      this.y = 0
    }
  }
  if (37 in Game.keysDown) { // Player holding left
    if (this.x > (-20)){
      this.x -= this.speed;
    } else {
      this.x = 920
    }
  }
  if (39 in Game.keysDown) { // Player holding right
    if (this.x < (940)){
      this.x += this.speed;
    } else {
      this.x = 0
    }
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