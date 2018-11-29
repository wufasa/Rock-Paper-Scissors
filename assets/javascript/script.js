// Initialize Firebase
$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyAnVhTrSVj6qlolguQ4PpLqayzkp4yJnLk",
        authDomain: "rock-paper-scissors-36275.firebaseapp.com",
        databaseURL: "https://rock-paper-scissors-36275.firebaseio.com",
        projectId: "rock-paper-scissors-36275",
        storageBucket: "",
        messagingSenderId: "1013743305464"
    };
    firebase.initializeApp(config);
    // Create a variable to reference the database.
    var database = firebase.database();
    var images =[
        "assets/images/rock.jpg",
        "assets/images/paper.jpg",
        "assets/images/scissors.jpg",
    ]
    console.log("hi");
    //User logs in, User gets stored, Throw an exception when theres more than two users or throw him into the spectator area
    //Player picks, waits on opponents choice,
    //Determine Winner
    //Store data associated with user, on d/c, either wait for new player or join as a spectator?
    //Global variables go here
    var wins = 0;
    var losses= 0;
    var numPlayers =0;
    var player = false;
    // All of our connections will be stored in this directory.
    var connectionsRef = database.ref("/connections");
    var connectedRef = database.ref(".info/connected");

    // When the client's connection state changes...
    connectedRef.on("value", function(snap) {
        // If they are connected..
        if (snap.val()) {
            // Add user to the connections list.
            var con = connectionsRef.push(true);
            // Remove user from the connection list when they disconnect.
            con.onDisconnect().remove();
        }
    });

    // When first loaded or when the connections list changes
    connectionsRef.on("value", function(snap) {
        numPlayers = snap.numChildren();
        if (numPlayers < 2){
            player = true;
        }else{
            //go to spectator area
        }
    });


    // Capture Button Click
    $("#submit").on("click", function(event) {
        event.preventDefault();
        name = $("#userName").val().trim();
        //Push player to database
        database.ref("/users").push({
            name: name,
            wins: wins,
            losses: losses,
            player: player,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $("#battleground").empty();
        createImg();
        createChat();
    });


    database.ref("/users").orderByChild("player").equalTo("true").on("child_added", function(snapshot){
        console.log(snapshot);
    })
    //    if (player){
    //        playerInfo = $("<p>");
    //        playerInfo.text(name);
    //        playerInfo.append("Wins: "+ wins);
    //        playerInfo.append("Losses: "+ losses);
    //        $("#player").append(playerInfo);
    //    }
    function createImg(){
        for (i=0;i<images.length;i++){
            var img = $("<img>").attr("src",images[i]);
            img.addClass("img-responsive");
            img.height(100)
            $(".rps-img").append(img);
        }
    }
    function createChat(){
        
    }
    // When a user joins the players, 
//    database.ref().on("child_added", function(snapshot) {
//        // storing the snapshot.val() in a variable for convenience
//        var sv = snapshot.val();
//        // Change the HTML to reflect
//        var row = $("<tr>");
//        row.append($("<td>" + sv.name + "</td>"));
//        row.append($("<td>" + sv.role + "</td>"));
//        row.append($("<td>" + sv.startDate + "</td>"));
//        //append months worked, output 1992-03-21
//        var monthsWorked = moment(sv.startDate,"YYYYMMDD").fromNow();
//        console.log(monthsWorked);
//        row.append($("<td>" + sv.startDate + "</td>"));
//        row.append($("<td>" + sv.monthlyRate + "</td>"));
//        //append total billed
//        //        var totalBill = monthlyRate * monthsWorked;
//        //        row.append($("<td>" + totalBill  + "</td>"))
//        $(".table-body").append(row);
//
//        // Handle the errors
//    }, function(errorObject) {
//        console.log("Errors handled: " + errorObject.code);
//    });
})

////////////////////////////
//var connectedRef = database.ref(".info/connected");
//database.ref("/bidderData").on("value", function(snapshot) {
//
//    // If Firebase has a highPrice and highBidder stored (first case)
//    if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {
//
//        // Set the local variables for highBidder equal to the stored values in firebase.
//        highBidder = snapshot.val().highBidder;
//        highPrice = parseInt(snapshot.val().highPrice);
//
//        // change the HTML to reflect the newly updated local values (most recent information from firebase)
//        $("#highest-bidder").text(snapshot.val().highBidder);
//        $("#highest-price").text("$" + snapshot.val().highPrice);
//
//        // Print the local data to the console.
//        console.log(snapshot.val().highBidder);
//        console.log(snapshot.val().highPrice);
//    }
//
//    // Else Firebase   doesn't have a highPrice/highBidder, so use the initial local values.
//    else {
//
//        // Change the HTML to reflect the local value in firebase
//        $("#highest-bidder").text(highBidder);
//        $("#highest-price").text("$" + highPrice);
//
//        // Print the local data to the console.
//        console.log("local High Price");
//        console.log(highBidder);
//        console.log(highPrice);
//    }
//
//    // If any errors are experienced, log them to console.
//}, function(errorObject) {
//    console.log("The read failed: " + errorObject.code);
//});
//
//// --------------------------------------------------------------
//
//// Whenever a user clicks the submit-bid button
//$("#submit-bid").on("click", function(event) {
//    event.preventDefault();
//
//    // Get the input values
//    var bidderName = $("#bidder-name").val().trim();
//    var bidderPrice = parseInt($("#bidder-price").val().trim());
//
//    // Log to console the Bidder and Price (Even if not the highest)
//
//
//    if (bidderPrice > highPrice) {
//
//        // Alert
//        alert("You are now the highest bidder.");
//
//        // Save the new price in Firebase
//        database.ref("/bidderData").set({
//            highBidder: bidderName,
//            highPrice: bidderPrice
//        });
//
//        // Log the new High Price
//        console.log("New High Price!");
//        console.log(bidderName);
//        console.log(bidderPrice);
//
//        // Store the new high price and bidder name as a local variable (could have also used the Firebase variable)
//        highBidder = bidderName;
//        highPrice = parseInt(bidderPrice);
//
//        // Change the HTML to reflect the new high price and bidder
//        $("#highest-bidder").text(bidderName);
//        $("#highest-price").text("$" + bidderPrice);
//
//    }
//    else {
//
//        // Alert
//        alert("Sorry that bid is too low. Try again.");
//    }
//});
