import './style.css';

const boxes = document.querySelectorAll('.board-box');

const winner = document.querySelector('.winner-name');

const resetBtn = document.querySelector('.reset');

const overlay = document.getElementById('overlay');

const popup = document.getElementById('popup');

let turn = 'X';

const boxEmpty = (id) => {
  const box = document.getElementById(`${id}`);
  let status = false;
  if (!box.innerHTML) {
    status = true;
  }
  return status;
};

const changePlayer = () => (turn === 'X' ? 'O' : 'X');

const checkWinner = () => {
  let win = false;
  const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  wins.forEach((w) => {
    if (boxes[w[0]].innerHTML === turn
       && boxes[w[1]].innerHTML === turn
       && boxes[w[2]].innerHTML === turn) {
      win = true;
    }
  });
  return win;
};

const showWinner = (winner) => {
  overlay.classList.add('active');
  popup.classList.add('active');
  winner.innerHTML = winner;
};

const resetGame = () => {
  overlay.classList.remove('active');
  popup.classList.remove('active');
  boxes.forEach((box) => {
    box.innerHTML = '';
    turn = 'X';
  });
  return turn;
};

boxes.forEach((box) => {
  box.addEventListener('click', (e) => {
    const { id } = e.target;
    if (!boxEmpty(id)) {
      return false;
    }
    box.innerHTML = turn;
    if (checkWinner()) {
      winner.innerHTML = `${turn} is the winner`;
      showWinner(turn);
    }
    turn = changePlayer();
    return turn;
  });
});

resetBtn.addEventListener('click', resetGame);
