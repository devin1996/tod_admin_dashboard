var firebaseConfig = {
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
firebase.analytics();
// const  db = require('../db/firebaseconfigure.js');

function routeInsert() {
  var routeRegNo = document.getElementById("routeRegNo").value;

  firebase.database().ref("bus_roots").child(routeRegNo).set({
    al:{
    routeRegNo: document.getElementById("routeNo").value,
      routeNo: document.getElementById("routeNo").value,
    routeName: document.getElementById("routeName").value
    }
  });
}