<?php

$name = $_POST["name"];

$jsonData = file_get_contents("members.json");
$data = json_decode($jsonData, true);

foreach ($data as $i => $keys) {// checcks if there is already a username
    if ($keys['name'] == $name) {
        unset($data[$i]);
        echo $name;
        break;
    }
}
    $data = array_values($data);
    $jsonData = json_encode($data, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
            //encode in json format
    file_put_contents("members.json", $jsonData);

?>