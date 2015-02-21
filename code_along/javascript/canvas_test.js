var canvas = document.getElementById("testCanvas"),
    ctx = canvas.getContext("2d");

// //Create an image that can be drawn on a canvas
var heroShip = new Image();
heroShip.src = "images/heroShip.png";
ctx.drawImage(heroShip, 0, 0);

////Move Spaceship horizonally with setInterval
// var x = 0
// setInterval(function(){
//   ctx.drawImage(heroShip, x, 0);
//   x += 2
// }, 50)

//// Move Spaceship horizonally with requestAnimationFrame
// var x = 0
// function update(){
//   ctx.fillStyle = "rgb(255,255,255)";  
//   ctx.fillRect(0, 0, 300, 255);

//   ctx.drawImage(heroShip, x, 0);
//   x += 1
//   requestAnimationFrame(update)
// }
// update()


// // Handle keyboard controls
// var keysDown = {};

// addEventListener("keydown", function (e) {
//   keysDown[e.keyCode] = true;
// }, false);

// addEventListener("keyup", function (e) {
//   delete keysDown[e.keyCode];
// }, false);

// // //New update with keyboard controls
// var x = 0, y = 0;
// var update = function () {
//   if (38 in keysDown) { // Player holding up
//     y -= 3;
//   }
//   if (40 in keysDown) { // Player holding down
//     y += 3;
//   }
//   if (37 in keysDown) { // Player holding left
//     x -= 3;
//   }
//   if (39 in keysDown) { // Player holding right
//     x += 3;
//   }
//   ctx.fillStyle = "rgb(0,0,0)";  
//   ctx.fillRect(0, 0, 300, 255);
//   ctx.drawImage(heroShip, x, y);
//   requestAnimationFrame(update)
// }
// update()