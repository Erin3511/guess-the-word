const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesCount = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt")
    const words = await res.text ();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    symbol(word);
};

getWord ();

const symbol = function (word) {
    const placeholder = [];
    for (const letter of word) {
        console.log(letter);
        placeholder.push("●");
    }
    wordInProgress.innerText = placeholder.join("");
};

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = textInput.value;

    const goodGuess = validateTextInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    textInput.value = "";
});

const validateTextInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter from A to Z.";
    } else if (input.length > 1) {
        message.innerText = "Please enter one letter only.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter only one letter from A to Z."
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that letter.  Try again.";
    } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    showGuessedLetters();
    updateGuessesRemaining (guess);
    updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter.toUpperCase());
        } else {
            showWord.push("●");
        }
    }
    //console.log(showWord);
    wordInProgress.innerText = showWord.join("");
    checkForWinner ();
};

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
      message.innerText = `Sorry, the word doesn't have the letter ${guess} in it.`;
      remainingGuesses -= 1;
    } else {
      message.innerText = `Good guess! The word has the letter ${guess}.`;
    }
  
    if (remainingGuesses === 0) {
      message.innerHTML = `GAME OVER! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
      remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
      remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
  };

const checkForWinner = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight"> You're a ROCKSTAR WORD SLEUTH! You guessed correctly - GREAT JOB!</p>`;
    }
};



