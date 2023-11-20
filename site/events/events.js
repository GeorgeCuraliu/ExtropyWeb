import {Events} from "../!modules/eventJSON.js";
let events = new Events();





window.onload = async function(){//will get the events data from the specific json file trought the url parameters

    const searchParams = new URLSearchParams(window.location.search);
    const year = searchParams.get('year');
    document.getElementById(`years`).innerHTML = year;
    console.log(year);
    let eventsData = await events.getJSONcontent(year);
    let reverseEvent = false;
    for(let i=0; i < eventsData.length; i++){



        console.log("Wda");
        document.querySelector(`#events-container`).innerHTML += `
        <div class="event">
            <div class="description-container">
                <p class="description">${eventsData[i].description}</p>
                <p class="name" >${eventsData[i].name}</p>
                <p class="date">${eventsData[i].date}</p>
            </div>
            <img class="image-container" src="${eventsData[i].image}" alt="">
        </div>
        `;

        if(reverseEvent){//this will reverse the event if the last one wasnt reversed
            let event = document.querySelector(`#events-container > .event:last-child`);
            event.classList.add(`event-reverse`);
            event.querySelector(`.description-container`).classList.add(`description-container-reverse`);
            event.querySelector(`.image-container`).classList.add("image-reverse");
            if(window.screen.width > 768){
                event.querySelector(`.name`).style.left = "50vw";
                event.querySelector(`.date`).style.left = "50vw";
            }else{
                event.querySelector(`.name`).style.left = "55vw";
                event.querySelector(`.date`).style.left = "55vw"; 
            }
        }
        reverseEvent = !reverseEvent;
    }
    const body = document.body;//is used to arrange the height of body so everything fits and si not directly touching the bottom
    const bodyHeight = body.offsetHeight;
    const windowHeight = window.innerHeight;
    const finalHeight = bodyHeight + windowHeight * 0.3;
    body.style.height = `${finalHeight}px`;
}