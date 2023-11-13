<?php
 $foundUser = false;
 $user = $_POST["user"];
 $type = $_POST["type"];//get type and name
 $jsonData = file_get_contents("accounts.json");
 $data = json_decode($jsonData, true);//decode the json file, after it gets its value
    //is is added to a var that lately will be declared as a array so it can add more


    for ($i = 0; $i < count($data); $i++) {
        if($data[$i]["name"] == $user){
            $data[$i]["extropy"] = $type;
            $foundUser = true;
            echo "User found, change made";
        }
    }
    if(!$foundUser){
        echo "No user found";
    }
    $jsonData = json_encode($data, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
    //encode in json format
    file_put_contents("accounts.json", $jsonData);
?>