<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost","root","maruhgar","instimaps");
$q=$_GET["q"];
$result = $conn->query("SELECT * FROM instimaps JOIN category ON category.cat_id=instimaps.cat_id WHERE category.category='$q'");

$outp = "[";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    	if ($outp != "[") {$outp .= ",";}
		$outp .= '{"room":"'  . $rs["locname"] . '",';
		$outp .= '"dept":"'   . $rs["depname"] . '",';
		$outp .= '"location":"'. $rs["locdescrip"] . '",';
		$outp .= '"lat":"'    . $rs["lat"] . '",';
		$outp .= '"lng":"'    . $rs["lng"] . '"}';
}
$outp .="]";

$conn->close();

echo($outp);
?>