<?php

 $name = $_POST["name"];
 $password = $_POST["password"];//get the name and password from the new_account
 $jsonData = file_get_contents("accounts.json");
 $data = json_decode($jsonData, true);//decode the json file, after it gets its value
    //is is added to a var that lately will be declared as a array so it can add more


    foreach ($data as $obj) {// checks if there is an account with this user and password
        if ($obj['name'] == $name) {
            if($obj['password'] == $password){
                if($obj["extropy"]){
                    echo "member";
                    break;
                }else{
                    echo "true";
                    break;  
                }
                
            }
        }
    }
?>