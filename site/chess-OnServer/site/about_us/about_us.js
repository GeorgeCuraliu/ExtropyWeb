import {Events} from "../!modules/eventJSON.js";
let events = new Events();//import the modules(i have to move all the ajax in to the modules)

let propagandaMembers = [];
let programmingMembers = [];
let buildingMembers = [];
let selectedDepartament;
let selectedDepartamentClass;
let selectedMembers;
let membersContainer = document.querySelector(`#members`);



class MemebrsData{//a class declared to store members from every departament inside
    constructor(departament){
        this.departament = departament
        this.name = [];
        this.img = [];
        this.description = [];
    }
    pushData(name, img, description){
        this.name.push(name);
        this.img.push(img);
        this.description.push(description);
    }
    findUserData(name){
        if(this.name.indexOf(name) != -1){
            console.log("User found");
            let i = this.name.indexOf(name);
            return [this.name[i], this.img[i], this.description[i]];
        }
    }
}
let programmingData = new MemebrsData("programming");
let propagandaData = new MemebrsData("propaganda");
let buildingData = new MemebrsData("building");

window.onload = async () => {//will get all members data
    showData(await events.getMembers());
}


function showData(data){//thil will process all the data from the ajax GET and proopcess them in html data, that will be stored in the class
    for(let i = 0; i<data.length; i++){

        if(data[i].departament == "pr"){
            console.log("pr");
            propagandaData.pushData(data[i].name, data[i].image, data[i].description);
            propagandaMembers.push(`
            <div class="card animation-card">
                <img class="frame-svg" src="../!sources/img_svg/picture_frame.svg" alt="">
                <img class="member-picture" src="${data[i].image}" alt="">
                <div class="name-container">
                    <img class="name-svg" src="../!sources/img_svg/name_frame.svg" alt="">
                    <p class="member-name">${data[i].name}</p>
                </div>
            </div>
            `);
        }else if(data[i].departament == "programming"){
            console.log("programming");
            programmingData.pushData(data[i].name, data[i].image, data[i].description);
            programmingMembers.push(`
            <div class="card animation-card">
                <img class="frame-svg" src="../!sources/img_svg/picture_frame.svg" alt="">
                <img class="member-picture" src="${data[i].image}" alt="">
                <div class="name-container">
                    <img class="name-svg" src="../!sources/img_svg/name_frame.svg" alt="">
                    <p class="member-name">${data[i].name}</p>
                </div>
            </div>
            `);
        }else{
            console.log("building");
            buildingData.pushData(data[i].name, data[i].image, data[i].description);
            buildingMembers.push(`
            <div class="card animation-card">
                <img class="frame-svg" src="../!sources/img_svg/picture_frame.svg" alt="">
                <img class="member-picture" src="${data[i].image}" alt="">
                <div class="name-container">
                    <img class="name-svg" src="../!sources/img_svg/name_frame.svg" alt="">
                    <p class="member-name">${data[i].name}</p>
                </div>
            </div>
            `);
        }
    }
    console.log(programmingMembers);
    console.log(buildingMembers);
    console.log(propagandaMembers);
    departaments();
    searchForEventListeners();
    selectedDepartamentUpdate("building");
    selectedDepartamentClass = "building";
}

function searchForEventListeners(){
    members();
}

function departaments(){//will add event listeners to evry departament button
    console.log("deps");
    document.querySelector(`#building`).addEventListener(`click`,() => {selectedDepartamentUpdate("building")});
    document.querySelector(`#programming`).addEventListener(`click`,() => {selectedDepartamentUpdate("programming")});
    document.querySelector(`#propaganda`).addEventListener(`click`,() => {selectedDepartamentUpdate("propaganda")});
}
function members(){//will load the curent departament members into the container
    let members_cards = document.querySelectorAll(`#members > div`);
    console.log("members");
    members_cards.forEach(card => {
        card.addEventListener(`click`, () => {
            console.log(card.querySelector(`.member-name`));
            let name = card.querySelector(`.member-name`).innerHTML;
            selectedDepartament.findUserData(name)
            let data = selectedDepartament.findUserData(name);
            console.log(data);
            console.log(selectedDepartament.departament);
            showCaseCard(data, selectedDepartament.departament);
        })
    });
}

async function selectedDepartamentUpdate(departament){//this function is used for the animations activated when a departament is pressed
    
    const deparatamentsTempObj = {//the object must be here, so the variables are not empty
        "building": [buildingData, buildingMembers, "building"],
        "propaganda": [propagandaData, propagandaMembers, "propaganda"],
        "programming": [programmingData, programmingMembers, "programming"]
    }

    selectedDepartament = deparatamentsTempObj[departament][0];
    selectedMembers = deparatamentsTempObj[departament][1];
    selectedDepartamentClass = deparatamentsTempObj[departament][2];
    console.log(deparatamentsTempObj[departament]);

    if(document.querySelector(`.deselected-departament`)){
        document.querySelector(`.deselected-departament`).classList.remove(`deselected-departament`);
    }
    if(document.querySelector(`.selected-departament`)){
        document.querySelector(`.selected-departament`).classList.add(`deselected-departament`);
        document.querySelector(`.selected-departament`).classList.remove(`selected-departament`);
    }
    document.querySelector(`#${selectedDepartamentClass}`).classList.add(`selected-departament`);
    
    membersContainer = document.querySelector(`#members`);
    membersContainer.innerHTML = "";//this will add every card with a member inside it and will get a "pause" of 400ms for the animation to finsih
    for(let i = 0; i < deparatamentsTempObj[departament][1].length; i++){
        console.log(deparatamentsTempObj[departament][1].length + " card");
        membersContainer.innerHTML += deparatamentsTempObj[departament][1][i];
        await new Promise(resolve => setTimeout(resolve, 400));
        if(document.querySelector(`.animation-card`)){
            document.querySelector(`.animation-card`).classList.remove(`animation-card`);
        }else{break}
    }
    searchForEventListeners();
}

function showCaseCard(data, departament){//for the little showcase container where is the description too


      document.querySelector(`body`).innerHTML += `
        <div id="showcase-container">
          <img id="showcase-img" src="../!sources/img_svg/showcase_image.svg" alt="">
          <img id="showcase-member-picture" src="${data[1]}" alt="">
          <img id="showcase-name-svg" src="../!sources/img_svg/showcasea_name.svg" alt="">
          <p id="showcase-departament">${departament}</p>
          <p id="showcase-name">${data[0]}</p>
          <p id="showcase-description">${data[2]}</p>
          <img id="showcase-description-svg" src="../!sources/img_svg/showcase_description.svg" alt="">
        </div> `;

      document.querySelector('#showcase-description-svg').onload =async function() {
        await new Promise(resolve => setTimeout(resolve, 20));
        console.log('Showcase image loaded');
        document.querySelector(`body`).addEventListener(`click`,removeShowcase);
        }

    function removeShowcase(){
    console.log("A")
    document.getElementById(`showcase-container`).remove();
    document.querySelector(`body`).removeEventListener(`click`,removeShowcase);
    searchForEventListeners();
    console.log("b");
    departaments();
    }
}

