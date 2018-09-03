fetch('http://localhost:4000/aa', {
    // 使用get请求访问URL
    method: 'get'
}).then(function(response){
    // 成功
}).catch(function(err){
    // 出问题了
})
fetch('http://localhost:4000/bb', {
    method: 'post',
    headers: {
        'auth': '1234',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name:'dean',
        login:'dean123'
    })
}).then(function(data){
    console.log('Request success: ', data)
}).catch(function(error){
    console.log('Request failure: ', error)
})