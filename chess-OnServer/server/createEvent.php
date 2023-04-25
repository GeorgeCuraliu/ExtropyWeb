<?php


 $image = $_POST["image"];
 $description = $_POST["description"];//get the name and password from the new_account
 $file = $_POST["file"];
 $jsonData = file_get_contents($_SERVER["DOCUMENT_ROOT"] . "\chess-onServer\\server\\events\\$file.json");
 $data = json_decode($jsonData, true);//decode the json file, after it gets its value
    //is is added to a var that lately will be declared as a array so it can add more
    
    

   // header("HTTP/1.1 200 OK");
    echo $file;
    $newData = array("image" => $image, "description" => $description);
    $data[] = $newData;//declared as array so it can add more
   
    $jsonData = json_encode($data, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
   //encode in json format
    file_put_contents($_SERVER["DOCUMENT_ROOT"] . "\chess-onServer\\server\\events\\$file.json", $jsonData);
    //put in json file

?>