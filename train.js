// Initialize firebase 
var config = {
    apiKey: "AIzaSyA2frNl4lb1R3ybEZzixmXWExVpKf-VR4M",
    authDomain: "train-scheduler-faed5.firebaseapp.com",
    databaseURL: "https://train-scheduler-faed5.firebaseio.com",
    projectId: "train-scheduler-faed5",
    storageBucket: "",
    messagingSenderId: "800563891519"
};
firebase.initializeApp(config);

var trainDb = firebase.database();

//When submit button is pressed, data is added to firebase
$(".btn").on("click",(function(){
	event.preventDefault();
//Capture entered data
	var trainName = $("#trainName").val().trim();
	var destination = $("#destination").val().trim();
	var firstTime = $("#time").val().trim();
	var freq = $("#freq").val().trim();
//Push entered data to firebase
	trainDb.ref('/trains').push({
		"trainName": trainName,
		"destination": destination,
		"firstTime": firstTime,
		"frequency": freq,
	});
//Clear submit area after data has been stored
	$("#trainName").val("");
	$("#destination").val("");
	$("#time").val("");
	$("#freq").val("");
}));

//When page is loaded, add everything in database to the table on top of the page. When new data is added by user, add new data to table.
trainDb.ref('/trains').on("child_added", function(trainSnap, indx){
	$(".tdTrainName").append(trainSnap.val().trainName, "<br>");
	$(".tdDestination").append(trainSnap.val().destination, "<br>");
	$(".tdFrequency").append(trainSnap.val().frequency, "<br>");

// initTime is provided in military time HH:mm	
	var initTime = trainSnap.val().firstTime;
	var hours = initTime[0].toString()+initTime[1].toString();
	var minutes = initTime[3].toString()+initTime[4].toString();

//xStartOfDay is the start of today in X format
	var xStartOfDay = parseFloat(moment().startOf("day").format("X"));

//xCurrentTime is the current time in X format
	var xCurrentTime = parseFloat(moment().format("X"));

//xInitTrain is the first train time in X format
	var xInitTrain = parseFloat(moment().startOf("day").add(hours,"hours").add(minutes,"minutes").format("X"));
//Need to find out how many minutes to next train
	var frequency = trainSnap.val().frequency;
	freq = parseFloat(frequency);
	var minNextTrain = freq - (( (xCurrentTime-xInitTrain)/60 )%freq);
	minNextTrain = Math.round(minNextTrain);
	var nextArrival = moment().add(minNextTrain,"minutes").format("hh:mm A");

//Complete table entry by adding Next Arrival and Minutes Away
	$(".tdNextArrival").append(nextArrival, "<br>");
	$(".tdMinutesAway").append(minNextTrain, "<br>");









//	var xInitTime = moment(initTime).format("X");
//	console.log(xInitTime);
//	var xcurrentTime = moment().format("X");
//	console.log(xcurrentTime);





//	console.log(moment());
//	var initTrainTime = moment(firstTime).format("HH MM");
//	console.log(initTrainTime);
//	var currentTime = moment().format("HH MM");
//	console.log(currentTime);
//	var difference = initTrainTime.diff(currentTime);
//	console.log(difference);
});

//Set up click event for submit button
//$(".btn").click(function(){
//	event.preventDefault();
//	var trainName = $("#trainName").val().trim();
//	var destination = $("#destination").val().trim();
//	var firstTime = $("#time").val().trim();
//	var freq = $("#freq").val().trim();
//Add new train info to table on top of page	
//	$(".tdTrainName").append(trainName);
//	$(".tdDestination").append(destination);
//	$(".tdFrequency").append(freq);
//Save new schedule data to firebase
//	saveSchedule(trainName, destination, firstTime, freq);
//});

//var newRef;
//function saveSchedule(trainName, destination, firstTime, freq){
//	var newTrainSchedule = trainSchedule.push();
//	newTrainSchedule.set({
//	newRef = trainSchedule.ref().push({
//		trainName: trainName,
//		destination: destination,
//		firstTime: firstTime,
//		frequency: freq,
//	});

//}



