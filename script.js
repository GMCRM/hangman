const words = [
    "Nutrition", "Health", "Wellness", "Natural", "Fruits", "Vegetables", "Balance", "Phytonutrients", "Fiber", 
    "Spice", "Chemical", "Spiritual", "Physical", "AloeVera", "Apple", "Banana", "Blueberry", "Cherry", "Cranberry", "Grape", 
    "Grapefruit", "Lemon", "Mango", "Orange", "Papaya", "Pineapple", "Raspberry", "Strawberry", "Tomato", "Broccoli", "Cabbage", 
    "Carrot", "Cauliflower", "Cayenne", "Celery", "Garlic", "Kale", "Onion", "Mushroom", "Soybean", "Spinach", "SweetPotato", 
    "Wheatgrass", "Apple", "Monkfruit", "Allspice", "Cardamom", "Cinnamon", "Clove", 
    "Coriander", "Cumin", "Ginger", "Mustard", "Replacement", "Customer", "Success"  
];

let selectedWord = '';
let guessedLetters = [];
let wrongGuesses = 0;

const maxWrongGuesses = 6;

const hangmanCanvas = document.getElementById('hangman-canvas');
const ctx = hangmanCanvas.getContext('2d');
const wordContainer = document.getElementById('word-container');
const guessesLeftContainer = document.getElementById('guesses-left');
const lettersContainer = document.getElementById('letters-container');
const messageContainer = document.getElementById('message-container');
const resetButton = document.getElementById('reset-button');

function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    guessedLetters = [];
    wrongGuesses = 0;
    messageContainer.textContent = '';
    updateGuessesLeft();
    drawHangman();
    displayWord();
    displayLetters();
}

function displayWord() {
    wordContainer.innerHTML = selectedWord.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : '_'
    ).join(' ');
}

function displayLetters() {
    lettersContainer.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const letterElement = document.createElement('div');
        letterElement.classList.add('letter');
        letterElement.textContent = letter;
        if (guessedLetters.includes(letter)) {
            letterElement.classList.add('selected');
        }
        letterElement.addEventListener('click', () => guessLetter(letter));
        lettersContainer.appendChild(letterElement);
    }
}

function guessLetter(letter) {
    if (guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);
    if (selectedWord.includes(letter)) {
        displayWord();
        checkWin();
    } else {
        wrongGuesses++;
        updateGuessesLeft();
        drawHangman();
        if (wrongGuesses >= maxWrongGuesses) {
            endGame(false);
        }
    }
    displayLetters();
}

function checkWin() {
    const currentWord = wordContainer.textContent.replace(/\s/g, '');
    if (currentWord === selectedWord) {
        endGame(true);
    }
}

function endGame(won) {
    messageContainer.textContent = won ? 'You Won!' : `You Lost! The word was ${selectedWord}`;
}

function updateGuessesLeft() {
    guessesLeftContainer.textContent = `Guesses Left: ${maxWrongGuesses - wrongGuesses}`;
}

function drawHangman() {
    ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    if (wrongGuesses > 0) {
        // Draw base
        ctx.beginPath();
        ctx.moveTo(10, 390);
        ctx.lineTo(190, 390);
        ctx.stroke();
    }
    if (wrongGuesses > 1) {
        // Draw pole
        ctx.beginPath();
        ctx.moveTo(50, 390);
        ctx.lineTo(50, 50);
        ctx.lineTo(150, 50);
        ctx.lineTo(150, 100);
        ctx.stroke();
    }
    if (wrongGuesses > 2) {
        // Draw head
        ctx.beginPath();
        ctx.arc(150, 130, 30, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (wrongGuesses > 3) {
        // Draw body
        ctx.beginPath();
        ctx.moveTo(150, 160);
        ctx.lineTo(150, 280);
        ctx.stroke();
    }
    if (wrongGuesses > 4) {
        // Draw arms
        ctx.beginPath();
        ctx.moveTo(150, 200);
        ctx.lineTo(110, 240);
        ctx.moveTo(150, 200);
        ctx.lineTo(190, 240);
        ctx.stroke();
    }
    if (wrongGuesses > 5) {
        // Draw legs
        ctx.beginPath();
        ctx.moveTo(150, 280);
        ctx.lineTo(120, 350);
        ctx.moveTo(150, 280);
        ctx.lineTo(180, 350);
        ctx.stroke();
    }
}

resetButton.addEventListener('click', initializeGame);

initializeGame();
