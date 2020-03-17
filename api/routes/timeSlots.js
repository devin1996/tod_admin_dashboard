function insertBusTimeSlot() {

    var routeRegNo = document.getElementById("routeRegNo").value;
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var depTime = document.getElementById("departureTime").value;
    var arrTime = document.getElementById("arrivalTime").value;
    var trackNo = document.getElementById("trackNo").value;
    
    var busRouteKey = routeRegNo+"rbr";
    var toFromKey = from+"-"+to;
    var busTimeKey = routeRegNo+"rbr"+from+to+depTime+arrTime;

  
    firebase.database().ref("timeSlots").child("busTimes").child(busRouteKey).child(toFromKey).child(busTimeKey).set({
  
      routeRegNo: routeRegNo,
      from: from,
      to: to,
      depTime: depTime,
      arrTime: arrTime,
      trackNo: trackNo,

    });

    firebase.database().ref("timeSlots").child("busTimes").child("busTimeDislpay").child(busTimeKey).set({
  
        routeRegNo: routeRegNo,
        from: from,
        to: to,
        depTime: depTime,
        arrTime: arrTime,
        trackNo: trackNo,
  
      });
  }

