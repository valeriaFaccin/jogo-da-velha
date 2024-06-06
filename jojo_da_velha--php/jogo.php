<?php

function imprimeTabuleiro($tabuleiro) {
    for ($i = 0; $i < 9; $i += 3) {
        echo " " . $tabuleiro[$i] . " | " . $tabuleiro[$i + 1] . " | " . $tabuleiro[$i + 2] . "\n";
        if ($i < 6) echo "---|---|---\n";
    }
}

function verificaVencedor($tabuleiro, $jogador) {
    $posVitoria = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    foreach ($posVitoria as $pos) {
        if ($tabuleiro[$pos[0]] === $jogador && $tabuleiro[$pos[1]] === $jogador && $tabuleiro[$pos[2]] === $jogador) {
            return true;
        }
    }
    return false;
}

function verificaEmpate($tabuleiro) {
    foreach ($tabuleiro as $pos) {
        if ($pos === ' ') {
            return false;
        }
    }
    return true;
}

$jogador1 = readline("Jogador 1: ");
$jogador2 = readline("Jogador 2: ");

$jogadores = [$jogador1 => 'X', $jogador2 => 'O'];
$tabuleiro = array_fill(0, 9, ' ');
$jogadorAtual = $jogador1;

while (true) {
    imprimeTabuleiro($tabuleiro);
    echo "$jogadorAtual (Posições 1-9): ";
    $pos = readline() - 1;

    if ($pos < 0 || $pos > 8 || $tabuleiro[$pos] !== ' ') {
        echo "Posição inválida\n";
        continue;
    }

    $tabuleiro[$pos] = $jogadores[$jogadorAtual];

    if (verificaVencedor($tabuleiro, $jogadores[$jogadorAtual])) {
        imprimeTabuleiro($tabuleiro);
        echo "Vitória de $jogadorAtual!\n";
        break;
    }

    if (verificaEmpate($tabuleiro)) {
        imprimeTabuleiro($tabuleiro);
        echo "Empate!\n";
        break;
    }

    $jogadorAtual = $jogadorAtual === $jogador1 ? $jogador2 : $jogador1;
}
