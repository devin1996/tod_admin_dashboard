var database = firebase.database();

//Retrieve time slots from the table
database.ref("timeSlots").child("busTime").once("value", function (snapshot) {
    if (snapshot.exists()) {
        var content = '';

        snapshot.forEach(function (childSnapshot) {

            
            var val = childSnapshot.val();
            var timeslotkey = val.timeSlotKey;


            content += '<tr class="data">';
            content += '<td class="inputValue">' + timeslotkey + '</td>';
            content += '<td class="inputValue">' + val.rideNo + '</td>';
            content += '<td class="inputValue">' + val.from + '</td>';
            content += '<td class="inputValue">' + val.to + '</td>';
            content += '<td class="inputValue">' + val.depTime + '</td>';
            content += '<td class="inputValue">' + val.arrTime + '</td>';
            content += '<td><a href="#" class="nav-link" data-toggle="modal"data-target="#update-out-time-slot"><button type="button" class="btn btn-outline-warning edits_btn">Edit</button></td>';
            content += '<td><a href="#" class="nav-link" data-toggle="modal"data-target="#delete-out-time-slot"><button type="button" class="btn btn-outline-danger del_btn">Delete</button></td>';
            content += '</tr>';

        });

        $('#tableTimeSlot').append(content);


    }

});

function timeSlotFromSearch() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("fromSearchTimeSlot");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableTimeSlot");
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

function timeSlotToSearch() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("toSearchTimeSlot");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableTimeSlot");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
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

$("#tableTimeSlot").on('click', '.del_btn', function () {
    // get the current row
    var currentRow = $(this).closest("tr");

    var deleteKey = currentRow.find("td:eq(0)").text();
    document.getElementById('delteKeysTimeSlot').value = deleteKey;

});


$("#tableTimeSlot").on('click', '.edits_btn', function () {
    // get the current row
    var currentRow = $(this).closest("tr");

    var getTimeSlotKey = currentRow.find("td:eq(0)").text();
    var getRideNo = currentRow.find("td:eq(1)").text();
    var getFrom = currentRow.find("td:eq(2)").text();
    var getTo = currentRow.find("td:eq(3)").text();
    var getDepTime = currentRow.find("td:eq(4)").text();
    var getArrTime = currentRow.find("td:eq(5)").text();

    //var data = getTimeSlotKey + "\n" + getRideNo + "\n" + getFrom;
    //alert(data);
    document.getElementById('eTimeSlotKey').value = getTimeSlotKey;
    document.getElementById("eRideNo").value = getRideNo;
    document.getElementById("eFrom").value = getFrom;
    document.getElementById("eTo").value = getTo;
    document.getElementById("eDepTime").value = getDepTime;
    document.getElementById("eArrTime").value = getArrTime;


});

function insertBusTimeSlot() {

    var from = document.getElementById("inputFrom").value;
    var to = document.getElementById("inputToSlot").value;
    var depTime = document.getElementById("inputDepTime").value;
    var arrTime = document.getElementById("inputArrTime").value;
    var rideNo = document.getElementById("inputRideNo").value;


    var id = new Date().getTime() + Math.random();
    var round = Math.round(id);
    var curdate = new Date();
    var searchkey = from + to;
    var timeSlotKey = "ts" + round + curdate;

    firebase.database().ref("timeSlots").child("busTime").child(timeSlotKey).set({

        timeSlotKey: timeSlotKey,
        arrTime: arrTime,
        depTime: depTime,
        from: from,
        rideNo: rideNo,
        to: to,
        searchkey: searchkey,

    });

}

 //Edit bus time slot
function editBusTimeSlot() {

    var timeSlotKey = document.getElementById("eTimeSlotKey").value;
    var from = document.getElementById("eFrom").value;
    var to = document.getElementById("eTo").value;
    var depTime = document.getElementById("eDepTime").value;
    var arrTime = document.getElementById("eArrTime").value;
    var rideNo = document.getElementById("eRideNo").value;
    var searchkey = from + to;

    firebase.database().ref("timeSlots").child("busTime").child(timeSlotKey).update({

        timeSlotKey: timeSlotKey,
        arrTime: arrTime,
        depTime: depTime,
        from: from,
        rideNo: rideNo,
        to: to,
        searchkey: searchkey,

    });
}


 //Delete bus time slot
 function deleteBusTimeSlotz() {

    var timeSlotKey = document.getElementById("delteKeysTimeSlot").value;
    firebase.database().ref("timeSlots").child("busTime").child(timeSlotKey).remove();
}