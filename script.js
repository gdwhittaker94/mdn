function log(input) {
    console.log(input);
}
//* Generate random number
let randomNumber = Math.floor(Math.random() * 100) + 1;

//* Player turns/guess count
let guessCount = 1;

//* Reset button
let resetButton;

//* Selecting HTML Elements
const guessField = document.querySelector('#guessField');
const guessSubmit = document.querySelector('#guessSubmit');

guessField.focus()

// Selecting elements we will insert values into later
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const resultParas = document.querySelector('.resultParas');

//* Check turn/guess count
function checkGuess() {

    // Convert string value to numerical value w/Number() method
    const userGuess = Number(guessField.value);

    if (guessCount === 1) {
        // For start of new round
        guesses.textContent = "Previous Guesses: ";
    } // For every other turn. No else statement here so that below code executes regardless of 'if' statement outcome
    guesses.textContent += ` ${userGuess}`;

    if (userGuess === randomNumber) {
        lastResult.textContent = "Congratulations! You guessed it!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = "!!GAME OVER!!"
        lastResult.style.backgroundColor = "red";
        lowOrHi.textContent = "";
        setGameOver();
    } else {
        lastResult.textContent = "Not quite. Try again.";
        lastResult.style.backgroundColor = 'lightCoral';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "Try guessing a bigger number";
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = "Try guessing a smaller number";
        }
    }

    // Once above has run, prepare for next round
    guessCount++;
    guessField.value = "";
    guessField.focus();
}


//* Adding event listener to button
guessSubmit.addEventListener('click', checkGuess);

//* gameOver() function
function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = ("Start New Game");
    resultParas.appendChild(resetButton);
    resetButton.addEventListener("click", resetGame);
}

//* Game reset function
function resetGame() {

    guessCount = 1;

    const resetParas = document.querySelectorAll(".resultParas p");
    for (const resetPara of resetParas) {
        resetPara.textContent = "";
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.style.backgroundColor = "white";

    randomNumber = Math.floor(Math.random() * 100) + 1;
}