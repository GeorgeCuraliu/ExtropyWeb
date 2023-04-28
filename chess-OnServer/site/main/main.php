<!DOCTYPE html>
<html>
<head>
	<title>Main</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="main.css">
</head><!--for log in, so you can acces the member exclusive pages is MrBlec and password MrBlec-admin   -->
    <body onload="tryCredentials()">
        <div id="page-container">
            <div id="left-section" class="section">

                <div id="left-section-1">
                    <div id="my-account">
                        <img  src="/chess-OnServer/site/!sources/img_svg/extropy_guy.svg" alt="" id="extropy-guy">
                        <p id="user-name"></p>
                    </div>
                    <div id="squares-8-container">
                        <img src="/chess-OnServer/site/!sources/img_svg/8_squares.svg" alt="" id="squares-8">
                        <h3 id="n0" class="numb">RO168</h3>
                        <h3 id="n1" class="numb">19074</h3>
                    </div>
                </div>

                <div id="big-extropy">
                    <img src="/chess-OnServer/site/!sources/letters/EXTROPY_letters.svg" alt="" id="extropy-letters">
                    <img src="/chess-OnServer/site/!sources/img_svg/colores_squares.svg" alt="" id="color_sq" class="glitch">
                    <img src="/chess-OnServer/site/!sources/letters/ROBOTICS.svg" alt="" id="ROBOTICS">
                    <img src="/chess-OnServer/site/!sources/letters/coord.svg" alt="" id="coords">
                </div>

                <div id="left-cards">
                    <div class="card-container" id="cc-0">
                        <div class="card" id="card-0">
                            <p class="card-title">ABOUT US</p>
                        </div>
                    </div>
                    <div class="card-container">
                        <div class="card" id="card-1">
                            <p class="card-title">PROJECT AND ACTIVITIES</p>
                        </div>
                    </div>
                    <div class="card-container" id="cc-2">
                        <div class="card" id="card-2">
                            <p class="card-title">GAMES</p>
                        </div>
                    </div>
                    <div id="cc-3">
                        <div id="card-3" >
                            <p id="sponsors-p">Sponsors</p>
                        </div>
                    </div>
                </div>
            </div>



            <div id="right-section" class="section">
                <div id="JOIN-US">
                    <p id="JOIN-US-p">JOIN US</p>
                </div>

                <div class="card-container" id="cr-0">
                    <div class="card">
                        <p class="card-title">MESSAGE</p>
                    </div>
                </div>

                <div class="card-container" id="cr-1">
                    <div class="card">
                        <p class="card-title">CONTACT US</p>
                    </div>
                </div>
            </div>
        </div>
        <script src="main.js" type = "module"></script>
    </body>
</html>