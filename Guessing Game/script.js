let randomNumber = null;
let maxRange = null;

document.getElementById('start-game').addEventListener('click', () => {
    const difficulty = document.getElementById('difficulty').value;
    switch (difficulty) {
        case 'easy':
            maxRange = 100;
            break;
        case 'normal':
            maxRange = 1000;
            break;
        case 'hard':
            maxRange = 10000;
            break;
    }
    randomNumber = Math.floor(Math.random() * maxRange) + 1;
    document.getElementById('game-area').style.display = 'block';
    document.getElementById('message').textContent = `Guess a number between 1 and ${maxRange}:`;
});

document.getElementById('submit-guess').addEventListener('click', () => {
    const guess = parseInt(document.getElementById('guess-input').value, 10);
    const resultElement = document.getElementById('result');

    if (isNaN(guess) || guess < 1 || guess > maxRange) {
        resultElement.textContent = `Please enter a valid number between 1 and ${maxRange}.`;
        return;
    }

    if (guess === randomNumber) {
        resultElement.textContent = `Congratulations! You guessed the correct number: ${randomNumber}`;
        document.getElementById('submit-guess').style.display = 'none';
        document.getElementById('reset-game').style.display = 'inline-block';
    } else if (guess < randomNumber) {
        resultElement.textContent = 'Too low! Try again.';
    } else {
        resultElement.textContent = 'Too high! Try again.';
    }
});

document.getElementById('reset-game').addEventListener('click', () => {
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('submit-guess').style.display = 'inline-block';
    document.getElementById('reset-game').style.display = 'none';
    document.getElementById('result').textContent = '';
    document.getElementById('guess-input').value = '';
});