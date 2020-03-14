var firebaseConfig =
{
    apiKey: "AIzaSyDVSNwiJxw-godBSv-gzFzYgNUXZU81ksY",
    authDomain: "ptms-4b687.firebaseapp.com",
    databaseURL: "https://ptms-4b687.firebaseio.com",
    projectId: "ptms-4b687",
    storageBucket: "ptms-4b687.appspot.com",
    messagingSenderId: "1028667957586",
    appId: "1:1028667957586:web:698a3ac97b71487e131a8b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth.Auth.Persistence.LOCAL;


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


$("#btn-logout").click(function () {
    firebase.auth().signOut();
});

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

$("#btn-update").click(function () 
{
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var gender = $("#confirmPassword").val();
    var phone = $("#phone").val();
    var city = $("#city").val();
    var address = $("#address").val();
    var bio = $("#bio").val();

    var rootRef = firebase.database().ref().child("Admin");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if (firstName != "" && lastName != "" && gender != "" && phone != "" && city != "" && address != "" && bio != "") 
    {
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

        usersRef.set(userData, function(error) 
        {
            if(error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                window.alert("Message: " + errorMessage);

            }
            else {
                window.location.href = "MainPage.html";
            }
        });
    }
    else {
        window.alert("Form is Incomplete. Fill out all the fields");
    }

});

$("#btn-test").click(function () {
    var name = $("#name").val();

    var rootRef = firebase.database().ref().child("Admin");
    // var userID = firebase.auth().currentUser.uid;
    // var usersRef = rootRef.child(userID);
    var userData =
    {
        "name": name,
    }

    rootRef.set(userData);
    window.location.href = "index.html";
});

