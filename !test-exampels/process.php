<?php
// Get the name and password from the POST data
$name = $_POST["name"];
$password = $_POST["password"];

// Read the existing data from the JSON file
$jsonData = file_get_contents("users.json");
$data = json_decode($jsonData, true);

// Append the new data to the array
$newData = array("name" => $name, "password" => $password);
$data[] = $newData;

// Write the updated data to the JSON file
$jsonData = json_encode($data);
file_put_contents("users.json", $jsonData);

// Send a response back to the client
echo "Data saved successfully!";



//conect to a database


?>