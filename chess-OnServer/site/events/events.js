import {Events} from "/chess-OnServer/site/!modules/eventJSON.js";
let events = new Events();





window.onload = async function(){//will get the events data from the specific json file trought the url parameters
    const searchParams = new URLSearchParams(window.location.search);
    const year = searchParams.get('year');
    document.getElementById(`years`).innerHTML = year;
    console.log(year);
    let eventsData = await events.getJSONcontent(year);
    let reverseEvent = false;
    for(let i=0; i < Object.keys(eventsData).length; i++){

        let img64 = eventsData[i].image;
        // remove the data URI scheme and whitespace characters
        img64 = img64.replace("data:image/png;base64,", "").replace(/\s/g, "");
        // decode the base64-encoded string into binary data
        let imgData = atob(img64);
        // convert the binary data into a typed array
        let imgDataArray = new Uint8Array(imgData.length);
        for (let i = 0; i < imgData.length; i++) {
          imgDataArray[i] = imgData.charCodeAt(i);
        }
        // create a blob from the binary data
        let blob = new Blob([imgDataArray], {type: "image/png"});
        // create a URL for the blob
        let imgUrl = URL.createObjectURL(blob);


        console.log("Wda");
        document.querySelector(`#events-container`).innerHTML += `
        <div class="event">
            <div class="description-container">
                <p>${eventsData[i].description}</p>
                <p class="name" >${eventsData[i].name}</p>
                <p class="date">${eventsData[i].date}</p>
            </div>
            <img class="image-container" src="" alt="">
        </div>
        `;

        if(reverseEvent){//this will reverse the event if the last one want reversed
            let event = document.querySelector(`#events-container > .event:last-child`);
            event.classList.add(`event-reverse`);
            event.querySelector(`.description-container`).classList.add(`description-container-reverse`);
            event.querySelector(`.image-container`).classList.add("image-reverse");
        }
        reverseEvent = !reverseEvent;
    }
    
}