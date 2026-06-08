//const busRef = databaseUserSection.ref("vehicle").child("bus");
//const trainRef = databaseUserSection.ref("vehicle").child("train");

var database = firebase.database();
//////////////////////////////////////////////////////////Bus Crud Operations/////////////////////////////////////////////////////////
database.ref("vehicle").child("bus").once("value", function (snapshot) {
    if (snapshot.exists()) {
        var content = '';

        snapshot.forEach(function (childSnapshot) {


            var val = childSnapshot.val();
            var bussearchkey = val.bussearchkey;
            //window.alert(bussearchkey);


            content += '<tr class="data">';
            content += '<td class="inputValue">' + bussearchkey + '</td>';
            content += '<td class="inputValue">' + val.busRegNo + '</td>';
            content += '<td class="inputValue">' + val.busComNo + '</td>';
            content += '<td class="inputValue">' + val.busConNo + '</td>';
            content += '<td class="inputValue">' + val.busDriNo + '</td>';
            content += '<td class="inputValue">' + val.busType + '</td>';
            content += '<td class="inputValue">' + val.busRouteNo + '</td>';
            content += '<td class="inputValue">' + val.busEffDate + '</td>';
            content += '<td class="inputValue">' + val.busModel + '</td>';
            content += '<td><a href="#" class="nav-link" data-toggle="modal"data-target="#update-out-bus"><button type="button" class="btn btn-outline-warning edits_btn">Edit</button></td>';
            content += '<td><a href="#" class="nav-link" data-toggle="modal"data-target="#delete-out-bus"><button type="button" class="btn btn-outline-danger del_btn">Delete</button></td>';
            content += '</tr>';

        });

        $('#busTableDisplay').append(content);


    }

});


//Insert new Conductor
function insertNewBus() {

    var busRegNo = document.getElementById("busRegNo").value;
    var busComNo = document.getElementById("busComNo").value;
    var busDriNo = document.getElementById("busDriNo").value;
    var busConNo = document.getElementById("busConNo").value;
    var busType = document.getElementById("busType").value;
    var busRouteNo = document.getElementById("busRouteNo").value;
    var busModel = document.getElementById("busModel").value;
    var busEffDate = document.getElementById("busEffDate").value;


    var id = new Date().getTime() + Math.random();
    var round = Math.round(id);
    var curdate = new Date();
    var bussearchkey = busRegNo + round + curdate;

    firebase.database().ref("vehicle").child("bus").child(bussearchkey).set({

        busRegNo: busRegNo,
        bussearchkey: bussearchkey,
        busComNo: busComNo,
        busDriNo: busDriNo,
        busConNo: busConNo,
        busType: busType,
        busRouteNo: busRouteNo,
        busModel: busModel,
        busEffDate: busEffDate,


    });

    location.reload();

}


//Delete Current Conductor
$("#busTableDisplay").on('click', '.del_btn', function () {
    // get the current row
    var currentRow = $(this).closest("tr");

    var deleteKey = currentRow.find("td:eq(0)").text();
    document.getElementById('delbtnBus').value = deleteKey;
    //window.alert(deleteKey);

});

function deleteBus() {

    var conDelKey = document.getElementById("delbtnBus").value;
    firebase.database().ref("vehicle").child("bus").child(conDelKey).remove();
    location.reload();
}

//Update Current Conductor

$("#busTableDisplay").on('click', '.edits_btn', function () {
    // get the current row
    var currentRow = $(this).closest("tr");

    var busRegNo = currentRow.find("td:eq(1)").text();
    var bussearchkey = currentRow.find("td:eq(0)").text();
    var busComNo = currentRow.find("td:eq(2)").text();
    var busConNo = currentRow.find("td:eq(3)").text();
    var busDriNo = currentRow.find("td:eq(4)").text();
    var busRouteNo = currentRow.find("td:eq(6)").text();
    var busEffDate = currentRow.find("td:eq(7)").text();

    document.getElementById('busRegNo').value = busRegNo;
    document.getElementById("bussearchkey").value = bussearchkey;
    document.getElementById("busComNo").value = busComNo;
    document.getElementById("busConNo").value = busConNo;
    document.getElementById("busDriNo").value = busDriNo;
    document.getElementById("busRouteNo").value = busRouteNo;
    document.getElementById("busEffDate").value = busEffDate;


});

function updateBus() {

    var busRegNo = document.getElementById("busRegNo").value;
    var bussearchkey = document.getElementById("bussearchkey").value;
    var busComNo = document.getElementById("busComNo").value;
    var busConNo = document.getElementById("busConNo").value;
    var busDriNo = document.getElementById("busDriNo").value;
    var busRouteNo = document.getElementById("busRouteNo").value;
    var busEffDate = document.getElementById("busEffDate").value;


    firebase.database().ref("vehicle").child("bus").child(bussearchkey).update({


        busComNo: busComNo,
        busDriNo: busDriNo,
        busConNo: busConNo,
        busRouteNo: busRouteNo,
        busEffDate: busEffDate,

    });

    location.reload();
}


//Search for the Driver
function searchConductor() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchConInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("conductorTable");
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
