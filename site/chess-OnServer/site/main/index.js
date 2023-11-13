import { Events } from '../!modules/eventJSON.js';
let events = new Events();

async function getSponsors(){
    let sponsors = await events.getSponsors()//this will get all sponsors png
    console.log(sponsors)
    let i;
    for(i = 0; i < sponsors.length; i++){
        console.log("sponsor")
        document.querySelector("#card-3").innerHTML += `<img class="sponsor-png" src="${sponsors[i].image}" alt=""></img>`
    }
    document.querySelectorAll(`.sponsor-png`).forEach(element => {
        element.style.animationDuration = `${i * 4}s`;//this will set the duration time for this animation
    })

    // Find the style sheet that contains the @keyframes rule(this will gett al stylesheets ans select just the first one)
    const styleSheet = document.styleSheets[0];
    console.log(styleSheet)

    // Find the @keyframes rule called sponsors
    const keyframesRule = Array.from(styleSheet.cssRules).find(
        rule => rule.type === CSSRule.KEYFRAMES_RULE && rule.name === "sponsors"
    );
    console.log(keyframesRule);

    // Modify the transform property of the 100% keyframe
    keyframesRule.deleteRule("100%");
    keyframesRule.appendRule(`100% { transform: translateX(${(i+1) * 30}%); }`);

    keyframesRule.deleteRule("0%");
    keyframesRule.appendRule(`0% { transform: translateX(-${(i+1) * 80}%); }`);

}
getSponsors();

async function eventYears(){//this will create all the years from events and add event listener to each one(+href)
    let eventYears = await events.getNamesOfEventsJSON();
    console.log(eventYears);
    eventYears.forEach(element => {
        document.querySelector(`#card-1`).innerHTML += `<p class="years">${element}</p>`;//this is where do we add all the events years
    });
    //now add the window.location.href to every fucking element(url`s var too)
    document.querySelectorAll(`.years`).forEach(element => {
        element.addEventListener(`click`, () => {
            window.location.href = `../events/events.html?year=${element.innerHTML}`;
        })
    })
    sidePagesEventListeners();
}

function logOut(){
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
      if(document.querySelector(`#tasks`)){document.querySelector(`#tasks`).remove();}
      if(document.querySelector(`#addMembersAboutUs`)){document.querySelector(`#addMembersAboutUs`).remove();}
    container.innerHTML = 'Guest';
    document.querySelector(`#log-out`).remove();
    accountPage();//will add event listener to the container of name
}

let container = document.querySelector(`#user-name`);
window.onload =async function(){//checking if there is a cookie and if the cookie values are correct
    eventYears();
    var cookie = document.cookie;
    container = document.querySelector(`#user-name`);
    if(cookie){
        console.log("cookie found")
        var getVal = cookie.split("=");
        var credentials = getVal[1].split(" ");
        var name = credentials[0];
        var password = credentials[1];
        let response = await events.logIn(name, password);
        console.log(response)
        if(response == "true") {
            container.innerHTML = `${name}`;
            document.querySelector(`#left-section-1`).innerHTML += `<p id="log-out">Log out</p>`;
            const member = false;
            eventListenersUpdate(member);
        }else if(response === 'member'){
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
    }else{
        container.innerHTML += 'Guest';
    }
}



function accountPage(){
    container = document.querySelector(`#user-name`);
    container.addEventListener(`click`, () => {
        if(container.innerHTML == "Guest"){
            window.location.href = "../log_in/log_in.html";
        }
    })
}
accountPage();
 
function eventListenersUpdate(member){//thi will check for divs with event listeners 
    if(member){//member is type of acount that is logged in(extropy member or just user)
        document.querySelector(`#addMembersAboutUs`).addEventListener(`click`, () => {
            console.log("a");
            window.location.href = `../aboutUsModify/aum.html`;
        })
    }
    if(document.querySelector(`#log-out`)){//checks if there is log out button and it adds event listener so it will trigger the log out function
        document.querySelector(`#log-out`).addEventListener(`click`,logOut);
    }
    if(document.querySelector(`#tasks`)){
        document.querySelector(`#tasks`).addEventListener(`click`, () => {
            window.location.href = `../schedule/schedule.html`;
        })
    }
    
}

function sidePagesEventListeners(){//this will search for squares that are linked to some side pages and its enough to do this once
    console.log("sidePagesEventListeners");
    document.querySelector(`#card-0`).addEventListener(`click`, () => {
        window.location.href = `../about_us/about_us.html`;
    })
    document.querySelector(`#JOIN-US-p`).addEventListener(`click`, () => {
        window.location.href = `../join_us/join_us.html`
    })
    document.querySelector(`#cr-0`).addEventListener(`click`, () => {
        window.location.href = `../messages/message.html`
    })
}



