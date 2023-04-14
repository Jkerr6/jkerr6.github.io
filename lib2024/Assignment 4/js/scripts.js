/* This variable detects our input. */
let tempInput; 

/* This variable tells the computer where to put out output. */
let tempOutput = document.getElementById('tempoutput');

/* This variable is to detect what we are converting to. */
let whatUnit = "";

/* These listeners check which radial dial is checked. I learned this from W3Schools. */
document.getElementById('celsiusrad').addEventListener("click", changeCelsius);
document.getElementById('fahrenheitrad').addEventListener("click", changeFahrenheit);

/* I also need a listener that can check if the convert button is pressed and then run the function for the conversion. */
document.getElementById('convertbutton').addEventListener("click", ConvertTemp);

/* Need a listener for the clear button. */
document.getElementById('clearbutton').addEventListener("click", clearForm);

/* Here I need functions to set the whatUnit variable based on the listeners above. */
function changeCelsius() {
    whatUnit = "celsius";
}

function changeFahrenheit() {
    whatUnit = "fahrenheit";
}

/* Here I am going to create a function to fill in the converted temperature */

function ConvertTemp() {
    /* This bit is detecting what the user has typed into the text form and then turning that into a variable. I learned this from Matthew Tyson's InfoWorld tutorial. */
    tempInput = document.getElementById('conversiontext').value;

    /* So I'm using a layered if else statement here. First we check if anything has been entered. If nothing has been entered it tells the user to enter a number. */
    if (tempInput == "") {
        tempOutput.innerText = "Please enter a temperature.";
    } else {
        /* This part runs if there is an input and tries to convert the string to a number. If it returns NaN it displays another error message. I learned the Number() function from Jessica Wilkins at FreeCodeCamp. */
        tempInput = Number(document.getElementById('conversiontext').value);
        /* I learned isNaN from W3Schools */
        if (isNaN(tempInput)) {
            tempOutput.innerText = "Please enter a number.";
        } else {
            /* Now we get to embed an if else statement within an if else statement within an if else statement. This one checks to make sure the radial menu has been checked and if so detects whether we are converting to celsius or fahrenheit. */
            if (whatUnit == "") {
                tempOutput.innerText = "Please choose Celsius or Fahrenheit.";
            } else if (whatUnit == "celsius") {
                /* I am using Math.round() here to only get whole integers. I learned this from W3Schools. */
                tempOutput.innerText = tempInput + " degrees Fahrenheit is equal to " + Math.round(((tempInput - 32) * 5/9)) + " degrees Celsius.";
            } else if (whatUnit == "fahrenheit") {
                tempOutput.innerText = tempInput + " degrees Celsius is equal to " + Math.round((tempInput * (9/5) + 32)) + " degrees Fahrenheit.";
            } else {
                tempOutput.innerText = "Error.";
            };
        };
    };
};

/* Here is a function to clear the info entered by users and the values outputted by the page. */
function clearForm() {
    tempInput = "";
    document.getElementById('conversiontext').value = "";
    tempOutput.innerText = "Please enter a temperature and select Celsius or Fahrenheit.";
}