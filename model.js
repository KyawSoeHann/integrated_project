var mongojs = require("mongojs");
var db = mongojs('license_plate',['car']);
db.on('error', function (err) {
	console.log('database error', err)
});

db.on('connect', function () {
	console.log('database connected')
});

//  db.car.findOne({initial:"8A"},function(err,result){
//      console.log(result== null);
//  });	

// db.car.update({initial:"4A"},{$set:{number:"4444"}},function(){
// 		console.log("Update Successfully!");
// 	});
function insertData (initial,number,day,month,year,hour,minute,second,res){
	sec = second - 10;
	db.car.findOne({$and:[{initial:initial},{number:number},{day:day},{month:month},{year:year},{hour:hour},{minute:minute},{sec:{$lte:second}},{sec:{$gte:sec}}]},function (err,result) {
		if (result != null){
			db.car.update({initial:initial,number:number,day:day,month:month,hour:hour,minute:minute},{$set:{sec:second}},function(){
				console.log("Update Successfully!");
			});
		}else {
			db.car.insert({initial:initial,number:number,day:day,month:month,year:year,hour:hour,minute:minute,sec:second},function(err,res){
				console.log("Insert Successfully!");
				console.log(res);
			});
		}
		res.status(200).end();
});
}
function getData(initial,number,day,month,year,res){

	db.car.find({initial:initial,number:number,day:day,month:month,year:year},function(err,result){
		console.log(result);
		res.json(result);	
});
}

function getByCarandHour(initial,number,hour,res){
	db.car.find({initial:initial,number:number,hour:hour},function(err,result){
		console.log(result);
		res.json(result);
	});
}

function getByHour(hour,res){
	db.car.find({hour:hour},function(err,result){
		console.log(result);
		res.json(result);
	});
}

function getByDateandHour(day,month,year,hour,res){
	db.car.find({day:day,month:month,year:year,hour:hour},function(err,result){
		console.log(result);
		res.json(result);
	});
}

function getByDate(day,month,year,res){
	db.car.find({day:day,month:month,year:year},function(err,result){
		console.log(result);
		res.json(result);
	});
}

function getFullData(initial,number,day,month,year,hour,res){
	db.car.find({initial:initial,number:number,day:day,month:month,year:year,hour:hour},function(err,result){
		console.log(result);
		res.json(result);
	});
}

function getByCar(initial,number,res){
	db.car.find({initial:initial,number:number},function(err,result){
		console.log("Car only JSON");
		console.log(result);
		res.json(result);
	});
	
}



module.exports.getData = getData;
module.exports.insertData = insertData;
module.exports.getByCar = getByCar;
module.exports.getByCarandHour = getByCarandHour;
module.exports.getByHour = getByHour;
module.exports.getByDateandHour = getByDateandHour;
module.exports.getByDate = getByDate;
module.exports.getFullData = getFullData;
// db.car.findAndModify({query:{initial:"5A"},update:{$set:{number:"9999"}}},function(err,doc,lastErrorObject){
// 	console.log("Update Successfully!");
// });


