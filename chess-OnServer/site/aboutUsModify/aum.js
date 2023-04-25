import {Events} from "/chess-OnServer/site/!modules/eventJSON.js";
import {JoinUs} from "/chess-OnServer/site/!modules/join_us.js";
let joinUS = new JoinUs();//import the modules(i have to move all the ajax in to the modules)
let events = new Events();



let image;
let imageE;
let selectedValue = "programming";
let selectedJSONfile;
let imgS;

const select = document.getElementById('departaments');
const dataCheck = document.querySelector(`#dataCheck`);

window.onload = async () => {//wil get the recruits data and process this for tha stats in the right
  let recruits = await joinUS.getRecruits();//will get the recruits data
  let classes = {"07":0, "08": 0, "09":0, "10":0, "11":0, "12":0}; //there it will get the number of recruits per every class
  let departamentR = {"programming": 0, "building": 0, "propaganda": 0};
  console.log(recruits);
  for(let i = 0; i < Object.keys(recruits).length; i++){
    document.querySelector(`#recruits`).innerHTML += `<section>${recruits[i].name} ${recruits[i].number} ${recruits[i].classPD} ${recruits[i].departament}</section>`;
    departamentR[`${recruits[i].departament}`]++;
    classes[`${recruits[i].classPD.charAt(0)}${recruits[i].classPD.charAt(1)}`]++;
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
}

async function getSponsors(){
    console.log(events.getSponsors())
    let sponsors = await events.getSponsors();

    for(let i = 0;i < Object.keys(sponsors).length; i++){// will add every sponsor png to a card from where we can delete what we need
      console.log(sponsors[i].png)
      document.querySelector(`#sponsors-section-2`).innerHTML += `
      <div class="card-sponsor">
		 		<img id="new-img-sponsor" src="${sponsors[i].png}" alt="${i}">
		 		<img class="del-button-img-sponsor" src="/chess-OnServer/site/!sources/img_svg/close.png" alt="">
		 	</div>
      `
    }
    eventListenerForButtons();
}



async function loadEventsFiles(){
  let jsonValues =await events.getNamesOfEventsJSON()//getting the name of json fiels
  jsonValues.forEach(element => {
    document.querySelector(`#event-file-name`).innerHTML += `<option value="${element}">${element}</option>`
  })
  selectedJSONfile = jsonValues[0];
  return selectedJSONfile;
}
selectedJSONfile = loadEventsFiles();//whill will set default option for files as first option



function newImage(){
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


  $.ajax({
      type:"POST",
      url: "http://localhost:1233/chess-OnServer/server/createMember.php",
      data: {image: image.src, description: description, name: Name, selectedValue: selectedValue},
      success: function(response, status, xhr){
        console.log(response);
      },
      error: function(response, status, xhr){

      }
    });


  }else{
    dataCheck.innerHTML = "check the data, something is missing";
  }
  eventListenerForButtons();
}

function getData(){//will get the json file with all the members and will call showData to process this json
  $.ajax({
    type: "GET",
    url: "http://localhost:1233/chess-OnServer/server/members.json",
    dataType: "json",
    success: function(data) {
      console.log(data);
      showData(data);
    },
    error: function(xhr, status, error) {
      console.error(error);
    }
  });
  eventListenerForButtons();
}
getData();

function showData(data){
  for(let i = 0; i < Object.keys(data).length; i++){

    let img64 = data[i].image;
    
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
    
    let name = data[i].name;
    let description = data[i].description;
    let destionationOfCard;

    if(data[i].departament == "pr"){
      console.log("pr");
      destionationOfCard = "pr";

    }else if(data[i].departament == "programming"){
      console.log("programming");
      destionationOfCard = "programming";
    }else{
      console.log("building");
      destionationOfCard = "building";
    }

    let containerOfcard = document.querySelector(`#${destionationOfCard}`);//will create members cards with the specific data of each one
    containerOfcard.innerHTML +=`
    <div class="card flex">
			<img src="${imgUrl}" class="img">
			<div class="text name">${name}</div>
			<div class="text descript">${description}</div>
			<img src="/chess-OnServer/site/!sources/img_svg/close.png" alt="" class="delete-button">
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
      $.ajax({
        type:"POST",
        url: "http://localhost:1233/chess-OnServer/server/deleteMember.php",
        data: {name: name},
        success: function(response, status, xhr){
          console.log(response);
        },
        error: function(response, status, xhr){
  
        }
      });
    })
  });
}

function newImageEvent(){
  var fileInputE = document.getElementById("image-inpu-event");//from the input block stores the image
  var fileE = fileInputE.files[0];//iw will store the img in a var, not array
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

  $.ajax({
      type:"POST",
      url: "http://localhost:1233/chess-OnServer/server/createEvent.php",
      data: {image: imageE.src, description: descriptionE, file: selectedJSONfile, name: nameE, date: dateE},
      success: function(response, status, xhr){
        console.log(response);
      },
      error: function(response, status, xhr){
      }
    });


  }else{
  }
  eventListenerForButtons();
}

function createNewJSONfile(){//will create a new json file that will be used as a a storage for a year of events
  let JSONname = document.getElementById(`new-json-file-event`).value;
  if(JSONname){
    JSONname += `.json`;
    $.ajax({
      type:"POST",
      url: "http://localhost:1233/chess-OnServer/server/createJSONevent.php",
      data: {JSONN: JSONname},
      success: function(response, status, xhr){
        console.log(response);
      },
      error: function(response, status, xhr){
      }
    });
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

function eventListenerForButtons(){//will "search" for event listeners
  document.querySelector(`#add-img-butt`).addEventListener(`click`,newImage)
  document.querySelector(`#confirm`).addEventListener(`click`,sendData)
  document.querySelector(`#add-img-event-butt`).addEventListener(`click`,newImageEvent)
  document.querySelector(`#createJSONfile`).addEventListener(`click`,createNewJSONfile)
  document.querySelector(`#cofirm-event`).addEventListener(`click`,sendDataEvent)
  document.querySelector(`#add-img-sponsor-butt`).addEventListener(`click`,newImageSponsor)
  document.querySelector(`#confirm-sponsor`).addEventListener(`click`, senSponsor)
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
}


