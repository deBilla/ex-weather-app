<?php
header("Content-Type: application/json");
// build a PHP variable from JSON sent using POST method
$v = json_decode(stripslashes(file_get_contents("php://input")));

$user = $v->email;
$pass = $v->password;

if (empty($user) || empty($pass)) {
  echo "empty object";
} else {
  require_once('db.php');

  $sql = "INSERT INTO user_details (email, password)
  VALUES ('$user', '$pass')";
  
  if ($conn->query($sql) === TRUE) {
    echo "success";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
  
  $conn->close();
}



