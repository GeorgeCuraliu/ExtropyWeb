<?php


 $name = $_POST["name"];
 $password = $_POST["password"];//get the name and password from the new_account
 $nameFree = true;
 $jsonData = file_get_contents("accounts.json");
 $data = json_decode($jsonData, true);//decode the json file, after it gets its value
    //is is added to a var that lately will be declared as a array so it can add more
    
    

    foreach ($data as $obj) {// checcks if there is already a username
        if ($obj['name'] == $name) {
            $nameFree = false;
            echo "false";
            break;
        }
    }



if($nameFree){
   // header("HTTP/1.1 200 OK");
    echo "true";
    $newData = array("name" => $name, "password" => $password, "chessMatchesWon" => 0, "ticTacToeMatchesWon" => 0,"extropy"=>false);
    $data[] = $newData;//declared as array so it can add more
   
    $jsonData = json_encode($data, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
   //encode in json format
    file_put_contents("accounts.json", $jsonData);
    //put in json file
}
?>