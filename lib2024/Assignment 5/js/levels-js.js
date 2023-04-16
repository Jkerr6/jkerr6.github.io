/* This first section will be included for all pages to animate the bat in the title when the mouse is hovered over it. I learned this from Programmers Portal and W3Schools. */

let animBat = document.getElementById("anim-bat");

/* These listeners check whether the mouse is over the bat or not. */
animBat.addEventListener("mouseover", AnimateBat);
animBat.addEventListener("mouseleave", PauseBat);

/* This function fires when the mouse is hovered over the bat. The function changes the src of the image to the gif. */
function AnimateBat () {
    animBat.src = "../images/animated-sprites/title-bat-animated.gif";
}

/* This function fires when the mouse is no longer over the bat. This changes the src of the image back to the still image. */
function PauseBat () {
    animBat.src = "../images/party-sprites/title-bat.png";
}

/* The template section ends here. The rest of this is devoted to animating the enemy sprites on this page. I am using the same mouse hover method I used with the bat in the title. */

/* First we have to define our variables. */

let animHunter = document.getElementById("hunter-bug");
let animEyefoot = document.getElementById("eyefoot");
let animRecluse = document.getElementById("recluse");
let animKnight = document.getElementById("ghost-knight");
let animThing = document.getElementById("thing-in-dark");

/* Next we will add listeners using the same format as we used above for the bat. */

animHunter.addEventListener("mouseover", AnimateHunter);
animHunter.addEventListener("mouseleave", PauseHunter);

animEyefoot.addEventListener("mouseover", AnimateEyefoot);
animEyefoot.addEventListener("mouseleave", PauseEyefoot);

animRecluse.addEventListener("mouseover", AnimateRecluse);
animRecluse.addEventListener("mouseleave", PauseRecluse);

animKnight.addEventListener("mouseover", AnimateKnight);
animKnight.addEventListener("mouseleave", PauseKnight);

animThing.addEventListener("mouseover", AnimateThing);
animThing.addEventListener("mouseleave", PauseThing);

/* Finally, we need to set up out functions as above for each sprite. */

function AnimateHunter () {
    animHunter.src = "../images/animated-enemies/hunt-bug-animated.gif";
}

function PauseHunter () {
    animHunter.src = "../images/enemy-sprites/hunt-bug.png";
}

function AnimateEyefoot () {
    animEyefoot.src = "../images/animated-enemies/eyefoot-animated.gif";
}

function PauseEyefoot () {
    animEyefoot.src = "../images/enemy-sprites/eyefoot.png";
}

function AnimateRecluse () {
    animRecluse.src = "../images/animated-enemies/recluse-animated.gif";
}

function PauseRecluse () {
    animRecluse.src = "../images/enemy-sprites/recluse.png";
}

function AnimateKnight () {
    animKnight.src = "../images/animated-enemies/ghost-knight-animated.gif";
}

function PauseKnight () {
    animKnight.src = "../images/enemy-sprites/ghost-knight.png";
}

function AnimateThing () {
    animThing.src = "../images/animated-enemies/thing-animated.gif";
}

function PauseThing () {
    animThing.src = "../images/enemy-sprites/thing.png";
}