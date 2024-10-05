const escolhaRegistro = document.getElementById('opcoes-registro');
const forms = document.querySelectorAll('.register-form');
const btnClose = document.getElementById('btn-fechar');
const btnSubmit = document.getElementById('submit-turma');

function mouseEnterList() {
    const listElements = document.getElementsByTagName('p');

    Array.from(listElements).forEach((element) => {
        element.addEventListener('mouseenter', () => {
            element.style.backgroundColor = '#cbd7ff';
        });
        element.addEventListener('mouseleave', () => {
            element.style.backgroundColor = '';
        });
    });
}

let turmas = [];
let disciplinas = [];

// Função para carregar a lista de dados
async function carregarDados() {
    try {
        const responseDisciplinas = await fetch('http://localhost:8000/api/disciplinas/', {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        const responseTurmas = await fetch('http://localhost:8000/api/turmas/', {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        if (!responseTurmas.ok || !responseDisciplinas.ok) {
            throw new Error(`Errors: ${responseTurmas.status}, ${responseDisciplinas.status}`);
        }
        // Ver os dados
        // console.log(await responseDisciplinas.json());
        // console.log(await responseTurmas.json());

        const dataTurmas = await responseTurmas.json();
        const dataDisciplinas = await responseDisciplinas.json();
        turmas = dataTurmas.data.turmas;
        disciplinas = dataDisciplinas.data.disciplinas;

        const listRegister = document.getElementById('lista-registros');
        listRegister.innerHTML = '';

        // Criando lista de turmas
        turmas.forEach(turma => {
            const createLi = document.createElement('p');
            const pName = document.createElement('p');
            const pEmail = document.createElement('p');
            const pTipo = document.createElement('p');

            createLi.className = 'conteudo-lista';
            pName.className = 'nome-registro';
            pEmail.className = 'email-registro';
            pTipo.className = 'tipo-registro';

            pName.innerText = turma.nome;
            pEmail.innerText = '--';
            pTipo.innerText = 'Turma'

            listRegister.appendChild(createLi);
            createLi.appendChild(pName);
            createLi.appendChild(pEmail);
            createLi.appendChild(pTipo);
        })

        disciplinas.forEach(disciplina => {
            const createLi = document.createElement('p');
            const pName = document.createElement('p');
            const pEmail = document.createElement('p');
            const pTipo = document.createElement('p');

            createLi.className = 'conteudo-lista';
            pName.className = 'nome-registro';
            pEmail.className = 'email-registro';
            pTipo.className = 'tipo-registro';

            pName.innerText = disciplina.nome;
            pEmail.innerText = '--';
            pTipo.innerText = 'Disciplina'

            listRegister.appendChild(createLi);
            createLi.appendChild(pName);
            createLi.appendChild(pEmail);
            createLi.appendChild(pTipo);
        })
        mouseEnterList()
        
    } catch (Error) {
        console.error('Erro ao buscar dados');
    }
}



// Abrir pop-up de escolha
function addRegistro() {
    escolhaRegistro.style.visibility = 'visible';
}

// window.addEventListener('load', carregarTurmas);
window.addEventListener('load', carregarDados);

function adicionarSelectDisciplina() {
    const formTurma = document.getElementById('form-turma');
    const createSelect = document.createElement('select');
    const createOption = document.createElement('option');
    const btnAdd = document.getElementById('btn-add-disc');
    const btnDiv = document.getElementById('btn-registrar');

    createOption.value = 'selecione-disciplina';
    createOption.innerText = 'Selecione a disciplina'
    createSelect.name = 'select-disciplina-turma';
    createSelect.id = 'select-disciplina-turma';

    formTurma.insertBefore(createSelect, btnDiv);
    createSelect.appendChild(createOption);
    btnAdd.style.visibility = 'hidden';
}

async function registraDisciplina() {
    try {
        const inputNome = document.getElementsByName('input-nome-disciplina')[0];

        const response = await fetch('http://localhost:8000/api/disciplinas/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: inputNome.value })
        })
    } catch (Error) {
        console.error('Erro ao registrar disciplina')
    }
}

// async function registrarTurma() {
//     try {
//         const inputNome = document.getElementsByName("input-nome-turma")[0];
//         const inputDisciplina1 = document.getElementsByName("input-disciplina-turma")[0].value;
//         const inputDisciplina2 = document.getElementsByName("input-disciplina-turma")[1].value;
//         const inputTurno = document.getElementsByName("input-turno-turma")[0];

//         const response = await fetch('http://localhost:8000/api/turmas/create', {
//             method: 'POST',
//             headers: {
//                 "Contene-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 nome: inputNome.value,
//                 disciplinas: [inputDisciplina1.id, inputDisciplina2.id],
//                 turno: inputTurno.value
//             })
//         })
//         const data = await response.json();
//         console.log("Usuário cadastrado com sucesso: ", data);
//     } catch (Error) {
//         console.error('Erro ao adicionar Aluno')
//     }
// }

// Função para fechar formulário
const closeForm = (idForm) => {
    const idFormulario = document.getElementById(idForm);
    idFormulario.style.visibility = 'hidden';
}

// Abrir form de professor
function OpenFProf() {
    const formProf = document.getElementById('register-professor');

    escolhaRegistro.style.visibility = 'hidden'
    formProf.style.visibility = 'visible';
}

// Abrir form de coordenador
function OpenFCoord() {
    const formCoord = document.getElementById('register-coordenador');

    escolhaRegistro.style.visibility = 'hidden'
    formCoord.style.visibility = 'visible';
}

// Abrir form de aluno
function OpenFAluno() {
    const formAluno = document.getElementById('register-aluno');

    escolhaRegistro.style.visibility = 'hidden'
    formAluno.style.visibility = 'visible';
}

// Abrir form de disciplina
function OpenFDisc() {
    const formDisc = document.getElementById('register-disciplina');

    escolhaRegistro.style.visibility = 'hidden'
    formDisc.style.visibility = 'visible';
}

// Abrir form de turma
function OpenFTurma() {
    const formTurma = document.getElementById('register-turma');

    escolhaRegistro.style.visibility = 'hidden'
    formTurma.style.visibility = 'visible';
}