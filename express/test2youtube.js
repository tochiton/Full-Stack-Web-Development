var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.set('views engine','ejs');
//app.set('views', path.join(__dirname,'views'));

app.use(express.static('views'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var todoItems = [
      {id: 1, desc: 'foo'},
      {id: 2, desc: 'bar'},
      {id: 3, desc: 'baz'}
]
app.get('/', function (req, res) {
   res.render('index', {
      title:'My App',
      items: todoItems
   });

});

app.post('/add', function (req, res) {
    
   var newItem = req.body.newItem;
   console.log(newItem);
})


app.listen(1337, function () {
   console.log('ready on port 1337');
});








