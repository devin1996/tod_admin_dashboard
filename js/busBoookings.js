var database = firebase.database();

//search

//Read

const rootRef = database.ref("bookingList").child("buses").child("AllConfirmedBookings/");

rootRef.on("value",

    (snapshot) => {
        const listTableBody = document.getElementById("list-table-booking");

        // clear all the table rows first
        listTableBody.textContent = "";

        snapshot.forEach((child) => {
            issue = child.val();
            //console.log(issue);
            var row = document.createElement("tr");
            var x = "hi";

            row.innerHTML = "<td>" + x + "</td><td>" + issue.userMobile + "</td><td>" +
                issue.BookedDate + "</td><td>" + issue.date + "</td><td>" +
                issue.rideNo + "</td><td>" + issue.timeSlotKey + "</td><td>" +
                issue.time + "</td><td>" + issue.arrTime + "</td><td>" +
                issue.depTime + "</td><td>" + issue.from + "</td><td>" +
                issue.to + "</td><td>" + issue.name + "</td><td>" + + issue.payID + "</td><td>" +
                issue.payAmount + "</td><td>" + issue.payNote + "</td><td>" +


                "<select onchange='updateIssue(\"" + child.key + "\", this.value)'>" +
                "<option value='initial'" + (issue.state == "initial" ? " selected" : "") + ">initial</option>" +
                "<option value='approved'" + (issue.state == "approved" ? " selected" : "") + ">approved</option>" +
                "<option value='rejected'" + (issue.state == "rejected" ? " selected" : "") + ">rejected</option>" +
                "</select>"

                + "</td>";
            listTableBody.append(row);
        });

    },

    (error) => {
        console.log("Error: " + error.code);
    }

);


//Search for the Individual User Bookings
function showbookings() {

    const mobilekey = document.getElementById("mobileKeynew").value;


    const rootRefind = database.ref("bookingList").child("confirmedBookings").child(mobilekey).child("busBooking/");


    rootRefind.on("value",

        (snapshot) => {
            const listTableBody = document.getElementById("list-table-booking-ind");

            // clear all the table rows first
            listTableBody.textContent = "";

            snapshot.forEach((child) => {
                issue = child.val();
                //console.log(issue);
                var row = document.createElement("tr");
                var x = "hi";

                row.innerHTML = "<td>" + x + "</td><td>" + issue.userMobile + "</td><td>" +
                    issue.BookedDate + "</td><td>" + issue.date + "</td><td>" +
                    issue.rideNo + "</td><td>" + issue.timeSlotKey + "</td><td>" +
                    issue.time + "</td><td>" + issue.arrTime + "</td><td>" +
                    issue.depTime + "</td><td>" + issue.from + "</td><td>" +
                    issue.to + "</td><td>" + issue.name + "</td><td>" + + issue.payID + "</td><td>" +
                    issue.payAmount + "</td><td>" + issue.payNote + "</td><td>" +


                    "<select onchange='updateIssue(\"" + child.key + "\", this.value)'>" +
                    "<option value='initial'" + (issue.state == "initial" ? " selected" : "") + ">initial</option>" +
                    "<option value='approved'" + (issue.state == "approved" ? " selected" : "") + ">approved</option>" +
                    "<option value='rejected'" + (issue.state == "rejected" ? " selected" : "") + ">rejected</option>" +
                    "</select>"

                    + "</td>";
                listTableBody.append(row);
            });

        },

        (error) => {
            console.log("Error: " + error.code);
        }

    );

}


//Update

function updateIssue(issueKey, newResolvedValue) {
    //alert("update function for issue key: " + issueKey + "newResolveValue: " + newResolvedValue);
    var recordRef = firebase.database().ref("bookingList").child("buses").child("AllConfirmedBookings/" + issueKey)

    recordRef.update({
        "state": newResolvedValue
    });


}
//Delete