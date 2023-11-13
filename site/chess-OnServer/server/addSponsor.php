<?php

$png = $_POST["png"];

$jsonData = file_get_contents("sponsors.json");
$data = json_decode($jsonData, true);


$newData = array("png" => $png);
$data[] = $newData;//declared as array so it can add more
   
$jsonData = json_encode($data, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
//encode in json format
file_put_contents("sponsors.json", $jsonData);
echo "ok";
?>