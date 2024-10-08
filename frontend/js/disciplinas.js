const ul = document.getElementById('lista');
const barraPesquisa = document.getElementById('search-nome');

async function carregarDisciplinas() {
    try {
        const response = await fetch('http://localhost:8000/api/disciplina/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            },
        })
        if (!response.ok) {
            throw new Error(`Erro ao buscar professores. ${response.status}`)
        }
        ul.innerHTML = '';
        const disciplinas = await response.json();

        disciplinas.forEach(disciplina => {
            const newLi = document.createElement('li');
            const divNome = document.createElement('div');
            const divProfAtb = document.createElement('div');
            
            // newLi.id = disciplina._id
            divNome.className = 'nome';
            divNome.innerText = disciplina.nome;
            // divProfAtb.className = 'professor-atb';
            // divProfAtb.innerText = `${disciplina.professor.nome}`

            ul.appendChild(newLi);
            newLi.appendChild(divNome);
            // newLi.appendChild(divProfAtb);
        })
    } catch (error) {
        console.error('Erro:', error)
    }
}

function pesquisarDisciplina() {
    const buscarDisciplina = barraPesquisa.value.toLowerCase();
    const itens = ul.getElementsByTagName('li');

    Array.from(itens).forEach((item) => {
        const nome = item.querySelector('.nome').innerText.toLowerCase();
        if (nome.includes(buscarDisciplina)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    })
}

barraPesquisa.addEventListener('input', pesquisarDisciplina)
window.onload = carregarDisciplinas