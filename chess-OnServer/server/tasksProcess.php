<?php
$type = $_POST["type"];
$title = $_POST["title"];
$id = $_POST["id"];
$creator = $_POST["creator"];
$content = $_POST["content"];
$section = $_POST["section"];

$jsonData = file_get_contents("schedule.json");
$data = json_decode($jsonData, true);

if ($type == "index") {

    // Get the keys of the associative array
    $keys = array_keys($data);
    
    // Check if the array is empty or not
    if (!empty($keys)) {
        // Get the last key in the array
        $lastIndex = end($keys);
        echo $lastIndex;
    } else {
        // If the array is empty, return -1
        echo -1;
    }

}else if($type == "create"){

    $dataN = array("title" => $title, "creator" => $creator, "content" => $content, "section" => $section);
    $data[] = $dataN;
    $jsonData = json_encode($data, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
    file_put_contents("schedule.json", $jsonData);
    echo "new card created";

}else if($type == "move"){

    $data[$id]["section"] = $section;
    $jsonData = json_encode($data, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
            //encode in json format
    file_put_contents("schedule.json", $jsonData);
    echo "section changed succesfully";

}else if($type == "delete"){

    unset($data[$id]);
    $data = array_values($data);
    $jsonData = json_encode($data, JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);
            //encode in json format
    file_put_contents("schedule.json", $jsonData);
    echo "card deleted";
}
?>