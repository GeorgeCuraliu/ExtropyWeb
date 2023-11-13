<?php

$confirm = $_POST["delete"];
$data = new stdClass();
$jsonData = json_encode($data, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
//just delete anything inside with an empty object
file_put_contents("recruits.json", $jsonData);

?>