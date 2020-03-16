function insertBusTimeSlot() {

    var routeRegNo = document.getElementById("routeRegNo").value;
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var depTime = document.getElementById("departureTime").value;
    var arrTime = document.getElementById("arrivalTime").value;
    var trackNo = document.getElementById("trackNo").value;
    
    var busRouteKey = routeRegNo+"rbr";
    var toFromKey = from+"-"+to;


  
    firebase.database().ref("timeSlots").child("busTimes").child(busRouteKey).child(toFromKey).push().set({
  
      routeRegNo: routeRegNo,
      from: from,
      to: to,
      depTime: depTime,
      arrTime: arrTime,
      trackNo: trackNo,

    });
  }