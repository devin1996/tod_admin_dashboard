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
        result.catch(function(error){
            var errorCode =error.code;
            var errorMessage = error.message;
            
            console.log(errorCode);
            console.log(errorMessage);

            window.alert("Message: "+errorMessage);
        });
    }
    else {
        window.alert("Form is Incomplete. Please fill out all fields.");
    }
});

$("#btn-logout").click(function () {
    firebase.auth().signOut();
});