<?php

$index = $_POST["index"];

$jsonData = file_get_contents("sponsors.json");
$data = json_decode($jsonData, true);


    unset($data[$index]);
    $data = array_values($data);
    $jsonData = json_encode($data, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
            //encode in json format
    file_put_contents("sponsors.json", $jsonData);

?>