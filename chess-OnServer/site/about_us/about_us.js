let propagandaMembers = [];
let programmingMembers = [];
let buildingMembers = [];
let selectedDepartament;
let selectedDepartamentClass;
let lastSelectedDepartamentClass;
let selectedMembers;

class MemebrsData{
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


window.onload = () => {
    $.ajax({
        type: "GET",
        url: "http://localhost:1233/chess-OnServer/server/members.json",
        dataType: "json",
        success: function(data) {
          console.log(data); // do something with the retrieved JSON data
          showData(data);
        },
        error: function(xhr, status, error) {
          console.error(error); // handle errors
        }
      });
}

function showData(data){
    for(let i = 0; i<Object.keys(data).length; i++){
        let img64 = data[i].image;
        let imgData = atob(img64);
        let imgDataArray = new Uint8Array(imgData.length);
        for (let i = 0; i < imgData.length; i++) {
            imgDataArray[i] = imgData.charCodeAt(i);
        }
        let blob = new Blob([imgDataArray], {type: "image/png"});
        let imgUrl = URL.createObjectURL(blob);
        let name = data[i].name;
        let description = data[i].description;

        if(data[i].departament == "pr"){
            console.log("pr");
            propagandaData.pushData(name, imgUrl, description);
            propagandaMembers.push(`
            <div class="card animation-card">
                <img class="frame-svg" src="/chess-OnServer/site/!sources/img_svg/picture_frame.svg" alt="">
                <img class="member-picture" src="${imgUrl}" alt="">
                <div class="name-container">
                    <img class="name-svg" src="/chess-OnServer/site/!sources/img_svg/name_frame.svg" alt="">
                    <p class="member-name">${name}</p>
                </div>
            </div>
            `);
        }else if(data[i].departament == "programming"){
            console.log("programming");
            programmingData.pushData(name, imgUrl, description);
            programmingMembers.push(`
            <div class="card animation-card">
                <img class="frame-svg" src="/chess-OnServer/site/!sources/img_svg/picture_frame.svg" alt="">
                <img class="member-picture" src="${imgUrl}" alt="">
                <div class="name-container">
                    <img class="name-svg" src="/chess-OnServer/site/!sources/img_svg/name_frame.svg" alt="">
                    <p class="member-name">${name}</p>
                </div>
            </div>
            `);
        }else{
            console.log("building");
            buildingData.pushData(name, imgUrl, description);
            buildingMembers.push(`
            <div class="card animation-card">
                <img class="frame-svg" src="/chess-OnServer/site/!sources/img_svg/picture_frame.svg" alt="">
                <img class="member-picture" src="${imgUrl}" alt="">
                <div class="name-container">
                    <img class="name-svg" src="/chess-OnServer/site/!sources/img_svg/name_frame.svg" alt="">
                    <p class="member-name">${name}</p>
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

function departaments(){
    document.querySelector(`#building`).addEventListener(`click`,() => {selectedDepartamentUpdate("building")});
    document.querySelector(`#programming`).addEventListener(`click`,() => {selectedDepartamentUpdate("programming")});
    document.querySelector(`#propaganda`).addEventListener(`click`,() => {selectedDepartamentUpdate("propaganda")});
}
function members(){
    let members_cards = document.querySelectorAll(`#members > div`);
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

async function selectedDepartamentUpdate(departament){
    let membersContainer = document.querySelector(`#members`);
    console.log("a");
    if(departament == "building" && selectedDepartamentClass != "building"){

        selectedDepartament = buildingData;
        selectedMembers = buildingMembers;
        console.log(`not building`);
        lastSelectedDepartamentClass = selectedDepartamentClass;
        selectedDepartamentClass = "building";
        
    
    }else if(departament == "propaganda" && selectedDepartamentClass != "propaganda"){
        
        selectedDepartament = propagandaData;
        selectedMembers = propagandaMembers;
        console.log(`classiefied`);
        lastSelectedDepartamentClass = selectedDepartamentClass;
        selectedDepartamentClass = "propaganda";
        
        
    }else if(selectedDepartamentClass != "programming"){
        selectedDepartament = programmingData;
        selectedMembers = programmingMembers;
        console.log(`fucking programming`);
        lastSelectedDepartamentClass = selectedDepartamentClass;
        selectedDepartamentClass = "programming";
            
    }

    if(document.querySelector(`.deselected-departament`)){
        document.querySelector(`.deselected-departament`).classList.remove(`deselected-departament`);
    }
    if(document.querySelector(`.selected-departament`)){
        document.querySelector(`.selected-departament`).classList.add(`deselected-departament`);
        document.querySelector(`.selected-departament`).classList.remove(`selected-departament`);
    }
    document.querySelector(`#${selectedDepartamentClass}`).classList.add(`selected-departament`);
    
    
    membersContainer.innerHTML = "";
    for(let i = 0; i < selectedMembers.length; i++){
        membersContainer.innerHTML += selectedMembers[i];
        await new Promise(resolve => setTimeout(resolve, 400));
        if(document.querySelector(`.animation-card`)){
            document.querySelector(`.animation-card`).classList.remove(`animation-card`);
        }else{break}
    }
    searchForEventListeners();
}

function showCaseCard(data, departament){


      document.querySelector(`body`).innerHTML += `
        <div id="showcase-container">
          <img id="showcase-img" src="/chess-OnServer/site/!sources/img_svg/showcase_image.svg" alt="">
          <img id="showcase-member-picture" src="${data[1]}" alt="">
          <img id="showcase-name-svg" src="/chess-OnServer/site/!sources/img_svg/showcasea_name.svg" alt="">
          <p id="showcase-departament">${departament}</p>
          <p id="showcase-name">${data[0]}</p>
          <p id="showcase-description">${data[2]}</p>
          <img id="showcase-description-svg" src="/chess-OnServer/site/!sources/img_svg/showcase_description.svg" alt="">
        </div> 
      `;

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
    departaments();
    }
}

