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
//Making the image bigger. This constant will be multiplied by the width and height to create two more constants used in the function below.
const SCALE = 1.5;
const PWIDTHSCALED = PWIDTH * SCALE;
const PHEIGHTSCALED = PHEIGHT * SCALE;

//These variables/constants are going to be used to control our animation cycle. The loop arrays will track which which frames to use, and the loopIndex will track the current frame. All our animations are only 2 frames for the sake of simplicity.
const ANIMLOOP = [0, 1, 2, 3, 4, 5, 6, 7];
let currentLoopIndex = 0;
let frameCount = 0;

//I some variables here to deal with moving the player sprite. keyPresses tracks what key is being pressed with the listeners below. PSPEED sets a default speed for the character.
let keyPresses = {};
const PSPEED = 1.5;

//We need to set up some variables for dealing with the direction of the sprite for the animations. The numbers correspond to the animation frames on the spritesheet.
const FACINGDOWN = 1;
const FACINGUP = 0;
const FACINGLEFT = 3;
const FACINGRIGHT = 2;
let currentDirection = FACINGDOWN;
let isMoving = false;

//These two track the position of the player and can be plugged into the playerFrame function below using the playerLoop function further down below.
let positionX = 400;
let positionY = 255;

//This function is used to clean up our frame selection for animations. Basically, it's choosing a spot in the sprite sheet to treat as a frame. It can also be used to position the sprite at a starting point on the board.
function playerFrame(frameX, frameY, boardX, boardY){
	CTX.drawImage(playerImg, frameX * PWIDTH, frameY * PHEIGHT, PWIDTH, PHEIGHT, boardX, boardY, PWIDTHSCALED, PHEIGHTSCALED);
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
	playerFrame(ANIMLOOP[currentLoopIndex], 0, 0, 0);
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
	playerFrame(ANIMLOOP[currentLoopIndex] + 2, 0, 0, 0);
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
	playerFrame(ANIMLOOP[currentLoopIndex] + 4, 0, 0, 0);
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
	playerFrame(ANIMLOOP[currentLoopIndex] + 6, 0, 0, 0);
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

	if (keyPresses.w || keyPresses.W) {
		movePlayer(0, -PSPEED, FACINGUP);
	}	else if (keyPresses.s || keyPresses.S) {
		movePlayer(0, PSPEED, FACINGDOWN);
	};
	if (keyPresses.a || keyPresses.A) {
		movePlayer(-PSPEED, 0, FACINGLEFT);
	}	else if (keyPresses.d || keyPresses.D) {
		movePlayer(PSPEED, 0, FACINGRIGHT);
	};

//This part detects if a button is being pressed down to determine if the sprite should play its "moving" animation or its "idle" animation.
	if (keyPresses.w || keyPresses.s || keyPresses.a || keyPresses.d || keyPresses.W || keyPresses.S || keyPresses.A || keyPresses.D) {
		isMoving = true;
	} else {
		isMoving = false;
	};

//If the sprite is moving this cycles through the relevant moving animation using the currentDirection variable to determine which animation. Else it plays the idle animation.
	if (isMoving == true) {
		playerFrame(ANIMLOOP[currentLoopIndex], currentDirection + 4, positionX, positionY);
		frameCount++;
		if (frameCount >= 20) {
			frameCount = 0;
			currentLoopIndex++;
			if (currentLoopIndex >= 2) {
				currentLoopIndex = 0;
			};
		};
	} else {
		playerFrame(ANIMLOOP[currentLoopIndex], currentDirection, positionX, positionY);
		frameCount++;
		if (frameCount >= 20) {
			frameCount = 0;
			currentLoopIndex++;
			if (currentLoopIndex >= 2) {
				currentLoopIndex = 0;
			};
		};

	};
	
	window.requestAnimationFrame(playerLoop);
}

//I made this function later than the previous one based on guidance from the Marty Himmel tutorial. It just unifies the function for player movement and also tracks the position of the player using the position variables from above.
function movePlayer(deltaX, deltaY, direction){
	if (positionX + deltaX > 0 && positionX + PWIDTHSCALED + deltaX < BOARD.width){
		positionX += deltaX;
	};
	if (positionY + deltaY > 0 && positionY + PHEIGHTSCALED + deltaY < BOARD.height){
		positionY += deltaY;
	};
	currentDirection = direction;
}