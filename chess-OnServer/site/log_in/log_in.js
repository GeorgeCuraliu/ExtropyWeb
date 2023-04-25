

function logIn(){//will collect the data for log in and check at the server
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;


    $.ajax({
        type: "POST",
        url: "http://localhost:1233/chess-OnServer/server/log_in.php",
        data: { name: name, password: password},
        success: function(response, status, xhr) {
            console.log(response);
            if (response.trim() === 'true' || response.trim() === 'member') {
                container.innerHTML = '<h2>Username and  password are correct</h2>';
                document.cookie = `credentials=${name} ${password}; path=/`;
                window.location.href = "/chess-OnServer/site/main/main.php";
            } else {
                container.innerHTML = '<h2>Username or password are wrong</h2>';
            }
        },
        error: function(xhr, status, error) {
            console.error(error, status);
            container.html('<h2>Username already used</h2>');
        }
    });
}

function newUser(){//this will check if the var ar not empty and send the data to server to create enw user if the name is free 
    var name = document.getElementById("name").value;
    var password0 = document.getElementById("password0").value;
    var password1 = document.getElementById("password1").value;
    var container = document.getElementById("container");
    if(password0 == password1 && password0.length > 3 && name.length > 3){
        console.log("name and password are good");

        $.ajax({
            type: "POST",
            url: "http://localhost:1233/chess-OnServer/server/create_user.php",
            data: { name: name, password: password0 },
            success: function(response, status, xhr) {
                console.log(response);
                if (response.trim() === 'true') {
                    container.innerHTML = '<h2>New user created</h2>';
                    //document.cookie = name + ' ' + password0;
                    document.cookie = `credentials=${name} ${password0}; path=/`;
                    window.location.href = "/chess-OnServer/site/main/main.php"; 
                } else {
                    container.innerHTML = '<h2>Username already used</h2>';
                }
            },
            error: function(xhr, status, error) {
                console.error(error, status);
               
            }
        });


    }else{
        console.log("adawd");
        if(!(password0 == password1)){
            container.innerHTML = "<h2>Passwords are not the same</h2>"
        }
        else if(!(password0.length > 3)){
            container.innerHTML = "<h2>Password too short</h2>"
        }
        else if(!(name.length > 3)){
            container.innerHTML = "<h2>User name is too short</h2>"
        }
    }
}



let flipVal= true;//this will toggle betwen log in and create account
let flipDiv = document.querySelector(`#elements`);
let flipButton = document.querySelector(`#flip-button`);

function flip(){//will create the animation when is selcted log in or create new account
    flipButton = document.querySelector(`#flip-button`);


flipButton.addEventListener(`click`, () => {
    flipDiv.classList.add(`do-a-flip`);
    console.log(`test 1`);
    flipDiv.addEventListener('animationend', () => {//removes the class at end of animation
        flipDiv.classList.remove(`do-a-flip`);
        console.log(`test 2`);
        flipVal = !flipVal;
    });

    flipDiv.addEventListener(`animationstart`, () => {//when animation is at half, will change from log in to create account
        console.log(`test 3`);
        setTimeout(() => {
            changeElements();
            reverseDiv();
          }, 1000);
    })
});


}

function changeElements(){//will change the innerHTML of the container when the angle is 90 so it creates a little ilusion
    console.log(`test 4`);
    flipVal = !flipVal;
    if(flipVal){
        flipDiv.innerHTML = `
            <input type="text" id="name" placeholder="NAME:" class="input">
            <input type="text" id="password" placeholder="PASSWORD:" class="input">
            <div id="container"></div>
            <button onclick="logIn()" id="log_in" class="button">LOG IN</button>
            <button id="flip-button" class="button">Do not have an account? Create an user!</button>
        `;
        
    }else{
        flipDiv.innerHTML =`
            <input type="text" id="name" placeholder="NAME:" class="input">
            <input type="text" id="password0" placeholder="PASSWORD:" class="input">
            <input type="text" id="password1" placeholder="REPEAT PASSWORD:" class="input">
            <div id="container"></div>
            <button onclick="newUser()" class="button">Create new user</button>
            <button id="flip-button" class="button">Already have an account? Log in!</button>
            `;
        
    }
    flip();
    console.log(flipVal);
}
function reverseDiv(){
    let elements = flipDiv.querySelectorAll(`*`);
    for(let i=0; i <elements.length; i++){
        elements[i].classList.add(`reverse`);
    }
    setTimeout(() => {
        for(let i=0; i <elements.length; i++){
            elements[i].classList.remove(`reverse`);
        }
    },1000);
}


window.onload = flip();