//We first need to load up our spritesheets for our player, the food and the predator.
let playerImg = new Image();
playerImg.src = "images/player.png";

let foodImg = new Image();
foodImg.src = "images/food.png";

let huntImg = new Image();
huntImg.src = "images/hunter.png";

//This is to load our "yum" image that appears when you catch a bug.
let yumImg = new Image();
yumImg.src = "images/yum.png";

//We need to grab our game over screen too.
let gameOverScreen = document.getElementById("gameOverBox")

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

//This loads up the hunter's canvas element.
const HBOARD = document.getElementById("hunterBoard");
const HCTX = HBOARD.getContext("2d");

//Loads up a canvas for the "yum" message that appears when a bug is eaten.
const YBOARD1 = document.getElementById("scoreMessage1");
const YCTX1 = YBOARD1.getContext("2d");

const YBOARD2 = document.getElementById("scoreMessage2");
const YCTX2 = YBOARD2.getContext("2d");

const YBOARD3 = document.getElementById("scoreMessage3");
const YCTX3 = YBOARD3.getContext("2d");

//For our score counter.
const SCORECANV = document.getElementById("scoreCounter");
const SCORECOUNT = SCORECANV.getContext("2d");

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

//These are the same for each food and don't need to be repeated (Except food which I want to vary).
const FSPEED = 2.1;
const FSPEED2 = 6.5;
const FSPEED3 = 2.4;
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
let foodPositionX1 = null;
let foodPositionY1 = null;

//This variable will be used to choose a random animation for the food bug to choose.
let whichFoodAnim1 = 0;
let shouldFoodMove1 = false;

//Our control variables for the other two prey bugs.
let isFoodSpawned2 = false;
let foodLoopIndex2 = 0;
let foodFrameCount2 = 0;
let foodDirection2 = FACINGUP;
let isFoodMoving2 = false;
let foodPositionX2 = null;
let foodPositionY2 = null;

let whichFoodAnim2 = 0;
let shouldFoodMove2 = false;

let isFoodSpawned3 = false;
let foodLoopIndex3 = 0;
let foodFrameCount3 = 0;
let foodDirection3 = FACINGRIGHT;
let isFoodMoving3 = false;
let foodPositionX3 = null;
let foodPositionY3 = null;

let whichFoodAnim3 = 0;
let shouldFoodMove3 = false;

//Finally, we must program in our predator bug variables. I'm going to be labelling them with "h" for hunter.
const HSPEED = 2.1;
const HUNTLOOP = [0, 1, 2, 3, 4, 5, 6, 7];
const HWIDTH = 48;
const HHEIGHT = 48;
const HWIDTHSCALED = HWIDTH * SCALE;
const HHEIGHTSCALED = HHEIGHT * SCALE;
let isHuntSpawned = false; 
let huntLoopIndex = 0;
let huntFrameCount = 0;
let huntDirection = FACINGDOWN;
let isHuntMoving = false;
let huntPositionX = null;
let huntPositionY = null;

let whichHuntAnim = 0;
let shouldHuntMove = false;

//Alright, here we are defining a simple variable to track the player's score and a variable to hold the score counter itself.
let score = 0;

//I need a simple gameOver variable to stop certain functions when the player loses. Also, some variables that link the the buttons on the game over screen.
let gameOver = false;
const GIVEUP = document.getElementById("giveUp");
const TRYAGAIN = document.getElementById("tryAgain");

//Going to write a function to track the score. This clears and redraws the score every time the playerLoop function below iterates. The score is simply defined by the score attribute which goes up whenever the game detects a collision between the player and the food bugs.
function keepScore(){
	SCORECOUNT.clearRect(0, 0, SCORECANV.width, SCORECANV.height);
	SCORECOUNT.fillStyle = "#99e550";
	SCORECOUNT.font = "24px georgia";
	SCORECOUNT.fillText("Score: " + score, 665, 25);
};


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
	if (gameOver == true){
		return;
	}
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
	detectCollision();
	keepScore();
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
	if (!isFoodSpawned1 && !gameOver){
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
setInterval(chooseFoodMove1, Math.random() * 1500 + 1000);

//The functions for food bugs 2 and 3. These are the same as above but with different variables and values.

function spawnFood2(){
	if (!isFoodSpawned2 && !gameOver){
		FCTX2.clearRect(0, 0, FBOARD2.width, FBOARD2.height);
		let foodSpawnX = Math.random() * 710 + 50;
		let foodSpawnY = Math.random() * 450 + 50;
		FCTX2.drawImage(foodImg, 0, 0, FWIDTH, FHEIGHT, foodSpawnX, foodSpawnY, FWIDTHSCALED, FHEIGHTSCALED);
		isFoodSpawned2 = true;
		foodDirection2 = FACINGUP;
		foodPositionX2 = foodSpawnX;
		foodPositionY2 = foodSpawnY;
	};
	foodLoop2();
};

setTimeout(spawnFood2, Math.random() * 2000 + 5000);

function foodLoop2(){
	if (isFoodSpawned2 == true){
		FCTX2.clearRect(0, 0, FBOARD2.width, FBOARD2.height);
		if (whichFoodAnim2 == 0 && shouldFoodMove2 == true){
			moveFood2(0, -FSPEED2, FACINGUP);
		} else if (whichFoodAnim2 == 1 && shouldFoodMove2 == true){
			moveFood2(0, FSPEED2, FACINGDOWN);
		} else if (whichFoodAnim2 == 2 && shouldFoodMove2 == true){
			moveFood2(-FSPEED2, 0, FACINGLEFT);
		} else if (whichFoodAnim2 == 3 && shouldFoodMove2 == true){
			moveFood2(FSPEED2, 0, FACINGRIGHT);
		}

		if (isFoodMoving2 == true) {
			foodAnim2(FOODLOOP[foodLoopIndex2], foodDirection2 + 4, foodPositionX2, foodPositionY2);
			foodFrameCount2++;
			if (foodFrameCount2 >= 40){
				foodFrameCount2 = 0;
				foodLoopIndex2++;
				if (foodLoopIndex2 >= 2){
					foodLoopIndex2 = 0;
				};
			};
		} else {
			foodAnim2(FOODLOOP[foodLoopIndex2], foodDirection2, foodPositionX2, foodPositionY2);
			foodFrameCount2++;
			if (foodFrameCount2 >= 40){
				foodFrameCount2 = 0;
				foodLoopIndex2++;
				if (foodLoopIndex2 >= 2){
					foodLoopIndex2 = 0;
				};
			};
		};
		window.requestAnimationFrame(foodLoop2);
	};
};

function moveFood2(deltaX, deltaY, direction){
	if (foodPositionX2 + deltaX > 0 && foodPositionX2 + PWIDTHSCALED + deltaX < FBOARD2.width){
		foodPositionX2 += deltaX;
	};
	if (foodPositionY2 + deltaY > 0 && foodPositionY2 + PHEIGHTSCALED + deltaY < FBOARD2.height){
		foodPositionY2 += deltaY;
	};
	foodDirection2 = direction;
}

function foodAnim2(frameX, frameY, boardX, boardY){
	FCTX2.drawImage(foodImg, frameX * FWIDTH, frameY * FHEIGHT, FWIDTH, FHEIGHT, boardX, boardY, FWIDTHSCALED, FHEIGHTSCALED);
};


function chooseFoodMove2 (){
	if (isFoodSpawned2 == true){
		isFoodMoving2 = true;
		shouldFoodMove2 = true;
		whichFoodAnim2 = Math.floor(Math.random() * 4);
		setTimeout(function (){shouldFoodMove2 = false; isFoodMoving2 = false}, 200);
	};
};

setInterval(chooseFoodMove2, Math.random() * 5000 + 3000);

//For bug 3.
function spawnFood3(){
	if (!isFoodSpawned3 && !gameOver){
		FCTX3.clearRect(0, 0, FBOARD3.width, FBOARD3.height);
		let foodSpawnX = Math.random() * 700 + 60;
		let foodSpawnY = Math.random() * 460 + 60;
		FCTX3.drawImage(foodImg, 0, 0, FWIDTH, FHEIGHT, foodSpawnX, foodSpawnY, FWIDTHSCALED, FHEIGHTSCALED);
		isFoodSpawned3 = true;
		foodDirection3 = FACINGUP;
		foodPositionX3 = foodSpawnX;
		foodPositionY3 = foodSpawnY;
	};
	foodLoop3();
};

setTimeout(spawnFood3, Math.random() * 5000 + 12000);

function foodLoop3(){
	if (isFoodSpawned3 == true){
		FCTX3.clearRect(0, 0, FBOARD3.width, FBOARD3.height);
		if (whichFoodAnim3 == 0 && shouldFoodMove3 == true){
			moveFood3(0, -FSPEED3, FACINGUP);
		} else if (whichFoodAnim3 == 1 && shouldFoodMove3 == true){
			moveFood3(0, FSPEED3, FACINGDOWN);
		} else if (whichFoodAnim3 == 2 && shouldFoodMove3 == true){
			moveFood3(-FSPEED3, 0, FACINGLEFT);
		} else if (whichFoodAnim3 == 3 && shouldFoodMove3 == true){
			moveFood3(FSPEED3, 0, FACINGRIGHT);
		}

		if (isFoodMoving3 == true) {
			foodAnim3(FOODLOOP[foodLoopIndex3], foodDirection3 + 4, foodPositionX3, foodPositionY3);
			foodFrameCount3++;
			if (foodFrameCount3 >= 15){
				foodFrameCount3 = 0;
				foodLoopIndex3++;
				if (foodLoopIndex3 >= 2){
					foodLoopIndex3 = 0;
				};
			};
		} else {
			foodAnim3(FOODLOOP[foodLoopIndex3], foodDirection3, foodPositionX3, foodPositionY3);
			foodFrameCount3++;
			if (foodFrameCount3 >= 15){
				foodFrameCount3 = 0;
				foodLoopIndex3++;
				if (foodLoopIndex3 >= 2){
					foodLoopIndex3 = 0;
				};
			};
		};
		window.requestAnimationFrame(foodLoop3);
	};
};

function moveFood3(deltaX, deltaY, direction){
	if (foodPositionX3 + deltaX > 0 && foodPositionX3 + PWIDTHSCALED + deltaX < FBOARD3.width){
		foodPositionX3 += deltaX;
	};
	if (foodPositionY3 + deltaY > 0 && foodPositionY3 + PHEIGHTSCALED + deltaY < FBOARD3.height){
		foodPositionY3 += deltaY;
	};
	foodDirection3 = direction;
}

function foodAnim3(frameX, frameY, boardX, boardY){
	FCTX3.drawImage(foodImg, frameX * FWIDTH, frameY * FHEIGHT, FWIDTH, FHEIGHT, boardX, boardY, FWIDTHSCALED, FHEIGHTSCALED);
};


function chooseFoodMove3 (){
	if (isFoodSpawned3 == true){
		isFoodMoving3 = true;
		shouldFoodMove3 = true;
		whichFoodAnim3 = Math.floor(Math.random() * 4);
		setTimeout(function (){shouldFoodMove3 = false; isFoodMoving3 = false}, 200);
	};
};

setInterval(chooseFoodMove3, Math.random() * 500 + 200);

//This section spawns and controls our hunter bug. Unlike the food bugs, this bug won't despawn.

function huntSpawn(){
	if (!isHuntSpawned && !gameOver){
		HCTX.clearRect(0, 0, HBOARD.width, HBOARD.height);
		let huntSpawnX = Math.random() * 500 + 100;
		let huntSpawnY = Math.random() * 260 + 100;
		HCTX.drawImage(foodImg, 0, 0, HWIDTH, HHEIGHT, huntSpawnX, huntSpawnY, HWIDTHSCALED, HHEIGHTSCALED);
		isHuntSpawned = true;
		huntDirection = FACINGUP;
		huntPositionX = huntSpawnX;
		huntPositionY = huntSpawnY;
	};
	huntLoop();
};

setTimeout(huntSpawn, Math.random() * 10000 + 16000);

function huntLoop(){
	if (isHuntSpawned == true){
		HCTX.clearRect(0, 0, HBOARD.width, HBOARD.height);
		if (whichHuntAnim == 0 && shouldHuntMove == true){
			moveHunt(0, -HSPEED, FACINGUP);
		} else if (whichHuntAnim == 1 && shouldHuntMove == true){
			moveHunt(0, HSPEED, FACINGDOWN);
		} else if (whichHuntAnim == 2 && shouldHuntMove == true){
			moveHunt(-HSPEED, 0, FACINGLEFT);
		} else if (whichHuntAnim == 3 && shouldHuntMove == true){
			moveHunt(HSPEED, 0, FACINGRIGHT);
		}

		if (isHuntMoving == true) {
			huntAnim(HUNTLOOP[huntLoopIndex], huntDirection + 4, huntPositionX, huntPositionY);
			huntFrameCount++;
			if (huntFrameCount >= 15){
				huntFrameCount = 0;
				huntLoopIndex++;
				if (huntLoopIndex >= 2){
					huntLoopIndex = 0;
				};
			};
		} else {
			huntAnim(HUNTLOOP[huntLoopIndex], huntDirection, huntPositionX, huntPositionY);
			huntFrameCount++;
			if (huntFrameCount >= 15){
				huntFrameCount = 0;
				huntLoopIndex++;
				if (huntLoopIndex >= 2){
					huntLoopIndex = 0;
				};
			};
		};
		window.requestAnimationFrame(huntLoop);
	};
};

function moveHunt(deltaX, deltaY, direction){
	if (huntPositionX + deltaX > 0 && huntPositionX + HWIDTHSCALED + deltaX < HBOARD.width){
		huntPositionX += deltaX;
	};
	if (huntPositionY + deltaY > 0 && huntPositionY + HHEIGHTSCALED + deltaY < HBOARD.height){
		huntPositionY += deltaY;
	};
	huntDirection = direction;
}

function huntAnim(frameX, frameY, boardX, boardY){
	HCTX.drawImage(huntImg, frameX * HWIDTH, frameY * HHEIGHT, HWIDTH, HHEIGHT, boardX, boardY, HWIDTHSCALED, HHEIGHTSCALED);
};


function chooseHuntMove (){
	if (isHuntSpawned == true){
		isHuntMoving = true;
		shouldHuntMove = true;
		whichHuntAnim = Math.floor(Math.random() * 4);
		setTimeout(function (){shouldHuntMove = false; isHuntMoving = false}, 800);
	};
};

setInterval(chooseHuntMove, 2000);

//Now we come upon our collisions. Beautiful. All the bugs are already tracking their locations. I'm going to write a function that compares the location of the player to the location of the other bugs then runs a specific function for each.

function detectCollision(){
	if (positionX <= huntPositionX + 42 && positionX >= huntPositionX - 42 && positionY <= huntPositionY + 42 && positionY >= huntPositionY - 42){
		hunterCollison();
	}; 
	if (positionX <= foodPositionX1 + 28 && positionX >= foodPositionX1 - 28 && positionY <= foodPositionY1 + 28 && positionY >= foodPositionY1 - 28){
		foodCollision1();
	};
	if (positionX <= foodPositionX2 + 28 && positionX >= foodPositionX2 - 28 && positionY <= foodPositionY2 + 28 && positionY >= foodPositionY2 - 28){
		foodCollision2();
	};
	if (positionX <= foodPositionX3 + 28 && positionX >= foodPositionX3 - 28 && positionY <= foodPositionY3 + 28 && positionY >= foodPositionY3 - 28){
		foodCollision3();
	};
};

//This will control what happens when the player collides with the food bugs. The score variable will go up and the bug will despawn. This resets the position variables of the target to null as well or else the function will fire repeatedly. Setting the "isFoodSpawned" variable to false makes the foodLoop function stop firing.
function foodCollision1(){
	let lastPositionX = foodPositionX1;
	let lastPositionY = foodPositionY1;
	isFoodSpawned1 = false;
	FCTX1.clearRect(0, 0, FBOARD1.width, FBOARD1.height);
	YCTX1.drawImage(yumImg, 0, 0, FWIDTH, FHEIGHT, lastPositionX, lastPositionY, FWIDTHSCALED, FHEIGHTSCALED);
	score += 8;
	setTimeout(function () {
		YCTX1.clearRect(0, 0, YBOARD1.width, YBOARD1.height);
	}, 1000);
	setTimeout(spawnFood1, 2000);
	foodPositionX1 = null;
	foodPositionY1 = null;
};

function foodCollision2(){
	let lastPositionX = foodPositionX2;
	let lastPositionY = foodPositionY2;
	isFoodSpawned2 = false;
	FCTX2.clearRect(0, 0, FBOARD2.width, FBOARD2.height);
	YCTX2.drawImage(yumImg, 0, 0, FWIDTH, FHEIGHT, lastPositionX, lastPositionY, FWIDTHSCALED, FHEIGHTSCALED);
	score += 10;
	setTimeout(function () {
		YCTX2.clearRect(0, 0, YBOARD2.width, YBOARD2.height);
	}, 1000);
	setTimeout(spawnFood2, 3500);
	foodPositionX2 = null;
	foodPositionY2 = null;
};

function foodCollision3(){
	let lastPositionX = foodPositionX3;
	let lastPositionY = foodPositionY3;
	isFoodSpawned3 = false;
	FCTX3.clearRect(0, 0, FBOARD3.width, FBOARD3.height);
	YCTX3.drawImage(yumImg, 0, 0, FWIDTH, FHEIGHT, lastPositionX, lastPositionY, FWIDTHSCALED, FHEIGHTSCALED);
	score += 15;
	setTimeout(function () {
		YCTX3.clearRect(0, 0, YBOARD3.width, YBOARD3.height);
	}, 1000);
	setTimeout(spawnFood3, 4500);
	foodPositionX3 = null;
	foodPositionY3 = null;
};

//This is our game over function. It resets all variables we need to start the game and erases all sprites. It also breaks the playerLoop to pause all the game functions until new game is selected.
function hunterCollison (){
	score = 0;
	gameOver = true;
	isFoodSpawned1 = false;
	isFoodSpawned2 = false;
	isFoodSpawned3 = false;
	isHuntSpawned = false;
	foodPositionX1 = null;
	foodPositionY1 = null;
	foodPositionX2 = null;
	foodPositionY2 = null;
	foodPositionX3 = null;
	foodPositionY3 = null;
	huntPositionX = null;
	huntPositionY = null;
	positionX = 400;
	positionY = 255;
	FCTX1.clearRect(0, 0, FBOARD1.width, FBOARD1.height);
	FCTX2.clearRect(0, 0, FBOARD2.width, FBOARD2.height);
	FCTX3.clearRect(0, 0, FBOARD3.width, FBOARD3.height);
	HCTX.clearRect(0, 0, HBOARD.width, HBOARD.height);
	CTX.clearRect(0, 0, PBOARD.width, PBOARD.height);
	showGameOver();
};

//This restarts the playerLoop and resets the triggers to respawn the various sprites.
function startOver (){
	gameOver = false;
	playerLoop();
	showGameOver();
	setTimeout(spawnFood1, 1000);
	setTimeout(spawnFood2, Math.random() * 2000 + 5000);
	setTimeout(spawnFood3, Math.random() * 5000 + 12000);
	setTimeout(huntSpawn, Math.random() * 10000 + 16000);
}

//I need a function to show or hide the game over screen based on the global gameOver variable.
function showGameOver () {
 if (gameOver == false) {
 	gameOverScreen.style.display = "none";
 } else {
 	gameOverScreen.style.display = "block";
 };
};

//Last two things here: a function to close the game if "Give up?" is chosen in the game over screen and a function to restart the game if "Try again?" is chosen.

TRYAGAIN.onclick = function(){
	startOver();
};

//If you click give up the game will just close. Nice.
GIVEUP.onclick = function(){
	close();
}