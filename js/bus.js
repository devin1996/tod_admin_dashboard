const busRef = databaseUserSection.ref("vehicle").child("bus");
const trainRef = databaseUserSection.ref("vehicle").child("train");

//////////////////////////////////////////////////////////Bus Crud Operations/////////////////////////////////////////////////////////


busRef.on("value",

    (snapshot) => {
        const listTableBody = document.getElementById("list-table-con");

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
            issue.conEffectiveDate + "</td><td>" + issue.conBus + "</td><td>" + issue.conBusCompany +
                '</td><td><a href="#" class="nav-link" data-toggle="modal"data-target="#update-con"><button type="button" class="btn btn-outline-warning edits_btn">Edit</button></td>'
                + '<td><a href="#" class="nav-link" data-toggle="modal"data-target="#delete-con"><button type="button" class="btn btn-outline-danger del_btn">Delete</button></td>';
            listTableBody.append(row);
        });

    },

    (error) => {
        console.log("Error: " + error.code);
    }

);


//Insert new Conductor
function insertNewConductor() {

    var conMobileNo = document.getElementById("conMobileNo").value;
    var conEmail = document.getElementById("conEmail").value;
    var conName = document.getElementById("conName").value;
    var conPwd = document.getElementById("conPwd").value;
    var conAddress = document.getElementById("conAddress").value;
    var conBusCompany = document.getElementById("conBusCompany").value;
    var conBus = document.getElementById("conBus").value;
    var conEffectiveDate = document.getElementById("conEffectiveDate").value;


    var id = new Date().getTime() + Math.random();
    var round = Math.round(id);
    var curdate = new Date();
    // var searchkey = from + to;

    firebase.database().ref("User").child("Conductor").child(conMobileNo).set({

        address: conAddress,
        email: conEmail,
        image: "",
        name: conName,
        password: conPwd,
        phone: conMobileNo,
        phoneOrder: conMobileNo,
        conEffectiveDate: conEffectiveDate,
        conBusCompany: conBusCompany,
        conBus: conBus,


    });

    location.reload();

}


//Delete Current Conductor
$("#conductorTable").on('click', '.del_btn', function () {
    // get the current row
    var currentRow = $(this).closest("tr");

    var deleteKey = currentRow.find("td:eq(2)").text();
    document.getElementById('conkeydriver').value = deleteKey;
    //window.alert(deleteKey);

});

function deleteBusConductor() {

    var conDelKey = document.getElementById("conkeydriver").value;
    firebase.database().ref("User").child("Conductor").child(conDelKey).remove();
    location.reload();
}

//Update Current Conductor

$("#conductorTable").on('click', '.edits_btn', function () {
    // get the current row
    var currentRow = $(this).closest("tr");

    var upConName = currentRow.find("td:eq(3)").text();
    var upConMobile = currentRow.find("td:eq(2)").text();
    var upConEmail = currentRow.find("td:eq(4)").text();
    var upConAdd = currentRow.find("td:eq(5)").text();
    var upConBus = currentRow.find("td:eq(7)").text();
    var upConBusCom = currentRow.find("td:eq(8)").text();
    var upConEffDate = currentRow.find("td:eq(6)").text();

    document.getElementById('upConName').value = upConName;
    document.getElementById("upConMobile").value = upConMobile;
    document.getElementById("upConEmail").value = upConEmail;
    document.getElementById("upConAdd").value = upConAdd;
    document.getElementById("upConBus").value = upConBus;
    document.getElementById("upConBusCom").value = upConBusCom;
    document.getElementById("upConEffDate").value = upConEffDate;


});

function updateConDriver() {

    var upConName = document.getElementById("upConName").value;
    var upConMobile = document.getElementById("upConMobile").value;
    var upConEmail = document.getElementById("upConEmail").value;
    var upConAdd = document.getElementById("upConAdd").value;
    var upConBus = document.getElementById("upConBus").value;
    var upConBusCom = document.getElementById("upConBusCom").value;
    var upConEffDate = document.getElementById("upConEffDate").value;


    firebase.database().ref("User").child("Conductor").child(upConMobile).update({

        address: upConAdd,
        email: upConEmail,
        name: upConName,
        conEffectiveDate: upConEffDate,
        conBusCompany: upConBusCom,
        conBus: upConBus,

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
