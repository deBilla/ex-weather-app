<?php
$to = "dimuthu.w@eng.pdn.ac.lk";
$subject = "My subject";
$txt = "Hello world!";
$headers = "From: dimuthu.billa@gmail.com" . "\r\n" .
"CC: dimuthu.w93@gmail.com";

mail($to,$subject,$txt,$headers);