
const tabuleiro = document.getElementById('tabuleiro');
const pontosXEl = document.getElementById('pontosX');
const pontosOEl = document.getElementById('pontosO');
const jogadorXEl = document.getElementById('jogadorX');
const jogadorOEl = document.getElementById('jogadorO');

let tabuleiroEstado = Array(9).fill('');
let jogadorAtual = 'X';
let pontos = { X: 0, O: 0 };

function salvarEstado() {
    localStorage.setItem('tabuleiro', JSON.stringify(tabuleiroEstado));
    localStorage.setItem('jogador', jogadorAtual);
    localStorage.setItem('pontos', JSON.stringify(pontos));
}

function carregarEstado() {
    const t = localStorage.getItem('tabuleiro');
    const j = localStorage.getItem('jogador');
    const p = localStorage.getItem('pontos');
    if (t && j && p) {
        tabuleiroEstado = JSON.parse(t);
        jogadorAtual = j;
        pontos = JSON.parse(p);
    }
}

function atualizarPlacar() {
    pontosXEl.textContent = pontos.X;
    pontosOEl.textContent = pontos.O;
    jogadorXEl.classList.toggle('ativo', jogadorAtual === 'X');
    jogadorOEl.classList.toggle('ativo', jogadorAtual === 'O');
}

function criarTabuleiro() {
    tabuleiro.innerHTML = '';
    tabuleiroEstado.forEach((valor, i) => {
        const celula = document.createElement('div');
        celula.classList.add('celula');
        if (valor) celula.classList.add(valor.toLowerCase());
        celula.textContent = valor;
        celula.addEventListener('click', () => jogar(i));
        tabuleiro.appendChild(celula);
    });
}

function verificarVitoria() {
    const combinacoes = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return combinacoes.find(([a, b, c]) => 
        tabuleiroEstado[a] &&
        tabuleiroEstado[a] === tabuleiroEstado[b] &&
        tabuleiroEstado[a] === tabuleiroEstado[c]
    );
}

function jogar(i) {
    if (tabuleiroEstado[i]) return;
    tabuleiroEstado[i] = jogadorAtual;
    criarTabuleiro();
    const vencedor = verificarVitoria();
    if (vencedor) {
        alert(`O jogador ${jogadorAtual} ganhou!`);
        pontos[jogadorAtual]++;
        reiniciarPartida();
    } else if (tabuleiroEstado.every(c => c)) {
        alert('Deu velha!');
        reiniciarPartida();
    } else {
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
    }
    atualizarPlacar();
    salvarEstado();
}

function reiniciarPartida() {
    tabuleiroEstado = Array(9).fill('');
    criarTabuleiro();
    atualizarPlacar();
    salvarEstado();
}

function reiniciarJogo() {
    pontos = { X: 0, O: 0 };
    jogadorAtual = 'X';
    reiniciarPartida();
}


carregarEstado();
criarTabuleiro();
atualizarPlacar();
