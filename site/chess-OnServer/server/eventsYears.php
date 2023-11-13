<?php
    $directoryPath = $_SERVER["DOCUMENT_ROOT"] . "\chess-onServer\\server\\events\\";
    $jsonFiles = array();
    
    if (is_dir($directoryPath)) {
        $files = scandir($directoryPath);
    
        foreach ($files as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === 'json') {
                $jsonFiles[] = $file;
            }
        }
    }

    echo json_encode($jsonFiles);
?>