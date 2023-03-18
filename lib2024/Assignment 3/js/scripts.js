//Here we are assinging our player sprite to a variable called playerImg.
var playerImg = new Image();
playerImg.src = "images/player.png";

/*
//Going to use this constant to scale up the player a little bit with the drawImage below.
const pScale = 1.3; */

//Here we are defining the default height and width of the player sprite to make it easier to swap between frames below.
const pHeight = 32;
const pWidth = 32;

//This function activates when the page loads and animates the player's sprite.
playerImg.onload = function() {
	pAnimation ();
} 


//This function does the math we need to pick the individual frames in our spritesheet and converts them to simple frame numbers. We can choose between the rows and columns with the first two properties, and adjust positioning with the second two.
function playerFrame(frameX, frameY, canvasX, CanvasY) {
	/*var board = document.getElementById("board");
	var ctx = board.getContext("2d");*/
	ctx.drawImage(playerImg, frameX * pWidth, frameY * pHeight, pWidth, pHeight, canvasX, canvasY, pWidth, pHeight);
};


//This function controls the player's sprite's animation and makes the image appear. The onload function above just calls this function. The function below allows us to just input an X and Y frame number from the spritesheet instead of having to do the math directly.
function pAnimation() {
	var board = document.getElementById("board");
	var ctx = board.getContext("2d");
	playerFrame(1, 1, 0, 0);
	/*ctx.drawImage(playerImg, 0, 0, pWidth, pHeight, 400, 275, pWidth, pHeight);
	ctx.drawImage(playerImg, pWidth, 0, pWidth, pHeight, 432, 275, pWidth, pHeight);*/
};

