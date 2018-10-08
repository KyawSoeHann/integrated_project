var express = require('express');
var app = express();
var data = require('./model.js');
var port = 2500;
app.set('view engine', 'pug')


//main page
app.get('/hello',(req,res)=>{ 
    res.render('index',{});
});

//data from hardware
app.post('/postdata',function(req,res){
    initial = req.query.initial;    
    number = req.query.number;
    day = req.query.day;
    month = req.query.month;
    year = req.query.year;
    hour = req.query.hour;
    minute = req.query.minute;
    second = Number(req.query.second);
    data.insertData(initial,number,day,month,year,hour,minute,second,res);
});

//ajax request
app.get('/getdata',function(req,res){
    var initial = req.query.initial;
    var number = req.query.number;
    var day = req.query.day;
    var month = req.query.month;
    var year = req.query.year;

    data.getData(initial,number,day,month,year,res);
});

app.get('/getbydate',function(req,res){
    var day = req.query.day;
    var month = req.query.month;
    var year = req.query.year;

    data.getData("","",day,month,year,res);
});


app.listen(port,"0.0.0.0");
console.log("Server is running at port :"+port);
