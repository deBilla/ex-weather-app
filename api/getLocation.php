<?php
header("Content-Type: application/json");
// build a PHP variable from JSON sent using POST method

$email = $_GET['usr'];

require_once('db.php');

$sql = "SELECT * FROM user_details WHERE email = '$email' ";

$json = array();
$result = mysqli_query ($conn, $sql);
while($row = mysqli_fetch_array ($result))     
{
    $bus = array(
        'lat' => $row['lat'],
        'lon' => $row['lon'],
        'name' => $row['location'],
        'unit' => $row['unit']

    );
    array_push($json, $bus);
}

$jsonstring = json_encode($json);
echo $jsonstring;

$conn->close();