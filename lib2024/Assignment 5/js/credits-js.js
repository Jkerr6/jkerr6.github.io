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