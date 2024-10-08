const ul = document.getElementById('lista');
const barraPesquisa = document.getElementById('search-nome');

async function carregarCoordenadores() {
    try {
        const response = await fetch('http://localhost:8000/api/coordenador/', {
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
        const coordenadores = await response.json();

        coordenadores.forEach(coordenador => {
            const newLi = document.createElement('li');
            const divNome = document.createElement('div');
            const divEmail = document.createElement('div');
            
            // newLi.id = disciplina._id
            divNome.className = 'nome';
            divNome.innerText = coordenador.nome;
            divEmail.className = 'email';
            divEmail.innerText = coordenador.email;

            ul.appendChild(newLi);
            newLi.appendChild(divNome);
            newLi.appendChild(divEmail);
        })
    } catch (error) {
        console.error('Erro:', error)
    }
}

function pesquisarCoordenador() {
    const buscarCoordenador = barraPesquisa.value.toLowerCase();
    const itens = ul.getElementsByTagName('li');

    Array.from(itens).forEach((item) => {
        const nome = item.querySelector('.nome').innerText.toLowerCase();
        if (nome.includes(buscarCoordenador)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    })
}

barraPesquisa.addEventListener('input', pesquisarCoordenador);
window.onload = carregarCoordenadores;