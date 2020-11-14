//Admin Login for the system 
$("#btn-login").click(function () {
    var email = $("#email").val();
    var password = $("#password").val();

    if (email != "" && password != "") {
        var result = firebase.auth().signInWithEmailAndPassword(email, password);
        result.catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

            window.alert("Message: " + errorMessage);
        });
    }
    else {
        window.alert("Form is Incomplete. Please fill out all fields.");
    }
});

//Admin Register for the system
$("#btn-signup").click(function () {
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();

    if (email != "" && password != "" && confirmPassword != "") {
        if (password == confirmPassword) {
            var result = firebase.auth().createUserWithEmailAndPassword(email, password);
            result.catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                window.alert("Message: " + errorMessage);
            });
        }
        else {
            window.alert("Password do not match !");
        }

    }
    else {
        window.alert("Form is Incomplete. Please fill out all fields.");
    }
});

//Logout userauth
$("#btn-logout").click(function () {
    firebase.auth().signOut();
});

//password reset userauth
$("#btn-reset-pw").click(function () {

    var auth = firebase.auth();
    var email = $("#email").val();

    if (email != "") {
        auth.sendPasswordResetEmail(email).then(function () {
            window.alert("Email has been sent to you, Please check and verify.");
        })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                window.alert("Message: " + errorMessage);
            });

    }
    else {
        window.alert("Please enter your registered email for account");
    }
});



$("#btn-update").click(function () {
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var gender = $("#gender").val();
    var phone = $("#phone").val();
    var city = $("#city").val();
    var address = $("#address").val();
    var bio = $("#bio").val();

    var rootRef = firebase.database().ref().child("Admin");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if (firstName != "" && lastName != "" && gender != "" && phone != "" && city != "" && address != "" && bio != "") {
        var userData =
        {
            "phone": phone,
            "address": address,
            "bio": bio,
            "firstName": firstName,
            "lastName": lastName,
            "city": city,
            "gender": gender,
        };

        usersRef.set(userData, function (error) {
            if (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                window.alert("Message: " + errorMessage);

            }
            else {
                window.location.href = "admin-home.html";
            }
        });
    }
    else {
        window.alert("Form is Incomplete. Fill out all the fields");
    }

});

//Read Passenger Data
var databaseUserSection = firebase.database();
const passengerRef = databaseUserSection.ref("User").child("Passenger");
const driverRef = databaseUserSection.ref("User").child("Driver");
const connductorRef = databaseUserSection.ref("User").child("Conductor");

// Task 4 ------------------------------------------

passengerRef.on("value",

    (snapshot) => {
        const listTableBody = document.getElementById("list-table-passenger");

        // clear all the table rows first
        listTableBody.textContent = "";

        snapshot.forEach((child) => {
            issue = child.val();
            //console.log(issue);
            var row = document.createElement("tr");
            var x = "hi";

            row.innerHTML = "<td>" + x + "</td><td><img width='128px' height='128px' src='" + issue.image + "'/></td><td>" +
                issue.phone + "</td><td>" + issue.name + "</td><td>" +
                 issue.email + "</td><td>" + issue.address + "</td>";
            listTableBody.append(row);
        });

    },

    (error) => {
        console.log("Error: " + error.code);
    }

);

driverRef.on("value",

    (snapshot) => {
        const listTableBody = document.getElementById("list-table-dri");

        // clear all the table rows first
        listTableBody.textContent = "";

        snapshot.forEach((child) => {
            issue = child.val();
            //console.log(issue);
            var row = document.createElement("tr");
            var x = "hi";

            row.innerHTML = "<td>" + x + "</td><td><img width='128px' height='128px' src='" + issue.image + "'/></td><td>" +
                issue.phone + "</td><td>" + issue.name + "</td><td>" +
                 issue.email + "</td><td>" + issue.address + "</td>";
            listTableBody.append(row);
        });

    },

    (error) => {
        console.log("Error: " + error.code);
    }

);

connductorRef.on("value",

    (snapshot) => {
        const listTableBody = document.getElementById("list-table-con");

        // clear all the table rows first
        listTableBody.textContent = "";

        snapshot.forEach((child) => {
            issue = child.val();
            //console.log(issue);
            var row = document.createElement("tr");
            var x = "hi";

            row.innerHTML = "<td>" + x + "</td><td><img width='128px' height='128px' src='" + issue.image + "'/></td><td>" +
                issue.phone + "</td><td>" + issue.name + "</td><td>" +
                 issue.email + "</td><td>" + issue.address + "</td>";
            listTableBody.append(row);
        });

    },

    (error) => {
        console.log("Error: " + error.code);
    }

);

