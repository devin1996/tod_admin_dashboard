
var database = firebase.database();

// database.ref("review").child("reviewBus").once("value", function (snapshot) {
//     if (snapshot.exists()) {
//         var content = '';

//         snapshot.forEach(function (childSnapshot) {


//             var val = childSnapshot.val();

//             content += '<tr>';
//             content += '<td>' + val.qrValue + '</td>';
//             content += '<td>' + val.userPhone + '</td>';
//             content += '<td>' + val.reviewIssue + '</td>';
//             content += '<td>' + val.reviewDate + '</td>';
//             content += '<td>' + val.reviewTime + '</td>';
//             content += '</tr>';

//         });


//         $('#table1').append(content);


//     }

// });

const reviewRef = database.ref("review").child("reviewBus");

// Task 4 ------------------------------------------

reviewRef.on("value",

    (snapshot) => {
        const listTableBody = document.getElementById("list-table-review");

        // clear all the table rows first
        listTableBody.textContent = "";

        snapshot.forEach((child) => {
            issue = child.val();
            //console.log(issue);
            var row = document.createElement("tr");
            var x = "hi";

            row.innerHTML = "<td>" + x + "</td><td>" + issue.qrValue + "</td><td>" +
                issue.userPhone + "</td><td>" + issue.reviewIssue + "</td><td>" +
                 issue.reviewDate + "</td><td>" + issue.reviewTime + "</td><td>" ;
            listTableBody.append(row);
        });

    },

    (error) => {
        console.log("Error: " + error.code);
    }

);