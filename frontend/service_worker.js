const CACHE_NAME = 'appCache-cache-v1';
const urlsToCache = [
    '/',
    '/frontend/index.html',
    '/frontend/coordenador/registros.html',
    '/frontend/professor/conceitos.html',
    '/frontend/professor/comunicacao.html',
    '/frontend/styles.css',
    '/frontend/app.js',
    '/frontend/css/comunicados.css',
    '/frontend/css/conceitos.css',
    '/frontend/css/registros.css',
    '/frontend/js/comunicados.js',
    '/frontend/js/registros.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Evento de instalação do Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Instalando e cacheando arquivos...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => console.log('Arquivos cacheados com sucesso!'))
                    .catch(err => console.error('Erro ao cachear arquivos:', err));
            })
    );
});

// Evento de ativação (usado para atualizar o cache)
self.addEventListener('activate', event => {
    console.log('Service Worker: Ativado!');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Limpando cache antigo:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Evento de busca (fetch)
self.addEventListener('fetch', event => {
    console.log('Service Worker: Buscando:', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna do cache, ou faz uma requisição à rede
                return response || fetch(event.request)
                    .then(fetchResponse => {
                        // Aqui você pode escolher armazenar a resposta em cache, se desejar
                        return fetchResponse;
                    });
            })
            .catch(() => {
                console.error('Falha ao buscar o recurso:', event.request.url);
            })
    );
});
