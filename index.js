var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));
app.get('/', function(req, res){
    res.send('hello world');
})
app.get('/aa', function(req, res){
    res.json('aaa')
})
app.post('/bb', function(req, res){
    console.log(req.body);
    res.json('bbb')
})
app.listen(4000, function() {
    console.log('this server is running at http://localhost:4000');
});