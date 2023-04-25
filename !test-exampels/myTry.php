<!DOCTYPE html>
<html>
<head>
	<title>Submit Form Data via AJAX</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
    <button id="someB"></button>
<script>
    //dont modify this file, this is now a god
    var but = document.getElementById("someB");
    but.addEventListener(`click`, magic);
    var str=[21]
    function magic(){
        //create xhr obj
        var xhr = new XMLHttpRequest();// new operator else get error
        //OPEN - type, url/file, async
        xhr.open(`GET`, `users.json`, true); 

        xhr.onload = function(){//seme kind of get ready?
            if(this.status == 200){//200 == OK 403 == forbidden
                console.log(this.response);
            }
        }
        //send request
        xhr.send();

    }
</script>
</body>