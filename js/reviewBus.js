
var database = firebase.database();

database.ref("review").child("reviewBus").once("value", function (snapshot) {
    if (snapshot.exists()) {
        var content = '';

        snapshot.forEach(function (childSnapshot) {


            var val = childSnapshot.val();

            content += '<tr>';
            content += '<td>' + val.qrValue + '</td>';
            content += '<td>' + val.userPhone + '</td>';
            content += '<td>' + val.reviewIssue + '</td>';
            content += '<td>' + val.reviewDate + '</td>';
            content += '<td>' + val.reviewTime + '</td>';
            content += '</tr>';

        });


        $('#table1').append(content);


    }

});