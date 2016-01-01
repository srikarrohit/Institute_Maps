<?php
session_start();
?>
<?php
require 'config/config.php';
$conn = mysqli_connect($host,$user,$pwd,$db);
$sql= "SELECT * FROM instimaps";
$result= mysqli_query($conn,$sql);
$places= array();
$j=0;
while($row= mysqli_fetch_assoc($result))
{
	$places[$j] = $row['locname'];
	$j++;
}
//get the q parameter from URL
$q=$_GET["q"];
$_SESSION["string"]=$q;
$hint = "";
//lookup all links from the xml file if length of q>0
if (strlen($q)>=3) {
  $q=strtolower($q);
  $len= strlen($q);
  for($i=0;$i< sizeof($places);$i++){
	$places_0[$i]= strtolower($places[$i]);
      if (stristr($places_0[$i],$q)){
        if ($hint==="") {
          $hint="<li id='xml".$i."' name='xml' onclick='road(this); submit();' class='xml1'>" .$places[$i]. "</li>";
        } else {
          $hint=$hint . "<li id='xml".$i."' name='xml' onclick='road(this); submit();' class='xml1'>" . $places[$i] . "</li>";
        }
      }
	}
}

// Set output to "no suggestion" if no hint was found
// or to the correct values
if ($hint=="" && strlen($q)>=3) {
  $response="no suggestions";
  echo "<ul><li id='xml0' class='xml2 xml1'>".$response."</li></ul>";
} else {
  $response=$hint;
   echo "<ul>".$response."</ul>";
}
?>
