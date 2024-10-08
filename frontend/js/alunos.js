const ul = document.getElementById('lista');
const barraPesquisa = document.getElementById('search-nome');

// Função para carregar os alunos
async function carregarAlunos() {
    try {
        const response = await fetch('http://localhost:8000/api/aluno/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            },
        })
        if (!response.ok) {
            throw new Error(`Erro ao buscar alunos. ${response.status}`)
        }
        ul.innerHTML = '';
        const alunos = await response.json();

        alunos.forEach(aluno => {
            const newLi = document.createElement('li');
            const divNome = document.createElement('div');
            const divEmail = document.createElement('div');
            const divTurma = document.createElement('div');
            const verMais = document.createElement('div');

            divNome.className = 'nome';
            divNome.innerText = aluno.nome;
            divEmail.className ='email';
            divEmail.innerText = aluno.email;
            divTurma.className = 'turma';
            divTurma.innerText = aluno.turma.nome
            verMais.className = 'ver-mais';
            verMais.innerText = '...'

            ul.appendChild(newLi);
            newLi.appendChild(divNome);
            newLi.appendChild(divEmail);
            newLi.appendChild(divTurma);
            newLi.appendChild(verMais);
        })
    } catch(error) {
        console.error('Erro:', error)
    }
}

// Função para pesquisar o aluno
function pesquisarAluno() {
    const buscarAluno = barraPesquisa.value.toLowerCase();
    const itens = ul.getElementsByTagName('li');

    Array.from(itens).forEach((item) => {
        const nome = item.querySelector('.nome').innerText.toLowerCase()
        if (nome.includes(buscarAluno)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    })
}

barraPesquisa.addEventListener('input', pesquisarAluno);
window.onload = carregarAlunos;