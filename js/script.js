const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesCount = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const symbol = function (word) {
    const placeholder = [];
    for (const letter of word) {
        console.log(letter);
        placeholder.push("●");
    }
    wordInProgress.innerText = placeholder.join("");
};

symbol(word);

guessButton.addEventListener("click", function (e){
    e.preventDefault();
    messages.innerText = "";
    const guess = textInput.value;

    const goodGuess = validateTextInput(guess);

    if (goodGuess){
        makeGuess(guess);
    }
    textInput.value = "";
});

const validateTextInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        messages.innerText = "Please enter a letter from A to Z.";
    } else if (input.length > 1) {
        messages.innerText = "Please enter one letter only.";
    } else if (!input.match(acceptedLetter)) {
        messages.innerText = "Please enter only one letter from A to Z."
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        messages.innerText = "You've already guessed that letter.  Try again.";
    } else {

    guessedLetters.push(guess);
    console.log(guessedLetters);
    }
};
