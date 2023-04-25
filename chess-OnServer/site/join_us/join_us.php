<!DOCTYPE html>
<html>
<head>
	<title>Main</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="join_us.css">
</head>
<body>
    <header>
        <img id="extropy-guy" src="/chess-OnServer/site/!sources/img_svg/extropy_guy.svg" alt="">
        <img id="squares" src="/chess-OnServer/site/!sources/img_svg/colores_squares.svg" alt="">
        <p id="join-us">Join us</p>
    </header>
    <div id="container">
        <section>
            <div>
                <p>Nume si prenume</p>
                <input type="text" id="name">
            </div>
        </section>
        <section>
            <div>
                <p>De ce vrei sa te alaturi</p>
                <input type="text"  id="reason">
            </div>
        </section>
        <section>
            <div>
                <p>Clasa</p>
                <select type="text" id="classPD">
                    <option value="07A">7A</option>
                    <option value="07B">7B</option>
                    <option value="08A">8A</option>
                    <option value="08B">8B</option>
                    <option value="09A">9A</option>
                    <option value="09B">9B</option>
                    <option value="09C">9C</option>
                    <option value="09D">9D</option>
                    <option value="10A">10A</option>
                    <option value="10B">10B</option>
                    <option value="10C">10C</option>
                    <option value="10D">10D</option>
                    <option value="11A">11A</option>
                    <option value="11B">11B</option>
                    <option value="11C">11C</option>
                    <option value="11D">11D</option>
                    <option value="12A">12A</option>
                    <option value="12B">12B</option>
                    <option value="12C">12C</option>
                    <option value="12D">12D</option>
                </select>
            </div>
        </section>
        <section>
            <div>
                <p class="dep-p">Departament</p>
                <li>
                    <p id="programming">PROGRAMMING</p>
    
                    <p id="propaganda">PROPAGANDA</p>
    
                    <p id="building">BUILDING</p>
                </li>
            </div>
        </section>
        <section>
            <div>
                <p>Numar de telefon</p>
                <input type="number" id="number">
            </div>
        </section>
        <footer>
            <p>Submit your soul</p>
        </footer>
    </div>
    <script src="join_us.js" type="module"></script>
</body>
</html>