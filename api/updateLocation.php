<?php
header("Content-Type: application/json");
// build a PHP variable from JSON sent using POST method
$v = json_decode(stripslashes(file_get_contents("php://input")));

$name = $v->name;
$lat = $v->lat;
$lon = $v->lon;
$unit = $v->unit;
$email = $v->email;

require_once('db.php');

$sql = "UPDATE user_details SET location = '$name', lat = '$lat', lon = '$lon', unit = '$unit' WHERE email = '$email' ";

if ($conn->query($sql) === TRUE) {
echo "success";
} else {
echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();