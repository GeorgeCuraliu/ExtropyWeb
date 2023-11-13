import axios from "https://cdn.skypack.dev/axios";
import {Events} from "../!modules/eventJSON.js";
let events = new Events();//import the modules(i have to move all the ajax in to the modules)




let image;
let imageE;
let selectedValue = "programming";
let selectedJSONfile;
let imgS;

const select = document.getElementById('departaments');
const dataCheck = document.querySelector(`#dataCheck`);

//i will check the credentials to verify that the person who is accessing this page is admin
var cookie = document.cookie;
if(cookie){
  var getVal = cookie.split("=");
  var credentials = getVal[1].split(" ");
  var name = credentials[0];
  var password = credentials[1];
  let response = await events.logIn(name, password);
  if(response.trim() === 'true' || response.trim() === 'member') {
      console.log(`Hi ${name}, welcome back`)
  } else {
      window.location.href = `../site/main/main.php`
  }
} else {
  window.location.href = `../site/main/main.php`
}


async function getRecruitsData(){//wil get the recruits data and process this for tha stats in the right
  let recruits = await events.getRecruits();//will get the recruits data
  let classes = {"07":0, "08": 0, "09":0, "10":0, "11":0, "12":0}; //there it will get the number of recruits per every class
  let departamentR = {"programming": 0, "building": 0, "propaganda": 0};
  console.log(recruits);
  for(let i = 0; i < Object.keys(recruits).length; i++){
    document.querySelector(`#recruits`).innerHTML += `<section>${recruits[i].name} ${recruits[i].number} ${recruits[i].classPD} ${recruits[i].departament}</section>`;
    departamentR[`${recruits[i].departament}`]++;
    classes[`${recruits[i].class.charAt(0)}${recruits[i].class.charAt(1)}`]++;
  }
  console.log(departamentR);
  console.log(classes);
  let totalClasses = classes[`07`] + classes[`08`] + classes[`09`] + classes[`10`] + classes[`11`] + classes[`12`];//calculates the percent per recruit so it can do the stats
  let percentPerRecruit = 100 / totalClasses;
  document.getElementById(`7`).style.width = `${classes[`07`] * percentPerRecruit}%`;
  document.getElementById(`8`).style.width = `${classes[`08`] * percentPerRecruit}%`;
  document.getElementById(`9`).style.width = `${classes[`09`] * percentPerRecruit}%`;
  document.getElementById(`10`).style.width = `${classes[`10`] * percentPerRecruit}%`;
  document.getElementById(`11`).style.width = `${classes[`11`] * percentPerRecruit}%`;
  document.getElementById(`12`).style.width = `${classes[`12`] * percentPerRecruit}%`;

  let totalDep = departamentR[`programming`] + departamentR[`building`] + departamentR[`propaganda`];
  let percentPerDepR = 100 / totalDep;
  document.getElementById(`programmingR`).style.width = `${departamentR[`programming`] * percentPerDepR}%`;
  document.getElementById(`buildingR`).style.width = `${departamentR[`building`] * percentPerDepR}%`;
  document.getElementById(`propagandaR`).style.width = `${departamentR[`propaganda`] * percentPerDepR}%`;

  //there i will call all the function that get data
  getSponsors();
  loadMessages(); //the ones from the message section
}

async function loadMessages(){
  console.log("getting messages");
  let messages = await axios.get("http://localhost:5432/getMessages");
  console.log(messages)
  let messageContainer = document.querySelector(`#message-section`);
  for(let i = 0; i < messages.data.length; i++){
    console.log(messages.data.length);
    messageContainer.innerHTML += `<img class="message" src="${messages.data[i].image}" alt="">`
  }
}


async function getSponsors(){
    console.log(events.getSponsors())
    let sponsors = await events.getSponsors();
    console.log("sponsors retrieved");
    for(let i = 0;i < sponsors.length; i++){// will add every sponsor png to a card from where we can delete what we need
      document.querySelector(`#sponsors-section-2`).innerHTML += `
      <div class="card-sponsor">
		 		<img id="new-img-sponsor" src="${sponsors[i].image}" alt="${sponsors[i].key}">
		 		<img class="del-button-img-sponsor" src="../!sources/img_svg/close.png" alt="">
		 	</div>
      `
    }
    eventListenerForButtons();
}



async function loadEventsFiles(){
  let jsonValues = await events.getNamesOfEventsJSON()//getting the name of json fiels
  jsonValues.forEach(element => {
    document.querySelector(`#event-file-name`).innerHTML += `<option value="${element}">${element}</option>`
  })
  selectedJSONfile = jsonValues[0];
  return selectedJSONfile;
}
selectedJSONfile = loadEventsFiles();//whill will set default option for files as first option



function newImage(){
  console.log("image member")
  var fileInput = document.getElementById("imageInput");//from the input block stores the image
  var file = fileInput.files[0];//it will store the img in a var, not array
  if(file){
    var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        image = new Image();
        image.src = reader.result; // Store the image data in a variable that is was processed
        // Display the image in the div element
        var uploadedImage = document.getElementById("new-img");//the img
        uploadedImage.src = image.src;
    }
  }
  eventListenerForButtons();
}
select.addEventListener('change', (event) => {
  selectedValue = event.target.value;
  console.log('Selected value:', selectedValue);
});

function sendData(){//send new member to the server
  let description = document.querySelector(`#description`).value;//gets the description and name values
  let Name = document.querySelector(`#name`).value;
  if(image && description && Name){
    dataCheck.innerHTML = "everything fine";
    console.log(image.src);

    axios.post("http://localhost:5432/addMember", {image: image.src, description: description, name: Name, departament: selectedValue})
    .then(response=>{
      console.log(response.data);
      dataCheck.innerHTML = "new member added";
    })


  }else{
    dataCheck.innerHTML = "check the data, something is missing";
  }
  eventListenerForButtons();
}

async function getData(){//will get the json file with all the members and will call showData to process this json
  showData(await events.getMembers());
}
getData();

function showData(data){
  console.log(data)
  for(let i = 0; i < data.length; i++){

    let containerOfcard = document.querySelector(`#${data[i].departament}`);//will create members cards with the specific data of each one
    containerOfcard.innerHTML +=`
    <div class="card flex">
			<img src="${data[i].image}" class="img">
			<div class="text name">${data[i].name}</div>
			<div class="text descript">${data[i].description}</div>
			<img src="../!sources/img_svg/close.png" alt="" class="delete-button">
		</div>
    `;

  }
  searchForDeleteButtons();

}

function searchForDeleteButtons(){//this will send the data from a card that was selected to be deleted to the server
  const delBut = document.querySelectorAll(`.delete-button`);
  delBut.forEach(element => {
    element.addEventListener(`click`, () => {
      let name = element.closest('.card').querySelector(`.name`).innerHTML;
      console.log(name);
      axios.post("http://localhost:5432/deleteMember", {name: name})
      .then(res => console.log(res));
    })
  });
}

function newImageEvent(){
  var fileInputE = document.getElementById("image-inpu-event");//from the input block stores the image
  var fileE = fileInputE.files[0];//iw will store the img in a var, not array
  console.log("image event")
  if(fileE){
    var readerE = new FileReader();
      readerE.readAsDataURL(fileE);
      readerE.onload = function() {
        imageE = new Image();
        imageE.src = readerE.result; // Store the image data in a variable that is was processed
        // Display the image in the div element
        var uploadedImageE = document.getElementById("new-img-event");//the container
        uploadedImageE.src = imageE.src;
    }
  }
}

function sendDataEvent(){//send new member to the server
  let descriptionE = document.querySelector(`#announcement`).value;//gets the description and name values
  let nameE = document.querySelector(`#event-name`).value;
  let dateE = document.querySelector(`#event-date`).value;
  console.log(nameE)
  console.log("Aa");
  if(imageE && descriptionE && nameE && dateE){
    console.log(selectedJSONfile);

    axios.post("http://localhost:5432/addEvent", {image: imageE.src, description: descriptionE, file: selectedJSONfile, name: nameE, date: dateE})
    .then(res => console.log(res));

  }else{
  }
  eventListenerForButtons();
}

function createNewJSONfile(){//will create a new json file that will be used as a a storage for a year of events
  let JSONname = document.querySelector(`#new-json-file-event`).value;
  console.log(JSONname + "creating new json file")
  if(JSONname){
    axios.post("http://localhost:5432/createYOE", {YOE: JSONname});
  }
  eventListenerForButtons();
}

function newImageSponsor(){
  var fileInputS = document.getElementById("image-inpu-sponsor");//from the input block stores the image
  var fileS = fileInputS.files[0];//it will store the img in a var, not array
  console.log(fileS)
  if(fileS){
    console.log("a")
    var readerS = new FileReader();
      readerS.readAsDataURL(fileS);
      readerS.onload = function() {
        image = new Image();
        image.src = readerS.result; // Store the image data in a variable that is was processed
        // Display the image in the div element
        var uploadedImageS = document.getElementById("new-img-sponsor");//the img
        uploadedImageS.src = image.src;
        imgS = image.src
        return imgS;
    }
  }
  eventListenerForButtons();
}
function senSponsor(){
  console.log("A")
  events.sendSponsorPng(imgS);
}

function deleteRecruits(){
  console.log("delete recruits");
  events.deleteRecruits();
}
async function accountUser(){
  console.log(document.querySelector(`#account-user`).value, false)
  let reponse = await events.accountType(document.querySelector(`#account-user`).value, "true");//will get the response from the server and siaply in paragraph
  document.querySelector(`#response-paragraph-account`).innerHTML = reponse;
}
async function accountMember(){
  console.log(document.querySelector(`#account-member`).value, true)
  let reponse = await events.accountType(document.querySelector(`#account-member`).value, "extropy");
  document.querySelector(`#response-paragraph-account`).innerHTML = reponse;
}
function eventListenerForButtons(){//will "search" for event listeners
  document.querySelector(`#add-img-butt`).addEventListener(`click`,newImage)
  document.querySelector(`#confirm`).addEventListener(`click`,sendData)
  document.querySelector(`#add-img-event-butt`).addEventListener(`click`,newImageEvent)
  document.querySelector(`#createJSONfile`).addEventListener(`click`,createNewJSONfile)
  document.querySelector(`#cofirm-event`).addEventListener(`click`,sendDataEvent)
  document.querySelector(`#add-img-sponsor-butt`).addEventListener(`click`,newImageSponsor)
  document.querySelector(`#confirm-sponsor`).addEventListener(`click`, senSponsor)
  document.querySelector(`#delete-recruits`).addEventListener(`click`, deleteRecruits)
  document.querySelector(`#event-file-name`).addEventListener(`change`, (event) => {//the change prob dont get triggered twice(nice)
    console.log(event.target.value);
    selectedJSONfile = event.target.value;
  })
  document.querySelectorAll(`.del-button-img-sponsor`).forEach(element => {//will search for delete buttons from sponsor cards and will add event listeners that will delete that sponsor by theuir index that is added as alt, prob i shoudl use other attribute
    element.addEventListener(`click`, () => {
      let index = element.closest('.card-sponsor').querySelector(`#new-img-sponsor`).getAttribute('alt');
      console.log(index);
      events.deleteSponsor(index)
    })
  })
  document.querySelector(`#confirm-account-user`).addEventListener(`click`, accountUser);//this 2 event listeners will call a function that, trought module, will send to the server the name of the user and will change its type of account, so new members will be "members" in my db too
  document.querySelector(`#confirm-account-member`).addEventListener(`click`, accountMember);//i have to call another function for this so the anaonymous dont repeat twice
}
eventListenerForButtons()
getRecruitsData();
