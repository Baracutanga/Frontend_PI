const ul = document.getElementById('lista');
const barraPesquisa = document.getElementById('search-nome');

async function carregarTurmas() {
    try {
        const response = await fetch('http://localhost:8000/api/turma/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            },
        })
        if (!response.ok) {
            throw new Error(`Erro ao buscar turmas. ${response.status}`)
        }
        ul.innerHTML = '';
        const turmas = await response.json();

        turmas.forEach(turma => {
            const newLi = document.createElement('li');
            const divNome = document.createElement('div');
            const divTurno = document.createElement('div');
            const newButton = document.createElement('button');
            
            // newLi.id = disciplina._id
            divNome.className = 'nome';
            divNome.innerText = turma.nome;
            divTurno.className = 'turno';
            divTurno.innerText = turma.turno;
            newButton.type = 'button';
            newButton.innerText = 'Adicionar Disciplinas';

            ul.appendChild(newLi);
            newLi.appendChild(divNome);
            newLi.appendChild(divTurno);
            newLi.appendChild(newButton);
        })
    } catch (error) {
        console.error('Erro:', error)
    }
}

function pesquisarTurma() {
    const buscarTurma = barraPesquisa.value.toLowerCase();
    const itens = ul.getElementsByTagName('li');

    Array.from(itens).forEach((item) => {
        const nome = item.querySelector('.nome').innerText.toLowerCase();
        if (nome.includes(buscarTurma)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    })
}

barraPesquisa.addEventListener('input', pesquisarTurma);
window.onload = carregarTurmas;