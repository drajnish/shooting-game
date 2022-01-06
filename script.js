'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let health0El = document.getElementById('health--0');
let health1El = document.getElementById('health--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const roundSection = document.getElementById('round-section');

//selecting button elements
const btnNext = document.querySelector('.btn--next');
const btnShoot = document.querySelector('.btn--shoot');
const btnNew = document.querySelector('.btn--new');

//Starting conditions
let healths, currentHit, activePlayer, playing, roundWinner;
roundWinner = [];

const init = () => {
  currentHit = 0;
  healths = [10, 10];
  activePlayer = 0;
  playing = true;

  health0El.textContent = 10;
  health1El.textContent = 10;
  current1El.textContent = 0;
  current0El.textContent = 0;

  // buttons initial state
  btnShoot.disabled = false;
  btnNext.disabled = true;

  // active player class initial state
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

const addElement = () => {
  roundSection.innerHTML = '';

  let roundsEl = document.createElement('div');
  roundsEl.classList.add('rounds');
  roundsEl.innerHTML = `<div class="rounds">
  <h3>Round - 1</h3> 
</div>
  `;

  roundSection.appendChild(roundsEl);
};

init();
addElement();

const switchPlayer = () => {
  activePlayer = activePlayer === 0 ? 1 : 0;

  healths[activePlayer] -= currentHit;

  //toggle : add or remove the class in element
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  let p1, p2;
  if (healths[activePlayer] <= 0) {
    if (roundWinner.length < 6) {
      // to add current round winner
      roundWinner.push(activePlayer ? 0 : 1);

      const roundCounts = {};
      roundSection.innerHTML = '';

      roundWinner.forEach((winner, i) => {
        roundCounts[winner] = (roundCounts[winner] || 0) + 1;

        let winnerP1 = winner ? '<span>🔴</span>' : '<span>✔</span>';
        let winnerP2 = winner ? '<span>✔</span>' : '<span>🔴</span>';

        const roundsEl = document.createElement('div');
        roundsEl.classList.add('rounds');
        roundsEl.innerHTML = `<div class="rounds">
    <h3>Round - ${i + 1}</h3> 
    <div class="round-result">
    ${winnerP1}
    ${winnerP2}
    </div>
  </div>
    `;

        roundSection.appendChild(roundsEl);
      });

      // to count number of round winner
      ({ 0: p1 = 0, 1: p2 = 0 } = roundCounts);
    }

    btnNext.disabled = false;
    btnShoot.disabled = true;
  }

  if (healths[activePlayer] > 0) {
    document.getElementById(`health--${activePlayer}`).textContent =
      healths[activePlayer];
  } else {
    document.getElementById(`health--${activePlayer}`).textContent = 0;
  }

  if (p1 === 3) {
    document.querySelector(`.player--0`).classList.add('player--winner');
    btnNext.disabled = true;
    btnShoot.disabled = true;
  }
  if (p2 === 3) {
    document.querySelector(`.player--1`).classList.add('player--winner');
    btnNext.disabled = true;
    btnShoot.disabled = true;
  }
};

btnShoot.addEventListener('click', () => {
  if (playing) {
    const hitPoint = Math.trunc(Math.random() * 6);
    currentHit = hitPoint;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentHit;
    switchPlayer();
  }
});

btnNext.addEventListener('click', () => {
  init();
  btnNext.disabled = true;
  btnShoot.disabled = false;
});

btnNew.addEventListener('click', () => {
  roundWinner.length = 0;

  addElement();

  init();
});
