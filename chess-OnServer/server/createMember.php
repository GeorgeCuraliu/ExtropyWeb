<?php

$name = $_POST["name"];
$imageData = $_POST["image"];
$description = $_POST["description"];//geting the data from ajax
$departament = $_POST["selectedValue"];

$imageData = str_replace("data:image/png;base64,", "", $imageData);
$imageData = str_replace(" ", "+", $imageData);//writing the image in base64

$jsonData = file_get_contents("members.json");
$data = json_decode($jsonData, true);


$newData = array("name" => $name, "image" => $imageData, "departament" => $departament, "description" => $description);
$data[] = $newData;//declared as array so it can add more
   
$jsonData = json_encode($data, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
//encode in json format
file_put_contents("members.json", $jsonData);
echo "ok";
?>