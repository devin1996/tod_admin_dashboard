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

function searchPassenger() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchPassenger");
    filter = input.value.toUpperCase();
    table = document.getElementById("passengerTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}

////////////////////////////////////////////////////////////////Driver CRUD ///////////////////////////////////////////////////////////////////////////////
//Insert new Driver
function insertNewDriver() {

    var driverMobileNo = document.getElementById("driverMobileNo").value;
    var driverEmail = document.getElementById("driverEmail").value;
    var driverName = document.getElementById("driverName").value;
    var driverPwd = document.getElementById("driverPwd").value;
    var driverAddress = document.getElementById("driverAddress").value;
    var driverBusCompany = document.getElementById("driverBusCompany").value;
    var driverBus = document.getElementById("driverBus").value;
    var driverEffectiveDate = document.getElementById("driverEffectiveDate").value;


    var id = new Date().getTime() + Math.random();
    var round = Math.round(id);
    var curdate = new Date();
    // var searchkey = from + to;

    firebase.database().ref("User").child("Driver").child(driverMobileNo).set({

        address: driverAddress,
        email: driverEmail,
        image: "",
        name: driverName,
        password: driverPwd,
        phone: driverMobileNo,
        phoneOrder: driverMobileNo,
        driverEffectiveDate: driverEffectiveDate,
        driverBusCompany: driverBusCompany,
        driverBus: driverBus,


    });

}

//Read Current Drivers
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

            row.innerHTML = "<td>" + x + "</td><td><img width='80px' height='80px' src='" + issue.image + "'/></td><td>" +
                issue.phone + "</td><td>" + issue.name + "</td><td>" +
                issue.email + "</td><td>" + issue.address + "</td><td>" +
                issue.driverEffectiveDate + "</td><td>" + issue.driverBus + "</td><td>" + issue.driverBusCompany +
                '</td><td><a href="#" class="nav-link" data-toggle="modal"data-target="#update-driver"><button type="button" class="btn btn-outline-warning edits_btn">Edit</button></td>'
                + '<td><a href="#" class="nav-link" data-toggle="modal"data-target="#delete-driver"><button type="button" class="btn btn-outline-danger del_btn">Delete</button></td>';
            listTableBody.append(row);
        });

    },

    (error) => {
        console.log("Error: " + error.code);
    }

);

//Delete Curren Driver
$("#driverTable").on('click', '.del_btn', function () {
    // get the current row
    var currentRow = $(this).closest("tr");

    var deleteKey = currentRow.find("td:eq(3)").text();
    document.getElementById('delteKeysTimeSlot').value = deleteKey;

});

function deleteBusDriver() {

    var timeSlotKey = document.getElementById("delteKeysTimeSlot").value;
    firebase.database().ref("timeSlots").child("busTime").child(timeSlotKey).remove();
}


