
// //const db = require('../db/test2');
//const db = require('.test2.js');
// Your web app's Firebase configuration
// var firebaseConfig = {
//     apiKey: "AIzaSyDVSNwiJxw-godBSv-gzFzYgNUXZU81ksY",
// authDomain: "ptms-4b687.firebaseapp.com",
// databaseURL: "https://ptms-4b687.firebaseio.com",
// projectId: "ptms-4b687",
// storageBucket: "ptms-4b687.appspot.com",
// messagingSenderId: "1028667957586",
// appId: "1:1028667957586:web:698a3ac97b71487e131a8b"
// };
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();



function writeData(){
    firebase.database().ref("Userz").set({
      al:{
      name: document.getElementById("name").value,
      age: document.getElementById("age").value
    }
    });
  }