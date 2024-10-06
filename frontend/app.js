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