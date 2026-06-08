
//insert new bus route
function insertBusRoute() {

    var routeRegNo = document.getElementById("routeRegNo").value;
    var routeNo = document.getElementById("routeNo").value;
    var routeName = document.getElementById("routeName").value;
    var routetotalDistance = document.getElementById("routetotalDistance").value;
    var routeAvgSpeed = document.getElementById("routeAvgSpeed").value;
    var routeAvgTime = document.getElementById("routeAvgTime").value;
    var routeEffectiveDate = document.getElementById("routeEffectiveDate").value;
    var routeBusType = document.getElementById("routeBusType").value;

    var id = new Date().getTime() + Math.random();
    var round = Math.round(id);
    var curdate = new Date();
    var routeRegNo = "br" + round + curdate;

    firebase.database().ref("routes").child("busRoute").child(routeRegNo).set({

        avgSpeed: routeAvgSpeed,
        avgTime: routeAvgTime,
        busType: routeBusType,
        efectiveDate: routeEffectiveDate,
        routeName: routeName,
        routeNo001: routeNo,
        routeNo002: "init",
        routeNo003: "init",
        routeRegNo: routeRegNo,
        totalDistance: routetotalDistance,



    });

    location.reload();
}

var database = firebase.database();

database.ref("routes").child("busRoute").once("value", function (snapshot) {
    if (snapshot.exists()) {
        var content = '';

        snapshot.forEach(function (childSnapshot) {


            var val = childSnapshot.val();

            content += '<tr>';
            content += '<td>' + val.routeRegNo + '</td>';
            content += '<td>' + val.routeNo001 + '</td>';
            content += '<td>' + val.routeName + '</td>';
            content += '<td>' + val.totalDistance + '</td>';
            content += '<td>' + val.busType + '</td>';
            content += '<td>' + val.avgSpeed + '</td>';
            content += '<td>' + val.avgTime + '</td>';
            content += '<td>' + val.efectiveDate + '</td>';
            content += '<td><a href="#" class="nav-link" data-toggle="modal"data-target="#update-out-bus-route"><button type="button" class="btn btn-outline-warning edits_btn">Edit</button></td>';
            content += '<td><a href="#" class="nav-link" data-toggle="modal"data-target="#delete-out-bus-route"><button type="button" class="btn btn-outline-danger del_btn">Delete</button></td>';
            content += '</tr>';

        });


        $('#busRoutesTable').append(content);


    }

});

//DeleteRoute

$("#busRoutesTable").on('click', '.del_btn', function () {
    // get the current row
    var currentRow = $(this).closest("tr");

    var deleteKey = currentRow.find("td:eq(0)").text();
    //var deleteKeyv1 = currentRow.find("td:eq(1)").text();
    //var keyz = "br"+deleteKeyv1
    //window.alert(keyz);
    document.getElementById('deltekeysBusRoute').value = deleteKey;

});

function deleteBusRoute() {


    var timeSlotKey = document.getElementById("deltekeysBusRoute").value;
    firebase.database().ref("routes").child("busRoute").child(timeSlotKey).remove();
    location.reload();
}

//update routes
$("#busRoutesTable").on('click', '.edits_btn', function () {
    // get the current row
    var currentRow = $(this).closest("tr");

    var getRegNo = currentRow.find("td:eq(0)").text();
    var getrouteNo001 = currentRow.find("td:eq(1)").text();
    var getrouteName = currentRow.find("td:eq(2)").text();
    var gettotalDistance = currentRow.find("td:eq(3)").text();
    var getbusType = currentRow.find("td:eq(4)").text();
    var getavgSpeed = currentRow.find("td:eq(5)").text();
    var getavgTime = currentRow.find("td:eq(6)").text();
    var getefectiveDate = currentRow.find("td:eq(7)").text();

    //var data = getTimeSlotKey + "\n" + getRideNo + "\n" + getFrom;
    //alert(data);
    document.getElementById('getRegNo').value = getRegNo;
    document.getElementById("getrouteNo001").value = getrouteNo001;
    document.getElementById("getrouteName").value = getrouteName;
    document.getElementById("gettotalDistance").value = gettotalDistance;
    document.getElementById("getbusType").value = getbusType;
    document.getElementById("getavgSpeed").value = getavgSpeed;
    document.getElementById("getavgTime").value = getavgTime;
    document.getElementById("getefectiveDate").value = getefectiveDate;


});

function editBusRoute() {

    var getRegNo = document.getElementById("getRegNo").value;
    var getrouteNo001 = document.getElementById("getrouteNo001").value;
    var getrouteName = document.getElementById("getrouteName").value;
    var gettotalDistance = document.getElementById("gettotalDistance").value;
    var getbusType = document.getElementById("getbusType").value;
    var getavgSpeed = document.getElementById("getavgSpeed").value;
    var getavgTime = document.getElementById("getavgTime").value;
    var getefectiveDate = document.getElementById("getefectiveDate").value;

    //var searchkey = from + to;

    firebase.database().ref("routes").child("busRoute").child(getRegNo).set({

        routeRegNo: getRegNo,
        routeNo001: getrouteNo001,
        routeName: getrouteName,
        totalDistance: gettotalDistance,
        busType: getbusType,
        avgSpeed: getavgSpeed,
        avgTime: getavgTime,
        efectiveDate: getefectiveDate,

    });

    location.reload();
}

//search
function searchBusRoute() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("routeNoInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("busRoutesTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
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
