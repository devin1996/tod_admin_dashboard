var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "tod",
  port    : '3306'

});

con.connect(function(err) {
//   var routeRegNo = document.getElementById("routeRegNo").value;
//   var routeName = document.getElementById("routeName").value;
//   var routeNo = document.getElementById("routeNo").value;

  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO bus_route (bus_route_reg_id, bus_route_no, bus_route_name) VALUES ('10', '101', 'devin')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});