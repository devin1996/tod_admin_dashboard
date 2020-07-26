
var database = firebase.database();

database.ref("report").child("reportBus").once("value", function (snapshot) {
    if (snapshot.exists()) {
        var content = '';

        snapshot.forEach(function (childSnapshot) {


            var val = childSnapshot.val();

            content += '<tr>';
            content += '<td>' + val.qrValue + '</td>';
            content += '<td>' + val.userPhone + '</td>';
            content += '<td>' + val.reportIssue + '</td>';
            content += '<td>' + val.reportDate + '</td>';
            content += '<td>' + val.reportTime + '</td>';
            content += '</tr>';

        });


        $('#table1').append(content);


    }

});