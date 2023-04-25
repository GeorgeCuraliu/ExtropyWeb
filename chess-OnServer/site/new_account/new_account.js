function newUser(){
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
                    document.cookie = name + ' ' + password0;
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

