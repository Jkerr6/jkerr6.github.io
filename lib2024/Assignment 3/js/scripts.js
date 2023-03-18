//This defines our player sprite as an image on the screen
let playerImg = new Image();
playerImg.src = "images/player.png";

//Loads the player when the image is done loading. If we don't do this, the whole thing just doesn't work.
playerImg.onload = function() {
	playerLoop();
};

//This defines our game board (i.e. our canvas element).
const BOARD = document.getElementById("board");
const CTX = BOARD.getContext("2d");

//Going to define the default dimensions of our sprites here as constants to make it easier to scale them.
const PWIDTH = 32;
const PHEIGHT = 32;

//These variables/constants are going to be used to control our animation cycle. The loop arrays will track which which frames to use, and the loopIndex will track the current frame. All our animations are only 2 frames for the sake of simplicity.
const XANIMLOOP = [0, 1, 2, 3, 4, 5, 6, 7];
let currentLoopIndex = 0;
let frameCount = 0;

//I some variables here to deal with moving the player sprite. keyPresses tracks what key is being pressed with the listeners below. PSPEED sets a default speed for the character.
let keyPresses = {};
const PSPEED = 1.5;
let currentDirection = "Up";
let isMoving = false;

//These two track the position of the player and can be plugged into the playerFrame function below using the playerLoop function further down below.
let positionX = 400;
let positionY = 255;

//This function is used to clean up our frame selection for animations. Basically, it's choosing a spot in the sprite sheet to treat as a frame. It can also be used to position the sprite at a starting point on the board.
function playerFrame(frameX, frameY, boardX, boardY){
	CTX.drawImage(playerImg, frameX * PWIDTH, frameY * PHEIGHT, PWIDTH, PHEIGHT, boardX, boardY, PWIDTH, PHEIGHT);
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
	CTX.clearRect(0, 0, BOARD.width, BOARD.height);
	playerFrame(XANIMLOOP[currentLoopIndex], 0, 0, 0);
	currentLoopIndex++;
	if (currentLoopIndex >= 2) {
		currentLoopIndex = 0;
	};
	window.requestAnimationFrame(pIdleUp);
};

//I can now copy and paste the above function and modify it slightly to create my other animations.

//Pretty much all I have to change here is add a + 2 to my xAnim loop so that the animation cycles between frames 2 and 3 instead of 0 and 1. These will likely just be templates for the next section.
function pIdleDown() {
	frameCount++;
	if (frameCount < 20){
		window.requestAnimationFrame(pIdleDown);
		return;
	}
	frameCount = 0;
	CTX.clearRect(0, 0, BOARD.width, BOARD.height);
	playerFrame(XANIMLOOP[currentLoopIndex] + 2, 0, 0, 0);
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
	CTX.clearRect(0, 0, BOARD.width, BOARD.height);
	playerFrame(XANIMLOOP[currentLoopIndex] + 4, 0, 0, 0);
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
	CTX.clearRect(0, 0, BOARD.width, BOARD.height);
	playerFrame(XANIMLOOP[currentLoopIndex] + 6, 0, 0, 0);
	currentLoopIndex++;
	if (currentLoopIndex >= 2) {
		currentLoopIndex = 0;
	};
	window.requestAnimationFrame(pIdleLeft);
};

//Now we are going to take on movement. We will have some listeners to detect key inputs and then a function that detects which input and moves the player sprite and plays the appropriate animation.

//Checks if a key is pressed.
window.addEventListener("keydown", keyDownListener, false);
function keyDownListener(event) {
	keyPresses[event.key] = true;
}

//Checks if a key is released.
window.addEventListener("keyup", keyUpListener, false);
function keyUpListener(event) {
	keyPresses[event.key] = false;
}

//This function is the real good part. This uses the listeners above to check which keys are pressed, then moves the character based on those keys. It also plays the corresponding animations by detecting which keys are being pressed and whether they are currently down.
function playerLoop () {
	CTX.clearRect(0, 0, BOARD.width, BOARD.height);
	if (keyPresses.w) {
		positionY -= PSPEED;
		currentDirection = "Up";
	}	else if (keyPresses.s) {
		positionY += PSPEED;
		currentDirection = "Down";
	};
	if (keyPresses.a) {
		positionX -=PSPEED;
		currentDirection = "Left";
	}	else if (keyPresses.d) {
		positionX += PSPEED;
		currentDirection = "Right";
	};

	playerFrame(0, 0, positionX, positionY);
	window.requestAnimationFrame(playerLoop);
}