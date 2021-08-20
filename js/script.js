const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesCount = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messages = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

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
    const guess = textInput.value;
    console.log(guess);
    textInput.value = "";
});