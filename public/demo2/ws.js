// 缓存的名称
var cacheName = 'helloWorld';
// 进入Service Worker 的安装事件
self.addEventListener('install', event => {
    event.waitUntil(
        // 使用指定的缓存名称来打开缓存
        caches.open(cacheName)
            // 把JavaScript和图片文件添加到缓存中
            .then(cache => cache.addAll([
                './bg2.jpg'
            ]))
    )
})
// 添加fetch事件的事件监听器
self.addEventListener('fetch', function (event) {
    event.respondWith(
        // 检查传入的请求URL是否匹配，当前缓存中存在的任何内容
        caches.match(event.request)
            .then(function (response) {
                // 如果有response并且它不是未定义的或空的，就将它返回
                if(response) {
                    return response;
                }
                // 否则，只是如往常一样继续，通过网络获取预期的资源
                return fetch(event.request);
            })
    )
})