const ul = document.getElementById('lista');
const barraPesquisa = document.getElementById('search-nome');

async function carregarProfessores() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:8000/api/professor/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Authorization': `Bearer ${token}`
            },
        })
        if (!response.ok) {
            throw new Error(`Erro ao buscar professores. ${response.status}`)
        }
        ul.innerHTML = '';
        const professores = await response.json();

        professores.forEach(professor => {
            const newLi = document.createElement('li');
            const divNome = document.createElement('div');
            const divEmail = document.createElement('div');
            const divTurma = document.createElement('div');

            divNome.className = 'nome';
            divNome.innerText = professor.nome;
            divEmail.className = 'email';
            divEmail.innerText = professor.email;
            divTurma.className = 'turma';
            divTurma.innerText = `${professor.turmas.nome}`

            ul.appendChild(newLi);
            newLi.appendChild(divNome);
            newLi.appendChild(divEmail);
            newLi.appendChild(divTurma);
        })
    } catch (error) {
        console.error('Erro:', error)
    }
}

function pesquisarProfessor() {
    const buscarProfessor = barraPesquisa.value.toLowerCase();
    const itens = ul.getElementsByTagName('li');

    Array.from(itens).forEach((item) => {
        const nome = item.querySelector('.nome').innerText.toLowerCase();
        if (nome.includes(buscarProfessor)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    })
}

barraPesquisa.addEventListener('input', pesquisarProfessor)
window.onload = carregarProfessores