var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var route = require('./routes/route');
var mongoConn = require('./services/mongo-conn');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/')));



route.setRoutes(app);

app.listen(3000, function (){
  console.log('App listen to port 3000!');
  mongoConn.start('mongodb://localhost:27017/liyu')
});


module.exports = app;
