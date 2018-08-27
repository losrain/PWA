// 未fetch事件添加事件监听器
self.addEventListener('fetch', function(event) {
    // 检查传入的HTTP请求URL是否请求以.jpg结尾的文件
    if(/\.jpg$/.test(event.request.url)) {
        // 尝试获取hello.png图片，并用它替代请求图片
        event.respondWith(fetch('images/hello.png'))
    }
})