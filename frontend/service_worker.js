const CACHE_NAME = 'appCache-cache-v1';
const urlsToCache = [
    '/',
    '../index.html',
    '../coordenador/alunos.html',
    '../coordenador/comunicados.html',
    '../coordenador/coordenadores.html',
    '../coordenador/home.html',
    '../coordenador/professores.html',
    '../professor/conceitos.html',
    '../professor/home.html',
    '../professor/comunicacao.html',
    '../styles.css',
    '../app.js',
    '../css/comunicados.css',
    '../css/conceitos.css',
    '../css/registros.css',
    '../css/login.css',
    '../css/turmas.css',
    '../css/disciplinas.css',
    '../js/comunicados.js',
    '../js/alunos.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Durante a fase de instalação, cacheie os recursos estáticos
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          console.log('Cache aberto');
          return cache.addAll(urlsToCache); // Cacheie os arquivos mencionados
        })
    );
  });
  
  // Durante a fase de fetch, sirva os arquivos do cache, se disponíveis
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Se o arquivo estiver no cache, retorne-o, senão faça a requisição normalmente
          return response || fetch(event.request);
        })
    );
  });
  
  // Atualize o Service Worker e limpe os caches antigos
  self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME]; // Mantenha apenas este cache
  
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName); // Delete caches antigos
            }
          })
        );
      })
    );
  });