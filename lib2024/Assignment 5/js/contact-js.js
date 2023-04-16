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

/* Template ends above. Below is the JavaScript specific to the contact page. I want the clear button to function and the submit button to do a mock submission. */

/* First we need to get our buttons. */
let submitButton = document.getElementById("submit-button");
let clearButton = document.getElementById("clear-button");

submitButton.addEventListener("click", SubmitForm);
clearButton.addEventListener("click", ClearForm);

function SubmitForm () {
    let nameField = document.getElementById("name-field");
    let emailField = document.getElementById("email-field");
    let contentField = document.getElementById("content-field");

    /* I am using this nested if else statement to check to make sure the forms are filled before they can be submitted. The submission doesn't actually do anything but its a good mockup of this type of form. */
    if (nameField.value == "") {
        contentField.placeholder = "Please enter your name.";
        contentField.value = "";
    } else if (emailField.value == "") {
        contentField.placeholder = "Please enter your email.";
        contentField.value = "";
    } else if (contentField.value == "") {
        contentField.placeholder = "Please enter a message.";
        contentField.value = "";
    } else {
        nameField.value = "";
        emailField.value = "";
        contentField.value = "";
        contentField.placeholder = "Thank you!";
    }
}

/* First, we assign our forms to variables, then we clear them. */
function ClearForm () {
    let nameField = document.getElementById("name-field");
    let emailField = document.getElementById("email-field");
    let contentField = document.getElementById("content-field");

    nameField.value = "";
    emailField.value = "";
    contentField.value = "";
    contentField.placeholder = "Message here...";
}