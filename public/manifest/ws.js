// 安装当前的service worker而无须重载
self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting())
})
// 立即激活service worker
self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim())
})
// 未fetch事件添加事件监听器
self.addEventListener('fetch', function(event) {
    // 检查传入的HTTP请求URL是否请求以.jpg结尾的文件
    if(/\.png$/.test(event.request.url)) {
        // 尝试获取hello.png图片，并用它替代请求图片
        event.respondWith(fetch('images/hello.png'))
        // event.respondWith('<p>This is a response that comes from your service worker!</p>', {
        //     headers: {'Content-Type': 'text/html'}
        // });
    }
})