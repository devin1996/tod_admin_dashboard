function insertBusCompany() {
    var companyRegNo = document.getElementById("companyRegNo").value;

    var companyRandomKey = companyRegNo + "rbr";

    firebase.database().ref("Company").child("busCompany").child(companyRandomKey).set({

        companyRegNo: companyRegNo,
        companyName: document.getElementById("companyName").value,
        companyTelNo: document.getElementById("companyTelNo").value,
        companyRegDate: document.getElementById("companyRegDate").value,


    });
}