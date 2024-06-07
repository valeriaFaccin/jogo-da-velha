const jogadorAtual = document.querySelector('.jogadorAtual');
const placarJogadorX = document.querySelector('.placar-x');
const placarJogadorO = document.querySelector('.placar-o');
const reiniciarBtn = document.querySelector('.reinicia');

let posSelecionada;
let jogador = 'X';
let placarX = 0;
let placarO = 0;

let posVitoria = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function armazenaPlacar() {
    placarX = localStorage.getItem('placarX') || 0;
    placarO = localStorage.getItem('placarO') || 0;
    atualizaPlacar();
}

function atualizaPlacar() {
    placarJogadorX.textContent = `Jogador X: ${placarX}`;
    placarJogadorO.textContent = `Jogador O: ${placarO}`;
}

function salvaPlacar() {
    localStorage.setItem('placarX', placarX);
    localStorage.setItem('placarO', placarO);
}

function reiniciaPlacar() {
    placarX = 0;
    placarO = 0;
    salvaPlacar();
    atualizaPlacar();
}

function inicioJogo() {
    posSelecionada = [];

    jogadorAtual.innerHTML = `Jogador da vez: ${jogador}`;

    document.querySelectorAll('.jogo__button').forEach((item) => {
        item.innerHTML = '';
        item.addEventListener('click', jogada);
    });

    armazenaPlacar();
}

inicioJogo();

function jogada(e) {
    const index = e.target.getAttribute("value");
    e.target.innerHTML = jogador;
    e.target.removeEventListener('click', jogada);
    posSelecionada[index] = jogador;

    setTimeout(() => {
        verificaVencedor();
    }, 100);

    jogador = jogador === 'X' ? "O" : "X";
    jogadorAtual.innerHTML = `Jogador da vez: ${jogador}`;
}

function verificaVencedor() {
    let ultimoJogador = jogador === 'X' ? 'O' : 'X';

    const itens = posSelecionada.map((item, i) => [item, i]).filter((item) => item[0] === ultimoJogador).map((item) => item[1]);

    for (let pos of posVitoria) {
        if (pos.every((item) => itens.includes(item))) {
            alert('O jogador ' + ultimoJogador + ' ganhou!');
            if (ultimoJogador === 'X') {
                placarX++;
            } else {
                placarO++;
            }
            salvaPlacar();
            atualizaPlacar();
            inicioJogo();
            return;
        }
    }

    if (posSelecionada.filter((item) => item).length === 9) {
        alert('Deu empate');
        placarX++;
        placarO++;
        salvaPlacar();
        atualizaPlacar();
        inicioJogo();
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

    reiniciarBtn.classList.toggle('dark');
    reiniciarBtn.classList.toggle('light');

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

reiniciarBtn.addEventListener('click', () => {
    reiniciaPlacar();
    inicioJogo();
});
