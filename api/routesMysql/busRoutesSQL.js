const db = require('../db/mySqlConfig.js');
const express = require('express');

const router = express();

// function insertRoute(){
//   var routeRegNo = document.getElementById("routeRegNo").value;
//   var routeName = document.getElementById("routeName").value;
//   var routeNo = document.getElementById("routeNo").value;

//   window.alert(routeRegNo);
//   window.alert(routeName);
//   window.alert(routeNo);
// }
// db.connect(function(err) {
  // var routeRegNo = document.getElementById("routeRegNo").value;
  // var routeName = document.getElementById("routeName").value;
  // var routeNo = document.getElementById("routeNo").value;

//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO bus_route (bus_route_reg_id, bus_route_no, bus_route_name) VALUES ('124', 'dfef', 'sfd')";
//   db.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });

