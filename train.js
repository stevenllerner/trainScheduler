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

$("#currentTime").html(Date());

var trainDb = firebase.database();

//trainDb.ref().on('value',function(snapshot){
//	console.log(snapshot);
//});


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
}));

//When page is loaded, add everything in database to the table on top of the page. When new data is added by user, add new data to table.
trainDb.ref('/trains').on("child_added", function(trainSnap, indx){
//	console.log(trainSnap.val());
//	console.log(trainSnap.val().trainName);
	$(".tdTrainName").append(trainSnap.val().trainName);
	$(".tdDestination").append(trainSnap.val().destination);
	$(".tdFrequency").append(trainSnap.val().frequency);
	var initTime = trainSnap.val().firstTime;
	console.log(initTime);
	var xInitTime = moment(initTime).format("X");
	console.log(xInitTime);
	var xcurrentTime = moment().format("X");
	console.log(xcurrentTime);





//	console.log(moment());
//	var initTrainTime = moment(firstTime).format("HH MM");
//	console.log(initTrainTime);
//	var currentTime = moment().format("HH MM");
//	console.log(currentTime);
//	var difference = initTrainTime.diff(currentTime);
//	console.log(difference);
})

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



