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

/* End of template section. Everything below is specific to the character guide page. */

/* First we will assign our images to variables so they can be modified. */

let animAgathion = document.getElementById("agathion-sprite");
let animBatricia = document.getElementById("batricia-sprite");
let animBrooce = document.getElementById("brooce-sprite");
let animDomovoi = document.getElementById("domovoi-sprite");

/* Now we need to add variables for each button. */

let agathionIdle = document.getElementById("agathion-idle");
let agathionAttack = document.getElementById("agathion-attack");
let agathionSpell = document.getElementById("agathion-spell");
let agathionStop = document.getElementById("agathion-stop");

let batriciaIdle = document.getElementById("batricia-idle");
let batriciaAttack = document.getElementById("batricia-attack");
let batriciaSpell = document.getElementById("batricia-spell");
let batriciaStop = document.getElementById("batricia-stop");

let brooceIdle = document.getElementById("brooce-idle");
let brooceAttack = document.getElementById("brooce-attack");
let brooceSpell = document.getElementById("brooce-spell");
let brooceStop = document.getElementById("brooce-stop");

let domovoiIdle = document.getElementById("domovoi-idle");
let domovoiAttack = document.getElementById("domovoi-attack");
let domovoiSpell = document.getElementById("domovoi-spell");
let domovoiStop = document.getElementById("domovoi-stop");

/* I need to add listeners for each button and then a function to play each corresponding gif. */

agathionIdle.addEventListener("click", IdleAnimAgathion);
agathionAttack.addEventListener("click", AtkAnimAgathion);
agathionSpell.addEventListener("click", SpellAnimAgathion);
agathionStop.addEventListener("click", StopAnimAgathion);

function IdleAnimAgathion () {
    animAgathion.src = "../images/animated-sprites/agathion-idle.gif";
}

function AtkAnimAgathion () {
    animAgathion.src = "../images/animated-sprites/agathion-attack.gif";
}

function SpellAnimAgathion () {
    animAgathion.src = "../images/animated-sprites/agathion-spell.gif";
}

function StopAnimAgathion () {
    animAgathion.src = "../images/party-sprites/agathion.png";
}

/* I basically just need to repeat this for the other three characters and this page is done. */

batriciaIdle.addEventListener("click", IdleAnimBatricia);
batriciaAttack.addEventListener("click", AtkAnimBatricia);
batriciaSpell.addEventListener("click", SpellAnimBatricia);
batriciaStop.addEventListener("click", StopAnimBatricia);

function IdleAnimBatricia () {
    animBatricia.src = "../images/animated-sprites/batricia-idle.gif";
}

function AtkAnimBatricia () {
    animBatricia.src = "../images/animated-sprites/batricia-attack.gif";
}

function SpellAnimBatricia () {
    animBatricia.src = "../images/animated-sprites/batricia-spell.gif";
}

function StopAnimBatricia () {
    animBatricia.src = "../images/party-sprites/batricia.png";
}



brooceIdle.addEventListener("click", IdleAnimBrooce);
brooceAttack.addEventListener("click", AtkAnimBrooce);
brooceSpell.addEventListener("click", SpellAnimBrooce);
brooceStop.addEventListener("click", StopAnimBrooce);

function IdleAnimBrooce () {
    animBrooce.src = "../images/animated-sprites/brooce-idle.gif";
}

function AtkAnimBrooce () {
    animBrooce.src = "../images/animated-sprites/brooce-attack.gif";
}

function SpellAnimBrooce () {
    animBrooce.src = "../images/animated-sprites/brooce-spell.gif";
}

function StopAnimBrooce () {
    animBrooce.src = "../images/party-sprites/brooce.png";
}



domovoiIdle.addEventListener("click", IdleAnimDomovoi);
domovoiAttack.addEventListener("click", AtkAnimDomovoi);
domovoiSpell.addEventListener("click", SpellAnimDomovoi);
domovoiStop.addEventListener("click", StopAnimDomovoi);

function IdleAnimDomovoi () {
    animDomovoi.src = "../images/animated-sprites/domovoi-idle.gif";
}

function AtkAnimDomovoi () {
    animDomovoi.src = "../images/animated-sprites/domovoi-attack.gif";
}

function SpellAnimDomovoi () {
    animDomovoi.src = "../images/animated-sprites/domovoi-spell.gif";
}

function StopAnimDomovoi () {
    animDomovoi.src = "../images/party-sprites/domovoi.png";
}