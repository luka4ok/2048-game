'use strict';

const Game = require('../modules/Game.class');
const game = new Game();

const tiles = document.querySelectorAll('.field-cell');
const startButton = document.querySelector('.button.start');
const scoreElement = document.querySelector('.game-score');
const winMessageElement = document.querySelector('.message-win');
const loseMessageElement = document.querySelector('.message-lose');
const startMessageElement = document.querySelector('.message-start');

const hideMessages = () => {
  winMessageElement.classList.add('hidden');
  loseMessageElement.classList.add('hidden');
  startMessageElement.classList.add('hidden');
};

const handleKeydown = (e) => {
  if (game.getStatus() === 'playing') {
    switch (e.key) {
      case 'ArrowLeft':
        game.moveLeft();
        break;
      case 'ArrowRight':
        game.moveRight();
        break;
      case 'ArrowUp':
        game.moveUp();
        break;
      case 'ArrowDown':
        game.moveDown();
        break;
    }
    updateGameField();
  }
};

document.addEventListener('keydown', handleKeydown);

function updateGameField() {
  const state = game.getState().flat();

  tiles.forEach((cell, i) => {
    cell.className = 'field-cell';

    if (state[i]) {
      cell.textContent = state[i];
      cell.classList.add(`field-cell--${state[i]}`);
    } else {
      cell.textContent = '';
    }
  });

  scoreElement.textContent = game.getScore();

  const statusGame = game.getStatus();

  switch (statusGame) {
    case 'win':
      winMessageElement.classList.remove('hidden');
      break;
    case 'lose':
      loseMessageElement.classList.remove('hidden');
      break;
    default:
      winMessageElement.classList.add('hidden');
      loseMessageElement.classList.add('hidden');
      break;
  }
}

startButton.addEventListener('click', () => {
  if (startButton.classList.contains('restart')) {
    game.restart();
  }

  game.start();
  updateGameField();
  hideMessages();
  startButton.textContent = 'Restart';
  startButton.classList.add('restart');
});
