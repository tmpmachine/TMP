L = console.log;
let cacheVersion = '6.4011';
let cacheItem = 'codetmp-'+cacheVersion;

self.addEventListener('message', function(e) {
  if (e.data.action == 'skipWaiting') {
    self.skipWaiting();
  } else if (e.data && e.data.type == 'extension' && e.data.name !== null && e.data.name.length > 0) {
    cacheExtension(e); 
  }
});

self.addEventListener('install', function(event) {

  let urls = [
    '/',
    '/style.css',
    '/ace/theme-codetmp.js',
    '/ace/theme-github.js',
    '/ace/mode-html.js',
    '/ace/mode-json.js',
    '/ace/mode-css.js',
    '/ace/mode-javascript.js',
    '/ace/worker-html.js',
    '/ace/worker-json.js',
    '/ace/worker-css.js',
    '/ace/worker-javascript.js',
    '/ace/ext-searchbox.js',
    '/ace/ext-prompt.js',

    '/images/128.png',
    '/images/128ap.png',
    '/images/192.png', 
    '/images/google/1x/btn_google_signin_dark_normal_web.png',
    '/images/google/1x/btn_google_signin_dark_focus_web.png',
    '/images/google/1x/btn_google_signin_dark_pressed_web.png',

    '/require/plate.js',
    '/require/o.js',
    '/require/auth2helper.js',
    '/require/lsdb.js',
    '/require/keyboard.js',
    '/require/odin.js',
    '/require/oblog.js',
    '/require/aww.js',

    '/js/git.js',
    '/js/template.js',
    '/js/preview.js',
    '/js/ux.js',
    '/js/file-manager.js',
    '/js/drive.js',
    '/index.js',
    
    '/ace/ace.js',
    '/fonts/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  ];
 
  event.waitUntil(Promise.all([
    caches.open(cacheItem).then(function(cache) {
      return cache.addAll(urls);
    }),
  	self.skipWaiting(),
  ]));  
});

self.addEventListener('activate', function(e) {
  e.waitUntil(Promise.all([
    caches.keys().then(function(c) {
      c.map(function(cname) {
        if (!cname.endsWith(cacheVersion))
          caches.delete(cname);
      });
    }),
  	self.clients.claim(),
  ]));
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(resp) {
      if (resp)
        return resp;
      
      return fetch(e.request).then(function(r) {
        return r;
      }).catch(function() {
        console.error('Check connection.');
      });
    })
  );
});

function cacheExtension(e) {
  	e.waitUntil(Promise.all([
      caches.open(cacheItem).then(function(cache) {
        return cache.addAll(e.data.files);
      }),
      e.source.postMessage({ 
      	name: e.data.name, 
      	type: e.data.type,
      }),
    ]));
}
