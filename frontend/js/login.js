const formLogin = document.querySelector('#login-form');

formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    const inputEmail = document.querySelector('#input-email');
    const inputSenha = document.querySelector('#input-senha');

    try {
        const response = await fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                email: inputEmail.value,
                senha: inputSenha.value
            })
        })
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);

            if (data.user.role === 'Coordenador') {
                    window.location.href = './coordenador/home.html';
                } else {
                    window.location.href = './professor/home.html';
            }
        } else {
            alert('Senha ou email inválidos');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});