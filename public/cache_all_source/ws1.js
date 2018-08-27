// 缓存的名称
var cacheName = 'latestNews-v1';
// 在安装过程中缓存已知的资源
self.addEventListener('install', event => {
    event.waitUntil(
        // 使用指定的缓存名称来打开缓存
        caches.open(cacheName)
            // 在安装期间打开缓存并储存一组资源进行缓存
            .then(cache => cache.addAll([
                // './js/main.js',
                // './js/article.js',
                // './images/newspaper.svg',
                // './css/site.css',
                // './data/latest.json',
                // './data/data-1.json',
                // './article.html',
                './index.html'
            ]))
    )
})
// 缓存任何获取的新资源
// 监听fetch事件
self.addEventListener('fetch', function (event) {
    event.respondWith(
        // 检查传入的请求URL是否匹配，当前缓存中存在的任何内容
        // ignoreSearch忽略任何查询字符串参数，这样便不会造成任何缓存未命中
        caches.match(event.request, {ignoreSearch: true})
            .then(function (response) {
                // 如果有response并且它不是未定义的或空的，就将它返回
                if(response) {
                    return response;
                }
                // 复制请求，请求是一个流，只能使用一次
                var requestToCache = event.request.clone();
                // 如果没在缓存中找到任何，则发起请求
                return fetch(requestToCache).then(
                    function(response) {
                        // 如果请求失败或者服务器响应了错误代码，则立即返回错误信息
                        if(!response || response.status !== 200) {
                            return response;
                        }
                        // 再一次复制了响应，因为你需要将其添加到缓存中，而且它还将用于最终返回响应
                        var responseToCache = response.clone();
                        // 储存在缓存中，这样便不需要再次发起请求
                        caches.open(cacheName).then(function(cache) {
                            // 将响应添加到缓存中
                            cache.put(requestToCache, responseToCache);
                        })
                        return response;
                    }
                )
                // 否则，只是如往常一样继续，通过网络获取预期的资源
                // return fetch(event.request);
            })
    )
})