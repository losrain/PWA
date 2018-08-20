var express = require('express');
var app = express();
app.use(express.static('public'));
app.get('/', function(req, res){
    res.send('hello world');
})
app.listen(4000, function() {
    console.log('this server is running at http://localhost:4000');
});