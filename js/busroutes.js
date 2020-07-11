
function insertRoute() {
    var routeRegNo = document.getElementById("routeRegNo").value;

    var randomKey = routeRegNo + "rbr";

    firebase.database().ref("routes").child("busRoute").child(randomKey).set({

        routeRegNo: routeRegNo,
        routeNo: document.getElementById("routeNo001").value,
        routeName: document.getElementById("routeName").value,
        totalDistance: document.getElementById("totalDistance").value,
        avgSpeed: document.getElementById("avgSpeed").value,
        avgTime: document.getElementById("avgTime").value,
        efectiveDate: document.getElementById("efectiveDate").value,
        busType: document.getElementById("busType").value


    });
}

var database = firebase.database();

database.ref("routes").child("busRoute").once("value", function (snapshot) {
    if (snapshot.exists()) {
        var content = '';

        snapshot.forEach(function (childSnapshot) {


            var val = childSnapshot.val();

            content += '<tr>';
            content += '<td>' + val.routeRegNo + '</td>';
            content += '<td>' + val.routeNo + '</td>';
            content += '<td>' + val.routeName + '</td>';
            content += '<td>' + val.totalDistance + '</td>';
            content += '<td>' + val.busType + '</td>';
            content += '<td>' + val.avgSpeed + '</td>';
            content += '<td>' + val.avgTime + '</td>';
            content += '<td>' + val.efectiveDate + '</td>';
            content += '</tr>';

        });


        $('#table1').append(content);


    }

});