'use strict';

class Game {
  constructor(
    initialState = Array.from({ length: 4 }, () => Array(4).fill(0)),
  ) {
    this.score = 0;
    this.status = 'idle';
    this.initialState = initialState;
    this.state = this.cloneState(this.initialState);
  }

  cloneState(state) {
    return state.map((row) => [...row]);
  }

  generateRandomTile() {
    const emptyTiles = this.getEmptyTiles();

    if (emptyTiles.length === 0) {
      return;
    }

    const [row, col] =
      emptyTiles[Math.floor(Math.random() * emptyTiles.length)];

    this.state[row][col] = Math.random() < 0.9 ? 2 : 4;
  }

  getEmptyTiles() {
    const emptyTiles = [];

    this.state.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        if (tile === 0) {
          emptyTiles.push([rowIndex, colIndex]);
        }
      });
    });

    return emptyTiles;
  }

  move(direction) {
    if (this.status !== 'playing') {
      return;
    }

    const originalState = this.cloneState(this.state);

    this.state = this.processMove(direction);

    if (!this.areStatesEqual(this.state, originalState)) {
      this.generateRandomTile();
      this.validateGameState();
    }
  }

  processMove(direction) {
    const moveRow = (row) => {
      const filteredRow = row.filter((n) => n !== 0);
      const combinedRow = [];

      for (let i = 0; i < filteredRow.length; i++) {
        if (filteredRow[i] === filteredRow[i + 1]) {
          combinedRow.push(filteredRow[i] * 2);
          this.score += filteredRow[i] * 2;
          i++;
        } else {
          combinedRow.push(filteredRow[i]);
        }
      }

      return [...combinedRow, ...Array(4 - combinedRow.length).fill(0)];
    };

    const processRows = (state, reverse = false) =>
      state.map((row) =>
        reverse ? moveRow(row.reverse()).reverse() : moveRow(row));

    switch (direction) {
      case 'left':
        return processRows(this.state);
      case 'right':
        return processRows(this.state, true);
      case 'up':
        return this.rotateState(processRows(this.rotateState(this.state)));
      case 'down':
        return this.rotateState(
          processRows(this.rotateState(this.state), true),
        );
      default:
        return this.state;
    }
  }

  validateGameState() {
    if (this.state.flat().includes(2048)) {
      this.status = 'win';
    } else if (!this.hasEmptyCells() && !this.canCombine()) {
      this.status = 'lose';
    }
  }

  hasEmptyCells() {
    return this.state.some((row) => row.includes(0));
  }

  canCombine() {
    return this.state.some((row, rowIndex) =>
      row.some(
        (current, colIndex) =>
          (colIndex < 3 && current === row[colIndex + 1]) ||
          (rowIndex < 3 && current === this.state[rowIndex + 1][colIndex]),
      ));
  }

  rotateState(state) {
    return state[0].map((_, colIndex) =>
      state.map((row) => {
        return row[colIndex];
      }));
  }

  start() {
    if (this.status === 'idle') {
      this.status = 'playing';
      this.generateRandomTile();
      this.generateRandomTile();
    }
  }

  restart() {
    this.state = this.cloneState(this.initialState);
    this.score = 0;
    this.status = 'idle';
  }

  areStatesEqual(state1, state2) {
    return state1.every((row, rowIndex) =>
      row.every((tile, colIndex) => tile === state2[rowIndex][colIndex]));
  }

  getScore() {
    return this.score;
  }

  getState() {
    return this.state;
  }

  getStatus() {
    return this.status;
  }

  moveLeft() {
    this.move('left');
  }
  moveRight() {
    this.move('right');
  }
  moveUp() {
    this.move('up');
  }
  moveDown() {
    this.move('down');
  }
}

module.exports = Game;
