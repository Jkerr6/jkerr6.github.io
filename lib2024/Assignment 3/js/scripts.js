//We first need to load up our spritesheets for our player, the food and the predator.
let playerImg = new Image();
playerImg.src = "images/player.png";

let foodImg = new Image();
foodImg.src = "images/food.png"

//Loads the player when the image is done loading. If we don't do this, the whole thing just doesn't work.
playerImg.onload = function() {
	playerLoop();
};

//This loads up our player's canvas element.
const PBOARD = document.getElementById("playerBoard");
const CTX = PBOARD.getContext("2d");

//These load up the prey's canvas elements.
const FBOARD1 = document.getElementById("foodBoard1");
const FCTX1 = FBOARD1.getContext("2d")

const FBOARD2 = document.getElementById("foodBoard2");
const FCTX2 = FBOARD2.getContext("2d");

const FBOARD3 = document.getElementById("foodBoard3");
const FCTX3 = FBOARD3.getContext("2d");

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
const PSPEED = 1.8;

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

//These are the same for each food and don't need to be repeated.
const FSPEED = 1.4;
const FOODLOOP = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const FWIDTH = 32;
const FHEIGHT = 32;
const FWIDTHSCALED = FWIDTH * SCALE;
const FHEIGHTSCALED = FHEIGHT * SCALE;

//These are the variables for the first food bug. Note they are very similar to those for the player character.
let isFoodSpawned1 = false;
let foodLoopIndex1 = 0;
let foodFrameCount1 = 0;
let foodDirection1 = FACINGDOWN;
let isFoodMoving1 = false;
let foodPositionX1 = 0;
let foodPositionY1 = 0;

//This variable will be used to choose a random animation for the food bug to choose.
let whichFoodAnim1 = 0;
let shouldFoodMove1 = false;

//Our control variables for the other two prey bugs.
let isFoodSpawned2 = false;
let foodLoopIndex2 = 0;
let foodFrameCount2 = 0;
let foodDirection2 = FACINGUP;
let isFoodMoving2 = false;
let foodPositionX2 = 0;
let foodPositionY2 = 0;

let whichFoodAnim2 = 0;
let shouldFoodMove2 = false;

let isFoodSpawned3 = false;
let foodLoopIndex3 = 0;
let foodFrameCount3 = 0;
let foodDirection3 = FACINGRIGHT;
let isFoodMoving3 = false;
let foodPositionX3 = 0;
let foodPositionY3 = 0;

let whichFoodAnim3 = 0;
let shouldFoodMove3 = false;

//This function is used to clean up our frame selection for animations. Basically, it's choosing a spot in the sprite sheet to treat as a frame. It can also be used to position the sprite at a starting point on the board.
function playerFrame(frameX, frameY, boardX, boardY){
	CTX.drawImage(playerImg, frameX * PWIDTH, frameY * PHEIGHT, PWIDTH, PHEIGHT, boardX, boardY, PWIDTHSCALED, PHEIGHTSCALED);
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
function playerLoop() {
	CTX.clearRect(0, 0, PBOARD.width, PBOARD.height);
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
	if (isMoving == true){
		playerFrame(ANIMLOOP[currentLoopIndex], currentDirection + 4, positionX, positionY);
		frameCount++;
		if (frameCount >= 20){
			frameCount = 0;
			currentLoopIndex++;
			if (currentLoopIndex >= 2) {
				currentLoopIndex = 0;
			};
		};
	} else {
		playerFrame(ANIMLOOP[currentLoopIndex], currentDirection, positionX, positionY);
		frameCount++;
		if (frameCount >= 20){
			frameCount = 0;
			currentLoopIndex++;
			if (currentLoopIndex >= 2){
				currentLoopIndex = 0;
			};
		};
	};
	window.requestAnimationFrame(playerLoop);
};

//I made this function later than the previous one based on guidance from the Marty Himmel tutorial. It just unifies the function for player movement and also tracks the position of the player using the position variables from above.
function movePlayer(deltaX, deltaY, direction){
	if (positionX + deltaX > 0 && positionX + PWIDTHSCALED + deltaX < PBOARD.width){
		positionX += deltaX;
	};
	if (positionY + deltaY > 0 && positionY + PHEIGHTSCALED + deltaY < PBOARD.height){
		positionY += deltaY;
	};
	currentDirection = direction;
}

//The following functions all deal with the prey bugs. I am going to use math.random to randomly spawn in up to three food bugs that will randomly wander around.

//These two functions spawn our first food bug as long as it hasn't already been spawned. I'm using the math.random() method to spawn the bug at a random location.
function spawnFood1(){
	if (!isFoodSpawned1){
		FCTX1.clearRect(0, 0, FBOARD1.width, FBOARD1.height);
		let foodSpawnX = Math.random() * 360 + 200;
		let foodSpawnY = Math.random() * 160 + 200;
		FCTX1.drawImage(foodImg, 0, 0, FWIDTH, FHEIGHT, foodSpawnX, foodSpawnY, FWIDTHSCALED, FHEIGHTSCALED);
		isFoodSpawned1 = true;
		foodDirection1 = FACINGUP;
		foodPositionX1 = foodSpawnX;
		foodPositionY1 = foodSpawnY;
	};
	foodLoop1();
};

//This spawns our food bug in.
setTimeout(spawnFood1, 1000);



//This function does the actual animating and controlling the speed of the animations. It's based on the playerLoop function above.
function foodLoop1(){
	if (isFoodSpawned1 == true){
		FCTX1.clearRect(0, 0, FBOARD1.width, FBOARD1.height);
		if (whichFoodAnim1 == 0 && shouldFoodMove1 == true){
			moveFood1(0, -FSPEED, FACINGUP);
		} else if (whichFoodAnim1 == 1 && shouldFoodMove1 == true){
			moveFood1(0, FSPEED, FACINGDOWN);
		} else if (whichFoodAnim1 == 2 && shouldFoodMove1 == true){
			moveFood1(-FSPEED, 0, FACINGLEFT);
		} else if (whichFoodAnim1 == 3 && shouldFoodMove1 == true){
			moveFood1(FSPEED, 0, FACINGRIGHT);
		}

		if (isFoodMoving1 == true) {
			foodAnim1(FOODLOOP[foodLoopIndex1], foodDirection1 + 4, foodPositionX1, foodPositionY1);
			foodFrameCount1++;
			if (foodFrameCount1 >= 30){
				foodFrameCount1 = 0;
				foodLoopIndex1++;
				if (foodLoopIndex1 >= 2){
					foodLoopIndex1 = 0;
				};
			};
		} else {
			foodAnim1(FOODLOOP[foodLoopIndex1], foodDirection1, foodPositionX1, foodPositionY1);
			foodFrameCount1++;
			if (foodFrameCount1 >= 30){
				foodFrameCount1 = 0;
				foodLoopIndex1++;
				if (foodLoopIndex1 >= 2){
					foodLoopIndex1 = 0;
				};
			};
		};
		window.requestAnimationFrame(foodLoop1);
	};
};

//These functions are similar to the player versions above. The first is used to limit how far the bug can move. The second draws the correct sprites.

function moveFood1(deltaX, deltaY, direction){
	if (foodPositionX1 + deltaX > 0 && foodPositionX1 + PWIDTHSCALED + deltaX < FBOARD1.width){
		foodPositionX1 += deltaX;
	};
	if (foodPositionY1 + deltaY > 0 && foodPositionY1 + PHEIGHTSCALED + deltaY < FBOARD1.height){
		foodPositionY1 += deltaY;
	};
	foodDirection1 = direction;
}

function foodAnim1(frameX, frameY, boardX, boardY){
	FCTX1.drawImage(foodImg, frameX * FWIDTH, frameY * FHEIGHT, FWIDTH, FHEIGHT, boardX, boardY, FWIDTHSCALED, FHEIGHTSCALED);
};

//This function randomly chooses a direction for the food bug to run in and then shuts itself off. Got to use good old Math.floor here to make sure I'm not getting decimals.

function chooseFoodMove1 (){
	if (isFoodSpawned1 == true){
		isFoodMoving1 = true;
		shouldFoodMove1 = true;
		whichFoodAnim1 = Math.floor(Math.random() * 4);
		setTimeout(function (){shouldFoodMove1 = false; isFoodMoving1 = false}, 200);
	};
};
//This interval fires off the above function.
setInterval(chooseFoodMove1, Math.random() * 6000 + 2000);

//The functions for food bugs 2 and 3. These are the same as above but with different variables and values.