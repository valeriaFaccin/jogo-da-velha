const currentPlayer = document.querySelector('.currentplayer');
const scoreXElement = document.querySelector('.score-x');
const scoreOElement = document.querySelector('.score-o');
const resetButton = document.querySelector('.reset');

let selected;
let player = 'X';
let scoreX = 0;
let scoreO = 0;

let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

// Load scores from local storage
function loadScores() {
    scoreX = localStorage.getItem('scoreX') || 0;
    scoreO = localStorage.getItem('scoreO') || 0;
    updateScoreboard();
}

function updateScoreboard() {
    scoreXElement.textContent = `Player X: ${scoreX}`;
    scoreOElement.textContent = `Player O: ${scoreO}`;
}

function saveScores() {
    localStorage.setItem('scoreX', scoreX);
    localStorage.setItem('scoreO', scoreO);
}

function resetScores() {
    scoreX = 0;
    scoreO = 0;
    saveScores();
    updateScoreboard();
}

function init() {
    selected = [];

    currentPlayer.innerHTML = `Jogador da vez: ${player}`;

    document.querySelectorAll('.jogo__button').forEach((item) => {
        item.innerHTML = '';
        item.addEventListener('click', newMove);
    });

    loadScores();
}

init();

function newMove(e) {
    const index = e.target.getAttribute("value");
    e.target.innerHTML = player;
    e.target.removeEventListener('click', newMove);
    selected[index] = player;

    setTimeout(() => {
        check();
    }, 100);

    player = player === 'X' ? "O" : "X";
    currentPlayer.innerHTML = `Jogador da vez: ${player}`;
}

function check() {
    let playerLastMove = player === 'X' ? 'O' : 'X';

    const itens = selected.map((item, i) => [item, i]).filter((item) => item[0] === playerLastMove).map((item) => item[1]);

    for (let pos of positions) {
        if (pos.every((item) => itens.includes(item))) {
            alert('O jogador ' + playerLastMove + ' ganhou!');
            if (playerLastMove === 'X') {
                scoreX++;
            } else {
                scoreO++;
            }
            saveScores();
            updateScoreboard();
            init();
            return;
        }
    }

    if (selected.filter((item) => item).length === 9) {
        alert('Deu empate');
        scoreX++;
        scoreO++;
        saveScores();
        updateScoreboard();
        init();
        return;
    }
}

const temaBtn = document.querySelector(".temas");

temaBtn.addEventListener('click', () => {
    const jogoBtn = document.querySelectorAll('.jogo__button');

    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');

    temaBtn.classList.toggle('dark');
    temaBtn.classList.toggle('light');

    resetButton.classList.toggle('dark');
    resetButton.classList.toggle('light');

    jogoBtn.forEach(button => {
        button.classList.toggle('dark');
        button.classList.toggle('light');
    });

    if (document.body.classList.contains('light')) {
        temaBtn.innerHTML = 'Dark';
    } else {
        temaBtn.innerHTML = 'Light';
    }
});

// Reset scores
resetButton.addEventListener('click', () => {
    resetScores();
    init();
});
