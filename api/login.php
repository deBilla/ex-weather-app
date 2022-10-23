<?php
$user = $_GET['user'];
$pass = $_GET['password'];

require_once('db.php');

$sql = "SELECT * FROM user_details WHERE email = '$user' AND password = '$pass' ";

$result = $conn->query($sql);

if ($result -> num_rows > 0) {
    echo 'success';
} else {
    echo 'failure';
}

$conn->close();