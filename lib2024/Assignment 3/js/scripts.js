//This defines our player sprite as an image on the screen
let playerImg = new Image();
playerImg.src = "images/player.png";

//Loads the player when the image is done loading. If we don't do this, the whole thing just doesn't work.
playerImg.onload = function() {
	loadPlayer();
};

//This defines our game board (i.e. our canvas element).
const board = document.getElementById("board");
const ctx = board.getContext("2d");

//Going to define the default dimensions of our sprites here as constants to make it easier to scale them.
const pWidth = 32;
const pHeight = 32;

//These variables/constants are going to be used to control our animation cycle. The loop arrays will track which which frames to use, and the loopIndex will track the current frame. All our animations are only 2 frames for the sake of simplicity.
const xAnimLoop = [0, 1, 2, 3, 4, 5, 6, 7];
let currentLoopIndex = 0;
let frameCount = 0;

//This function is used to clean up our frame selection for animations. Basically, it's choosing a spot in the sprite sheet to treat as a frame. It can also be used to position the sprite at a starting point on the board.
function playerFrame(frameX, frameY, boardX, boardY){
	ctx.drawImage(playerImg, frameX * pWidth, frameY * pHeight, pWidth, pHeight, boardX, boardY, pWidth, pHeight);
};

//This function makes our image show up. 
function loadPlayer(){
	window.requestAnimationFrame(pIdleLeft);
	//playerFrame(0, 0, 400, 255);
};

//Now we're going to animate our player sprite's idle animation by creating an animation loop. Basically this draws and then erases the animation with the relevant frame using the requestAnimationFrame method and our defined pStep function.
function pIdleUp() {
	//This little bit limits the framerate to 20 so the animation isn't too fast.
	frameCount++;
	if (frameCount < 20){
		window.requestAnimationFrame(pIdleUp);
		return;
	}
	frameCount = 0;
	ctx.clearRect(0, 0, board.width, board.height);
	playerFrame(xAnimLoop[currentLoopIndex], 0, 0, 0);
	currentLoopIndex++;
	if (currentLoopIndex >= 2) {
		currentLoopIndex = 0;
	};
	window.requestAnimationFrame(pIdleUp);
};

//I can now copy and paste the above function and modify it slightly to create my other animations.

//Pretty much all I have to change here is add a + 2 to my xAnim loop so that the animation cycles between frames 2 and 3 instead of 0 and 1.
function pIdleDown() {
	frameCount++;
	if (frameCount < 20){
		window.requestAnimationFrame(pIdleDown);
		return;
	}
	frameCount = 0;
	ctx.clearRect(0, 0, board.width, board.height);
	playerFrame(xAnimLoop[currentLoopIndex] + 2, 0, 0, 0);
	currentLoopIndex++;
	if (currentLoopIndex >= 2) {
		currentLoopIndex = 0;
	};
	window.requestAnimationFrame(pIdleDown);
};

function pIdleRight() {
	frameCount++;
	if (frameCount < 20){
		window.requestAnimationFrame(pIdleRight);
		return;
	}
	frameCount = 0;
	ctx.clearRect(0, 0, board.width, board.height);
	playerFrame(xAnimLoop[currentLoopIndex] + 4, 0, 0, 0);
	currentLoopIndex++;
	if (currentLoopIndex >= 2) {
		currentLoopIndex = 0;
	};
	window.requestAnimationFrame(pIdleRight);
};

function pIdleLeft() {
	frameCount++;
	if (frameCount < 20){
		window.requestAnimationFrame(pIdleLeft);
		return;
	}
	frameCount = 0;
	ctx.clearRect(0, 0, board.width, board.height);
	playerFrame(xAnimLoop[currentLoopIndex] + 6, 0, 0, 0);
	currentLoopIndex++;
	if (currentLoopIndex >= 2) {
		currentLoopIndex = 0;
	};
	window.requestAnimationFrame(pIdleLeft);
};