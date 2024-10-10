if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function (registration) {
                console.log('Service Worker registrado com sucesso:', registration.scope);
            }).catch(function (error) {
                console.log('Falha ao registrar o Service Worker:', error);
            });
    });
}

const pfp = document.querySelector('#pfp');

pfp.addEventListener('click', () => {

})

// Abrir menu mobile
const menuBurguer = document.getElementById('menu-burger');
const menu = document.getElementById('menu-mobile');

menuBurguer.addEventListener('click', () => {
    if (menu.classList.contains('menu-aberto')) {
        // Fecha o menu
        menuBurguer.src = '../icons/menu-burger.svg';
        menu.classList.remove('menu-aberto');
    } else {
        // Abre o menu
        menuBurguer.src = '../icons/caret-down.svg';
        menu.classList.add('menu-aberto');
    }
});

// Páginas
const inicio = document.getElementById('home');
const comunicados = document.getElementById('comunicados');
const conceitos = document.getElementById('conceitos');


inicio.addEventListener('click', () => {
    window.location.href = '/frontend/coordenador/home.html'
})

comunicados.addEventListener('click', () => {
    window.location.href = '/frontend/coordenador/comunicados.html'
})

conceitos.addEventListener('click', () => {
    window.location.href = '/frontend/coordenador/conceitos.html'
})

const token = localStorage.getItem('token');

// Abrir/Fechar forms
const btnRegistrar = document.getElementById('registrar');
const closeBtn = document.getElementById('close-icon');
const form = document.getElementsByTagName('form')[0];

btnRegistrar.addEventListener('click', () => {
    form.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
    form.style.display = '';
})

// Enviar registros
// Forms
const formProf = document.getElementById('form-professor');
const formAluno = document.querySelector('#form-alunos');
const formDisciplina = document.getElementById('form-disciplina');
const formTurma = document.getElementById('form-turmas');
const formCoord = document.querySelector('#form-coordenador');

// Inputs
const inputNome = document.querySelector('#nome-input');
const inputEmail = document.querySelector('#email-input');
const inputSenha = document.querySelector('#senha-input');
const selectProf = document.getElementById('select-professor');
const selectTurno = document.getElementById('select-turno')
const selectTurma = document.getElementById('select-turma');

formAluno.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:8000/api/aluno/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nome: inputNome.value,
                email: inputEmail.value,
                senha: inputSenha.value,
                turma: "6702ee7eda44e6481fbdbfb5"
            })
        })
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        alert(`Aluno ${inputNome.value} adicionado!`);

        window.location.reload();
    } catch (error) {
        console.error('Não foi possiver cadastrar aluno', error);
    }
})

formProf.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:8000/api/professor/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nome: inputNome.value,
                email: inputEmail.value,
                senha: inputSenha.value
            })
        })
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        alert(`Professor ${inputNome.value} adicionado`);

        window.location.reload();
    } catch (error) {
        console.error('Não foi possiver cadastrar professor', error);
    }
})

formDisciplina.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:8000/api/disciplina/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nome: inputNome.value,
                professor: selectProf.value
            })
        })
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        alert(`Disciplina ${inputNome.value} adicionada`);

        window.location.reload();
    } catch (error) {
        console.error('Não foi possiver cadastrar disciplina', error);
    }
})

formTurma.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:8000/api/turma/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nome: inputNome.value,
                turno: selectTurno.value,
                disciplinas: ["Fisica2", "Geografia"]
            })
        })
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        alert(`Turma ${inputNome.value} adicionada!`);

        window.location.reload();
    } catch (error) {
        console.error('Não foi possiver cadastrar turma', error);
    }
})

formCoord.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:8000/api/coordenador/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nome: inputNome.value,
                email: inputEmail.value,
                senha: inputSenha.value
            })
        })
        if (!response.ok) {
            throw new Error(`Erro ao enviar user: ${response.status}`);
        }
        const errorResponse = await response.text();
        console.error('Resposta de erro:', errorResponse);
        alert(`Coordenador ${inputNome.value} Adicionado!`);

        window.location.reload();
    } catch (error) {
        console.error('Não foi possiver cadastrar coordenador', error);
    }
})

function signout() {
    localStorage.removeItem('token');

    window.location.href = '../index.html';
}