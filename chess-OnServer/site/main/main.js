import {Events} from "/chess-OnServer/site/!modules/eventJSON.js";


let events = new Events();
async function eventYears(){//this will create all the years from events and add event listener to each one(+href)
    let eventYears = await events.getNamesOfEventsJSON();
    console.log(eventYears);
    eventYears.forEach(element => {
        document.querySelector(`#card-1`).innerHTML += `<p class="years">${element}</p>`;//this is where do we add all the events years
    });
    //now add the window.location.href to every fucking element(url`s var too)
    document.querySelectorAll(`.years`).forEach(element => {
        element.addEventListener(`click`, () => {
            window.location.href = `/chess-OnServer/site/events/events.php?year=${element.innerHTML}`;
        })
    })
    sidePagesEventListeners();
}

function logOut(){//i have to call this function instead of onclick property because fucking module type(fuck)
    let cookieValue = '';
    container = document.querySelector(`#user-name`);
    window.cookieStore.get("credentials").then((cookie) => {
        if (cookie) {
          cookie.value = cookieValue;
          cookie.expires = new Date(0);
          window.cookieStore.delete(cookie).then(() => {
            console.log('Cookie deleted successfully');
          });
        }
      });
      //remove the pages that can be accesed just by the members
    document.querySelector(`#tasks`).remove();
    document.querySelector(`#addMembersAboutUs`).remove();
    container.innerHTML = 'Guest';
    document.querySelector(`#log-out`).remove();
    accountPage();//will add event listener to the container of name
}

let container = document.querySelector(`#user-name`);
window.onload = function(){//checking if there is a cookie and if the cookie values are correct
    eventYears();
    var cookie = document.cookie;
    container = document.querySelector(`#user-name`);
    if(cookie){
        var getVal = cookie.split("=");
        var credentials = getVal[1].split(" ");
        var name = credentials[0];
        var password = credentials[1];
        $.ajax({
            type: "POST",
            url: "http://localhost:1233/chess-OnServer/server/log_in.php",
            data: { name: name, password: password},
            success: function(response, status, xhr) {
                console.log(response);
                if (response.trim() === 'true') {
                    container.innerHTML = `${name}`;
                    document.querySelector(`#left-section-1`).innerHTML += `<p id="log-out">Log out</p>`;
                    const member = false;
                    eventListenersUpdate(member);
                }else if(response.trim() === 'member'){
                    container.innerHTML = `${name}`;
                    document.querySelector(`#left-section-1`).innerHTML += `
                    <p id="log-out">Log out</p>
                    <div class="memberDiv" id="tasks">Tasks</div>
                    <div class="memberDiv" id="addMembersAboutUs">Modify about us</div>`;
                    const member = true;
                    eventListenersUpdate(member);
                } else {
                    container.innerHTML = 'Guest';
                }
            },
            error: function(xhr, status, error) {
                console.error(error, status);
            }
        });
    }else{
        container.innerHTML += 'Guest';
    }
}



function accountPage(){
    container = document.querySelector(`#user-name`);
    container.addEventListener(`click`, () => {
        if(container.innerHTML == "Guest"){
            window.location.href = "/chess-OnServer/site/log_in/log_in.php";
        }
    })
}
accountPage();
 
function eventListenersUpdate(member){//thi will check for divs with event listeners 
    if(member){//member is type of acoount that is logged in(extropy member or just user)
        document.querySelector(`#addMembersAboutUs`).addEventListener(`click`, () => {
            console.log("a");
            window.location.href = `/chess-OnServer/site/aboutUsModify/aum.php`;
        })
    }
    if(document.querySelector(`#log-out`)){//checks if there is log out button and it adds event listener so it will trigger the log out function
        document.querySelector(`#log-out`).addEventListener(`click`,logOut);
    }
    if(document.querySelector(`#tasks`)){
        document.querySelector(`#tasks`).addEventListener(`click`, () => {
            window.location.href = `/chess-OnServer/site/schedule/schedule.php`;
        })
    }
    
}

function sidePagesEventListeners(){//this will search for squares that are linked to some side pages adn its enough to do this once
    document.querySelector(`#card-0`).addEventListener(`click`, () => {
        window.location.href = `/chess-OnServer/site/about_us/about_us.php`;
    })
    document.querySelector(`#JOIN-US-p`).addEventListener(`click`, () => {
        window.location.href = `/chess-OnServer/site/join_us/join_us.php`
    })
}


