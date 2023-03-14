'use strict';
//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const score0Cur = document.getElementById('current--0');
const score1Cur = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnInfo = document.querySelector('.btn--info');

const closeModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

let scores, currentScore, activePlayer, playing;
//Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  score0Cur.textContent = 0;
  score1Cur.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

document.addEventListener('click', function (e) {
  if (e.target == closeModal || e.target == overlay) {
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
  }
});
btnInfo.addEventListener('click', function () {
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
});

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6);
    //2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `Images/dice-${dice}.png`;
    //3. check for rolled 0
    if (dice !== 0) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing && currentScore != 0) {
    //1. Add current score to active score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >=100
    //Finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. Switch player
      switchPlayer();
      diceEl.classList.add('hidden');
    }
  }
});
btnNew.addEventListener('click', init);
