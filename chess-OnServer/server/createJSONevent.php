<?php
$name = $_POST["JSONN"];
$data = new stdClass();
$jsonData = json_encode($data);
file_put_contents($_SERVER["DOCUMENT_ROOT"] . "\chess-onServer\\server\\events\\". $name, $jsonData);
echo $_SERVER["DOCUMENT_ROOT"] . "\chess-onServer\server\events\\";
?>