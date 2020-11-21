//Insert New Company
function insertNewCompany() {

    var companyRegNo = document.getElementById("comRegNoNew").value;
    var companyMobileNo = document.getElementById("comTelNo").value;

    var id = new Date().getTime() + Math.random();
    var round = Math.round(id);
    var curdate = new Date();

    var companyRandomKey = "bc" + companyRegNo + round + curdate;

    //alert(companyRegNo);

    firebase.database().ref("Company").child("busCompany").child(companyMobileNo).set({

        companyRandomKey: companyRandomKey,
        companyRegNo: document.getElementById("comRegNoNew").value,
        companyName: document.getElementById("comName").value,
        comOwnerName: document.getElementById("comOwnerName").value,
        comOwnerNIC: document.getElementById("comOwnerNIC").value,
        comEmail: document.getElementById("comEmail").value,
        comAddress: document.getElementById("comAddress").value,
        comTelNo: document.getElementById("comTelNo").value,
        comEffDate: document.getElementById("comEffDate").value,
        comPwd: document.getElementById("comPwd").value,

    });

    location.reload();
}

//Read Current Companies
var database = firebase.database();

database.ref("Company").child("busCompany").once("value", function (snapshot) {
    if (snapshot.exists()) {
        var content = '';

        snapshot.forEach(function (childSnapshot) {


            var val = childSnapshot.val();
            var companyRandomKey = val.comTelNo;


            content += '<tr class="data">';
            content += '<td class="inputValue">' + companyRandomKey + '</td>';
            content += '<td class="inputValue">' + val.companyRegNo + '</td>';
            content += '<td class="inputValue">' + val.companyName + '</td>';
            content += '<td class="inputValue">' + val.comAddress + '</td>';
            content += '<td class="inputValue">' + val.comTelNo + '</td>';
            content += '<td class="inputValue">' + val.comEmail + '</td>';
            content += '<td class="inputValue">' + val.comOwnerName + '</td>';
            content += '<td class="inputValue">' + val.comOwnerNIC + '</td>';
            content += '<td><a href="#" class="nav-link" data-toggle="modal"data-target="#update-com"><button type="button" class="btn btn-outline-warning edits_btn">Edit</button></td>';
            content += '<td><a href="#" class="nav-link" data-toggle="modal"data-target="#delete-bus-com"><button type="button" class="btn btn-outline-danger del_btn">Delete</button></td>';
            content += '</tr>';

        });

        $('#tableBusCompany').append(content);


    }

});

//Delete current companies
$("#tableBusCompany").on('click', '.del_btn', function () {
    // get the current row
    var currentRow = $(this).closest("tr");

    var deleteKey = currentRow.find("td:eq(0)").text();
    document.getElementById('delteBusCompanykeys').value = deleteKey;

});

function deleteBusCompany() {

    var timeSlotKey = document.getElementById("delteBusCompanykeys").value;
    firebase.database().ref("Company").child("busCompany").child(timeSlotKey).remove();

    location.reload();
}


//Update current companies

$("#tableBusCompany").on('click', '.edits_btn', function () {
    // get the current row
    var currentRow = $(this).closest("tr");

    var companyRandomKey = currentRow.find("td:eq(0)").text();
    var comRegNo = currentRow.find("td:eq(1)").text();
    var upComName = currentRow.find("td:eq(2)").text();
    var upComMobile = currentRow.find("td:eq(4)").text();
    var upComEmail = currentRow.find("td:eq(5)").text();
    var upComOwnName = currentRow.find("td:eq(6)").text();
    var upComNIC = currentRow.find("td:eq(7)").text();
    var upComAdd = currentRow.find("td:eq(3)").text();

    document.getElementById('companyRandomKey').value = companyRandomKey;
    document.getElementById('comRegNo').value = comRegNo;
    document.getElementById('upComName').value = upComName;
    document.getElementById("upComMobile").value = upComMobile;
    document.getElementById("upComEmail").value = upComEmail;
    document.getElementById("upComOwnName").value = upComOwnName;
    document.getElementById("upComNIC").value = upComNIC;
    document.getElementById("upComAdd").value = upComAdd;

});

function updateBusCompany() {

    //var companyRandomKey = document.getElementById('companyRandomKey').value;
    //var comRegNo = document.getElementById('comRegNo').value;
    var upComName = document.getElementById("upComName").value;
    var upComMobile = document.getElementById("upComMobile").value;
    var upComEmail = document.getElementById("upComEmail").value;
    var upComOwnName = document.getElementById("upComOwnName").value;
    var upComNIC = document.getElementById("upComNIC").value;
    var upComAdd = document.getElementById("upComAdd").value;

    firebase.database().ref("Company").child("busCompany").child(upComMobile).update({

        companyName: upComName,
        comOwnerName: upComOwnName,
        comOwnerNIC: upComNIC,
        comEmail: upComEmail,
        comAddress: upComAdd,
        comTelNo: upComMobile,
    });

    location.reload();
}

//search bus company
function searchBusCompany() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchBusCompany");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableBusCompany");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
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

//Request State

const companyReqRef = firebase.database().ref('companyrequest/');

companyReqRef.on("value",

    (snapshot) => {
        const listTableBody = document.getElementById("list-table-com-request");

        // clear all the table rows first
        listTableBody.textContent = "";

        snapshot.forEach((child) => {
            issue = child.val();
            //console.log(issue);
            var row = document.createElement("tr");

            row.innerHTML = "<td>" + issue.regKey + "</td><td>" + issue.regNo + "</td><td>" +
                issue.date + "</td><td>" + issue.mobileNo + "</td><td>" +
                issue.reqType + "</td><td>" + issue.description + "</td><td>" +


                "<select onchange='updateIssue(\"" + child.regKey + "\", this.value)'>" +
                "<option value='Approved'" + (issue.statement == "Approved" ? " selected" : "") + ">Approved</option>" +
                "<option value='Rejected'" + (issue.statement == "Rejected" ? " selected" : "") + ">Rejected</option>" +
                "</select>"

                + "</td>";
            listTableBody.append(row);
        });

    },

    (error) => {
        console.log("Error: " + error.code);
    }

);