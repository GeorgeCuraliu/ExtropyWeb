<?php
$name = $_POST["name"];
$reason = $_POST["reason"];
$classPD = $_POST["classPD"];
$number = $_POST["number"];
$departament = $_POST["departament"];

$jsonData = file_get_contents("recruits.json");
$data = json_decode($jsonData, true);


$newData = array("name" => $name, "reason" => $reason, "classPD" => $classPD, "number" => $number, "departament" => $departament);
$data[] = $newData;//declared as array so it can add more
   
$jsonData = json_encode($data, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
//encode in json format
file_put_contents("recruits.json", $jsonData);
echo "ok";
?>