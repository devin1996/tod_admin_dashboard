function insertBus() {

    var busRegNo = document.getElementById("busRegNo").value;
    var busRandomKey = busRegNo + "rbr";

    busCompanyID = document.getElementById("busCompanyID").value;

    firebase.database().ref("Vehicle").child("Bus").child(busCompanyID).child(busRandomKey).set({

        busRegNo: busRegNo,
        busRegDate: document.getElementById("busRegDate").value,
        busManuCompany: document.getElementById("busManuCompany").value,
        busCompanyID: busCompanyID,
        assignedDriverID: document.getElementById("assignedDriverID").value,
        assignedConductorID: document.getElementById("assignedDriverID").value,

    });
}