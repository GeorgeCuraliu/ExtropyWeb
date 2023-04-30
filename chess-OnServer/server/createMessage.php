<?php
$imageData = $_POST["message"];


$imageData = str_replace("data:image/png;base64,", "", $imageData);
$imageData = str_replace(" ", "+", $imageData);//writing the image in base64

$jsonData = file_get_contents("messages.json");
$data = json_decode($jsonData, true);


$newData = array("message" => $imageData);
$data[] = $newData;//declared as array so it can add more
   
$jsonData = json_encode($data, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
//encode in json format
file_put_contents("messages.json", $jsonData);
echo "ok";
?>