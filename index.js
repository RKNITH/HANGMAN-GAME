const words = ["javascript", "hangman", "programming", "developer", "computer"];
let selectedWord;
let guessedLetters;
let wrongGuesses;
const maxWrongGuesses = 6;

const correctSound = new Audio('yes.wav'); // Update with actual URL
const wrongSound = new Audio('no.wav'); // Update with actual URL

document.getElementById('resetButton').addEventListener('click', startGame);
document.getElementById('letters').addEventListener('click', handleLetterClick);

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;

    document.getElementById('hangmanImage').src = `images/hangman.png`; // Update with actual URL
    displayWord();
    displayLetters();
}

function displayWord() {
    const wordToGuess = document.getElementById('wordToGuess');
    wordToGuess.innerHTML = '';

    selectedWord.split('').forEach(letter => {
        if (guessedLetters.includes(letter)) {
            wordToGuess.innerHTML += letter;
        } else {
            wordToGuess.innerHTML += '_';
        }
    });
}

function displayLetters() {
    const lettersDiv = document.getElementById('letters');
    lettersDiv.innerHTML = '';

    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
        const span = document.createElement('span');
        span.classList.add('letter');
        span.innerHTML = letter;

        if (guessedLetters.includes(letter) || wrongGuesses >= maxWrongGuesses) {
            span.classList.add('guessed');
        }

        lettersDiv.appendChild(span);
    });
}

function handleLetterClick(event) {
    const clickedLetter = event.target.innerHTML;

    if (event.target.classList.contains('letter') && !event.target.classList.contains('guessed')) {
        guessedLetters.push(clickedLetter);

        if (selectedWord.includes(clickedLetter)) {
            displayWord();
            checkWin();
            correctSound.play();
        } else {
            wrongGuesses++;
            document.getElementById('hangmanImage').src = `images/hangman${wrongGuesses}.jpg`; // Update with actual URL
            checkLoss();
            wrongSound.play();
        }

        displayLetters();
    }
}

function checkWin() {
    const wordToGuess = document.getElementById('wordToGuess').innerHTML;
    if (wordToGuess === selectedWord) {
        setTimeout(() => {
            alert('Congratulations! You won!');
            startGame();
        }, 100);
    }
}

function checkLoss() {
    if (wrongGuesses >= maxWrongGuesses) {
        setTimeout(() => {
            alert('Game over! The word was: ' + selectedWord);
            startGame();
        }, 100);
    }
}

startGame();
