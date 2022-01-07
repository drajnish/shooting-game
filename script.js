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

//selecting bullets and tank
const bullet0 = document.getElementById('bullet--0');
const bullet1 = document.getElementById('bullet--1');
const tank0 = document.querySelector('.tank--0');
const head0 = document.querySelector('.head--0');
const footLeft0 = document.querySelector('.foot--0--left');
const footRight0 = document.querySelector('.foot--0--right');
const tank1 = document.querySelector('.tank--1');
const head1 = document.querySelector('.head--1');
const footLeft1 = document.querySelector('.foot--1--left');
const footRight1 = document.querySelector('.foot--1--right');

//Starting conditions
let healths, currentHit, activePlayer, playing, roundWinner;
roundWinner = [];

const init = () => {
  currentHit = 0;
  healths = [100, 100];
  activePlayer = 0;
  playing = true;

  health0El.textContent = 100;
  health1El.textContent = 100;
  current1El.textContent = 0;
  current0El.textContent = 0;

  // buttons initial state
  btnShoot.disabled = true;
  btnNext.disabled = true;

  // active player class initial state
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--looser');
  player1El.classList.remove('player--looser');

  // bullets and tank initial state
  bullet0.style.left = `${13}%`;
  bullet1.style.right = `${16}%`;

  bullet0.classList.remove('hidden');
  bullet1.classList.remove('hidden');

  tank1.classList.remove('tank--winner');
  head1.classList.remove('tank--winner');
  footLeft1.classList.remove('tank--winner');
  footRight1.classList.remove('tank--winner');

  tank0.classList.remove('tank--looser');
  footLeft0.classList.remove('tank--looser');
  footRight0.classList.remove('tank--looser');
  head0.classList.remove('tank--looser');

  tank0.classList.remove('tank--winner');
  head0.classList.remove('tank--winner');
  footLeft0.classList.remove('tank--winner');
  footRight0.classList.remove('tank--winner');

  tank1.classList.remove('tank--looser');
  footLeft1.classList.remove('tank--looser');
  footRight1.classList.remove('tank--looser');
  head1.classList.remove('tank--looser');
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

// for bullet movement
// const tank0 = document.querySelector('tank--0');

// const tank1 = document.querySelector('tank--1');

function bulletShoot(start, end, bullet) {
  let intervalId = null;
  const elem = bullet;
  let pos = start;
  clearInterval(intervalId);
  intervalId = setInterval(bulletMove, 10);
  function bulletMove() {
    if (pos == end) {
      clearInterval(intervalId);
    } else {
      pos++;
      if (bullet === bullet0) {
        elem.style.left = `${pos}%`;
      } else {
        elem.style.right = `${pos}%`;
      }
    }
  }
}

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
        // to count number of round winner
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
    document.querySelector(`.player--1`).classList.add('player--looser');

    bullet1.classList.add('hidden');
    bullet0.classList.add('hidden');

    tank0.classList.add('tank--winner');
    head0.classList.add('tank--winner');
    footLeft0.classList.add('tank--winner');
    footRight0.classList.add('tank--winner');

    tank1.classList.add('tank--looser');
    footLeft1.classList.add('tank--looser');
    footRight1.classList.add('tank--looser');
    head1.classList.add('tank--looser');

    btnNext.disabled = true;
    btnShoot.disabled = true;
  }
  if (p2 === 3) {
    document.querySelector(`.player--1`).classList.add('player--winner');
    document.querySelector(`.player--0`).classList.add('player--looser');

    bullet0.classList.add('hidden');
    bullet1.classList.add('hidden');

    tank1.classList.add('tank--winner');
    head1.classList.add('tank--winner');
    footLeft1.classList.add('tank--winner');
    footRight1.classList.add('tank--winner');

    tank0.classList.add('tank--looser');
    footLeft0.classList.add('tank--looser');
    footRight0.classList.add('tank--looser');
    head0.classList.add('tank--looser');

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

    bulletShoot(16, 85, document.getElementById(`bullet--${activePlayer}`));

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
  btnShoot.disabled = false;
});
