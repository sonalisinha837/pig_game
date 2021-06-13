'use strict';

let dice = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnInstruct = document.querySelector('.btn--instruction');
const btnCloseModal = document.querySelector('.close-modal');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

let currentScore = 0;
let totalScore0 = 0;
let totalScore1 = 0;
let activePlayer = 0;

document.querySelector('#score--0').textContent = 0;
document.querySelector('#score--1').textContent = 0;

dice.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  if (
    !player0El.classList.contains('player--winner') &&
    !player1El.classList.contains('player--winner')
  ) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNumber}.png`;
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (
    !player0El.classList.contains('player--winner') &&
    !player1El.classList.contains('player--winner')
  ) {
    if (activePlayer === 0) {
      totalScore0 += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        totalScore0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = 1;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
      currentScore = 0;

      if (totalScore0 >= 100) {
        //Player 0 win
        player0El.classList.add('player--winner');
        player0El.classList.remove('player--active');
        dice.classList.add('hidden');
      }
    } else {
      totalScore1 += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        totalScore1;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = 0;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
      currentScore = 0;

      if (totalScore1 >= 100) {
        //Player 1 win
        player1El.classList.add('player--winner');
        player1El.classList.remove('player--active');
        dice.classList.add('hidden');
      }
    }
  }
});

btnNewGame.addEventListener('click', function () {
  currentScore = 0;
  totalScore0 = 0;
  totalScore1 = 0;
  activePlayer = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  dice.classList.add('hidden');
});

btnInstruct.addEventListener('click', function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

const hideModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseModal.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') hideModal();
});
