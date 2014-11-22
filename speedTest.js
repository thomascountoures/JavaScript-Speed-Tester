/* Create SpeedTest constructor function
-------------------------------------------------- */

function SpeedTest(testFunction, testParams, repetitions) {
	this.testFunction = testFunction;
	this.testParams = testParams;
	this.repetitions = repetitions || 10000;
	this.averageTime = 0;
}

/* Add common method to prototype for inheritance
-------------------------------------------------- */

SpeedTest.prototype = {
	startTest: function(displayElement) {
		var beginTime, 
			endTime, 
			sumTimes = 0,
			message;
		for(var i = 0, x = this.repetitions; i < x; i++) {
			beginTime = +new Date();
			this.testFunction(this.testParams);
			endTime = +new Date();
			sumTimes += endTime - beginTime;
		}
		this.average = sumTimes / this.repetitions;
		message = "Average time for " + this.repetitions + " repetitions: " + '<span class="time">' + this.average + "ms</span>";
		displayElement ? displayElement.innerHTML = message : false;
		return console.log(message);
	} //startTest
}

/* Create test parameters - combine two arrays into a single array
-------------------------------------------------- */

var firstArray = [1,2,3],
	secondArray = ["one", "two", "three"],
	combinedArray = [firstArray, secondArray];


/* Simple Test
-------------------------------------------------- */

var testFunction = function(arrayList) {
	for(var i = 0, x = arrayList[0].length; i < x; i++) {

		(arrayList[0][i]) ? function() {
											arrayList[1].push(arrayList[0][i]);

									  	}()
									  :
									  false;


	}
	return arrayList;
}

/* Loop Test
-------------------------------------------------- */

function loopTest(arrayList) {

	var x = arrayList[0].length;
	
	for (var i = 0; i < x; i++) {
		(arrayList[0]) ? function() {
							(arrayList[i]) ? arrayList[1].push(arrayList[0][i]) : false;
						}()
						:
						false;
	}

	return arrayList;

}

/* jQuery Test
-------------------------------------------------- */

function jqueryTest(swordList) {

	if(swordList) {

		function Armor() {}	
		function Sword(name) {
			this.name = name;
		}

		var kingArthur = {"name" : "Arthur"},
			alabaster = {"name" : "Alabaster"},
			bravelot = {"name" : "Bravelot"};

		Armor.prototype = {
			"distributor": "Middle Earth"
		}

		Sword.prototype = {
			"distributor": "Moria"
		}

		var chainMail = new Armor(),
			sting = new Sword("Sting"),
			biggoron = new Sword("Biggoron"),
			master = new Sword("Master"),
			knights = [kingArthur, alabaster, bravelot];

		swordList.push(sting);
		swordList.push(biggoron);
		swordList.push(master);
		//console.log(swordList);
		for(var i = 0, paramLength = swordList.length, result = []; i < paramLength; i++) {
			for(j = 0, knightsLength = knights.length; j < knightsLength; j++) {
				if(swordList[i] instanceof Sword) {
					knights[i].sword = swordList.splice(j, 1)[0];					
					result.push(knights[i]);
					paramLength--;
					break;
				}
			}
		}

		//console.log(result);
		$(".array").append(result.join(","));

		return result;

	}

}

function classAddingTest() {

	$('.array').addClasses('class1', 'class2', 'class3');

	$('.class2').html("Hello I have a lot of classes!");

	console.log($('.array').hasClass('class2'));

}


/* Display Element
-------------------------------------------------- */

var element = document.getElementById("result");


/* Create new testSpeed object instances
-------------------------------------------------- */

var testSpeed = new SpeedTest(loopTest, combinedArray, 100000);
var testJquery = new SpeedTest(jqueryTest, [], 1);
var testAppend = new SpeedTest(appendArrays, [[1,2,3],[4,5,6]], 10000);
//var classAdding = new SpeedTest(classAddingTest, [], 1);

/* Run Test
-------------------------------------------------- */

//testSpeed.startTest(document.getElementById("result"));
//testJquery.startTest(element);
//classAdding.startTest(element);
testAppend.startTest(element);

