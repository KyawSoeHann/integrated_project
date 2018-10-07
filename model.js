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

	if (initial == "" && number == ""){
		db.car.find({day:day,month:month,year:year},function(err,result){

			res.json(result);
		});
	}else {
		db.car.find({initial:initial,number:number,day:day,month:month,year:year},function(err,result){

			res.json(result);
		});
	}


}


module.exports.getData = getData;
module.exports.insertData = insertData;
// db.car.findAndModify({query:{initial:"5A"},update:{$set:{number:"9999"}}},function(err,doc,lastErrorObject){
// 	console.log("Update Successfully!");
// });


