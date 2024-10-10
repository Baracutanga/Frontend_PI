const ul = document.querySelector('#lista');

async function carregarAlunos() {
    const token = localStorage.getItem('token');
    console.log('Token recuperado:', token);


    try {
        const response = await fetch('http://localhost:8000/api/aluno/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok) {
            throw new Error(`Erro ao buscar alunos ${response.status}`);
        }

        const alunos = await response.json();
        alert(alunos.id);

        // alunos.forEach((aluno) =>{
        //     const newLi = document.createElement('li');
        //     const nomeAluno = document.createElement('div');
        //     const selectAv1 = document.createElement('select')
        //     const newOption = document.createElement('option');
        //     const selectAv2 = document.createElement('select');
        //     const selectMu = document.createElement('select');
        //     const selectMupn = document.createElement('select');
        //     const selectF = document.createElement('select');

        //     newLi.id = aluno.id;

        // })



    } catch (error) {
        console.error('Erro:', error);
    }
}