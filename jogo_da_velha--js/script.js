const currentPlayer = document.querySelector('.currentplayer');
//armazena itens que já foram selecionados
let selected;
let player = 'X';

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

function init() {
    selected = [];

    currentPlayer.innerHTML = `Jogador da vez: ${player}`;

    document.querySelectorAll('.jogo__button').forEach((item) => {
        item.innerHTML = '';
        item.addEventListener('click', newMove);
    })
}

init();

function newMove(e) {
    const index= e.target.getAttribute("value");
    e.target.innerHTML = player;
    e.target.removeEventListener('click', newMove);
    //pega o index do botão já selecionado e equivale ele a player
    selected[index] = player;

    setTimeout(() => {
        check();
    }, [100]);

    player = player === 'X' ? "O" : "X";
    currentPlayer.innerHTML = `Jogador da vez: ${player}`;
}

function check() {
    let playerLastMove = player === 'X' ? 'O' : 'X';

    const itens = selected.map((item, i) => [item,i]).filter((item) => item[0] === playerLastMove).map((item) => item[1]);

    for(pos of positions) {
        if (pos.every((item) => itens.includes(item))) {
            alert('O jogador ' + playerLastMove + ' ganhou!');
            init();
            return;
        }
    }

    if(selected.filter((item) => item).length === 9) {
        alert('Deu empate');
        init();
        return;
    }
}

const temaBtn = document.querySelector(".temas");

temaBtn.addEventListener('click', () => {
    const jogoBtn = document.querySelectorAll('.jogo__button');

    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');

    if (document.body.classList.contains('light')) {
        temaBtn.innerHTML = 'Dark';
        temaBtn.classList.remove('dark');
        temaBtn.classList.add('light');
        jogoBtn.forEach(button => {
            button.classList.remove('dark');
            button.classList.add('light');
        });
    } else {
        temaBtn.innerHTML = 'Light';
        temaBtn.classList.remove('light');
        temaBtn.classList.add('dark');
        jogoBtn.forEach(button => {
            button.classList.remove('light');
            button.classList.add('dark');
        });
    }
});
