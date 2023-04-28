<!DOCTYPE html>
<html>
<head>
	<title>LogIN</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="log_in.css">
</head>
    <body>
        <div id="bigContainer">
            
            <div id="med-container">
                <img id="EXTROPY" src="/chess-OnServer/site/!sources/letters/EXTROPY_letters.svg" alt="">
                <h3 id="national-numb">RO168</h3>
                <h3 id="international-numb">19074</h3>
                <img id="coords" src="/chess-OnServer/site/!sources/letters/coord.svg" alt="">
            <div id="elements-container">
                <div id="elements-container-1">
                    <div id="elements">
                        <input type="text" id="name" placeholder="NAME:" class="input">
                        <input type="text" id="password" placeholder="PASSWORD:" class="input">
                        <div id="container"></div>
                        <button class="button" id="log_in">Log in</button>
                        <button id="flip-button" class="button">Do not have an account? Create an user!</button>
                    </div>
                </div>
            </div>
            
            </div>

        </div>
        <script src="log_in.js" type="module"></script>
    </body>
</html>