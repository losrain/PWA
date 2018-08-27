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
                // 复制请求，请求是一个流，只能使用一次
                var requestToCache = event.request.clone();
                // 尝试按照预期发起原始的HTTP请求
                return fetch(requestToCache).then(
                    function(response) {
                        // 如果请求失败或者服务器响应了错误代码，则立即返回错误信息
                        if(!response || response.status !== 200) {
                            return response;
                        }
                        // 再一次复制了响应，因为你需要将其添加到缓存中，而且它还将用于最终返回响应
                        var responseToCache = response.clone();
                        // 打开名称为helloWorld的缓存
                        caches.open(cacheName).then(function(cache) {
                            // 将响应添加到缓存中
                            cache.put(requestToCache, responseToCache);
                        })
                        return response;
                    }
                )
                // 否则，只是如往常一样继续，通过网络获取预期的资源
                return fetch(event.request);
            })
    )
})