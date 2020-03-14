// Your web app's Firebase configuration
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



function insertRoute() {
  var routeRegNo = document.getElementById("routeRegNo").value;

  var randomKey = routeRegNo+"rbr";

  firebase.database().ref("routes").child("busRoutes").child(randomKey).set({

    routeRegNo: routeRegNo,
    routeNo: document.getElementById("routeNo").value,
    routeName: document.getElementById("routeName").value,
    totalDistance: document.getElementById("totalDistance").value,
    avgSpeed: document.getElementById("avgSpeed").value,
    avgTime: document.getElementById("avgTime").value,
    efectiveDate: document.getElementById("efectiveDate").value,
    busType: document.getElementById("busType").value
    

  });
}

