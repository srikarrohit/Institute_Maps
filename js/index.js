/*$(document).ready(function() {
  $('#search1').keydown(function(e){
  	if(e.which===40)
  	{
  		$('#xml').keynavigator();
  	}
  });
}); */
var i=0;
function initialize()
    {
      var myCenter=new google.maps.LatLng(12.9925,80.231072);
      var mapProp = {
        center:myCenter,
          maxZoom:18,
          minZoom:10,
          zoom:16,
          mapTypeId:google.maps.MapTypeId.ROADMAP
      };
    var strictBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(12.97,80.20),
      new google.maps.LatLng(13.01,80.25)
     );
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

var markers = [
            {
                "title": 'mainGate',
                "lat": '13.005990',
                "lng": '80.242484',
                "description": ''
            }
        ,
            {
                "title": 'velacheryGate',
                "lat": '12.988465',
                "lng": '80.223307',
                "description": ''
            }
        ,
            {
                "title": 'jamunaStop',
                "lat": '12.986637',
                "lng": '80.238757',
                "description": ''
            }
    ];

var infoWindow = new google.maps.InfoWindow();
        var lat_lng = new Array();
        var latlngbounds = new google.maps.LatLngBounds();
        for (i = 0; i < markers.length; i++) {
            var data = markers[i]
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            lat_lng.push(myLatlng);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: data.title
            });
            latlngbounds.extend(marker.position);
            (function (marker, data) {
                google.maps.event.addListener(marker, "click", function (e) {
                    infoWindow.setContent(data.description);
                    infoWindow.open(map, marker);
                });
            })(marker, data);
        }
        map.setCenter(latlngbounds.getCenter());
        map.fitBounds(latlngbounds);
 
        //***********ROUTING****************//
 
        //Initialize the Path Array
        var path = new google.maps.MVCArray();
 
        //Initialize the Direction Service
        var service = new google.maps.DirectionsService();
 
        //Set the Path Stroke Color
        var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
 
        //Loop and Draw Path Route between the Points on MAP
        for (var i = 0; i < lat_lng.length; i++) {
            if ((i + 1) < lat_lng.length) {
                var src = lat_lng[i];
                var des = lat_lng[i + 1];
                path.push(src);
                poly.setPath(path);
                service.route({
                    origin: src,
                    destination: des,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                            path.push(result.routes[0].overview_path[i]);
                        }
                    }
                });
            }
        }


    
    google.maps.event.addListener(map, 'dragend', function() {
                    if (strictBounds.contains(map.getCenter())) return;

                    // We're out of bounds - Move the map back within the bounds
                    var c = map.getCenter(),
                    x = c.lng(),
                    y = c.lat(),
                    maxX = strictBounds.getNorthEast().lng(),
                    maxY = strictBounds.getNorthEast().lat(),
                    minX = strictBounds.getSouthWest().lng(),
                    minY = strictBounds.getSouthWest().lat();

                    if (x < minX) x = minX;
                    if (x > maxX) x = maxX;
                    if (y < minY) y = minY;
                    if (y > maxY) y = maxY;

                    map.setCenter(new google.maps.LatLng(y, x));
    });   

      if((document.getElementById('myTable').rows[1].cells[2].innerHTML)!= null)
      {
        var locname = document.getElementById('myTable').rows[1].cells[2].innerHTML;
        var locdescrip = document.getElementById('myTable').rows[1].cells[3].innerHTML;
        var depname = document.getElementById('myTable').rows[1].cells[4].innerHTML;
        var lat = parseFloat(document.getElementById('myTable').rows[1].cells[0].innerHTML);
        var lng = parseFloat(document.getElementById('myTable').rows[1].cells[1].innerHTML);
      var html = "<b>" + locname + "</b> <br>" + locdescrip + "<br>," + depname;

      var infoWindow = new google.maps.InfoWindow;
        var marker_0= new google.maps.LatLng(lat,lng);
        map.setCenter(new google.maps.LatLng(lat,lng));
        google.maps.event.addDomListener(window, "resize", function() {
          var center = map.getCenter();
          google.maps.event.trigger(map, "resize");
          map.setCenter(new google.maps.LatLng(lat,lng));  
          }); 
        var marker=new google.maps.Marker({
          position:marker_0,
          });
        marker.setMap(map);
      bindInfoWindow(marker, map, infoWindow, html);
      }
    }
var count=0;
    function showResult(str,e) {
		var value=document.getElementById('search1').value;
    if(value=="")
    	count=0;
    if(e.keyCode == 40)
    {
		console.log(count);
    var max=document.getElementById('counter').innerHTML;
    console.log(max);
//     console.log(document.getElementById('txtHint').scrollTop);
    if(count!=0)
    document.getElementById(count).style.cssText = 'background-color:none;';
    if(count>6)
    document.getElementById('livesearch').scrollTop+=24;
    if(count!=max)
    count++;
    document.getElementById('search1').value=document.getElementById(count).innerHTML;
    document.getElementById(count).style.cssText = 'background-color:#ecf0f1;';
    console.log(count);
    }
    else if(e.keyCode == 38){
    document.getElementById(count).style.cssText = 'background-color:none;';
    var scroll = document.getElementById('livesearch').scrollTop;
    count--;
    if(scroll>=24 && count>1)
    document.getElementById('livesearch').scrollTop-=24;
    document.getElementById('search1').value=document.getElementById(count).innerHTML;
    if(count!=0)
    document.getElementById(count).style.cssText = 'background-color:#ecf0f1;';
    }
	else{
  if (str.length==0) { 
    document.getElementById("livesearch").innerHTML="";
    document.getElementById("livesearch").style.border="0px";
    document.getElementById("livesearch").style.height = "0px";
  }
  if (str.length>=1) {
    document.getElementById("livesearch").style.height = "auto";
  }
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200 ) {
    
      document.getElementById("livesearch").innerHTML=xmlhttp.responseText;
      if(str.length>=3)
      document.getElementById("livesearch").style.border="1px solid #A5ACB2";
    
    
    }
  }
  xmlhttp.open("GET","search.php?q="+str,true);
  xmlhttp.send();
	}
}

    google.maps.event.addDomListener(window, 'load', initialize);
    function bindInfoWindow(marker, map, infoWindow, html) {
          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
            map.setZoom(18);
            map.setCenter(marker.getPosition());
          });
        }
        function road(obj){
  var a = obj.innerHTML;
  document.getElementById('search1').value=a;
  document.getElementById('livesearch').style.display="none";
}
function road_1(){
  document.getElementById('livesearch').style.display="block";
}
function submit(){
  locdata();
}


function locdata() {
  var xhttp = new XMLHttpRequest();
	var input= document.getElementById("search1").value;
  xhttp.onreadystatechange=function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      document.getElementById("printing").innerHTML = xhttp.responseText;
			initialize();
			iconchange();
    }
  };
  xhttp.open("GET", "api.php?search2="+input,true);
  xhttp.send();
	return false;
}

function iconchange(){
	var value=document.getElementById("search1").value
	if(i==0 && value!=0){document.getElementById("btn").className="fa fa-times";
		i=1;
	}
	else{
		document.getElementById("btn").className="fa fa-search";
		document.getElementById("search1").value="";
		i=0;
	}
}

