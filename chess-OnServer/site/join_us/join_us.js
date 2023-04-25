import {JoinUs} from "/chess-OnServer/site/!modules/join_us.js"
let joinUs = new JoinUs();


let departament;
function departamentEventListener(){//will add event listeners to the departament option and call a function that will add the colored border so you knwo what departament did you choose
    console.log("A")
    document.querySelector(`#programming`).addEventListener(`click`, function() {
        departamentChoice(`programming`);
    });
    document.querySelector(`#propaganda`).addEventListener(`click`, function() {
        departamentChoice(`propaganda`);
    });
      
    document.querySelector(`#building`).addEventListener(`click`, function() {
        departamentChoice(`building`);
    });
}


document.querySelector(`footer p`).addEventListener(`click`, () => {//will verify if the data isnt undefined or null, and then will send the data to the server trought module
    let name = document.querySelector(`#name`).value;
    let reason = document.querySelector(`#reason`).value;
    let classPD = document.querySelector(`#classPD`).value;
    let number = document.querySelector(`#number`).value;
    if(name && reason && classPD && number && departament){
        joinUs.sendData(name, reason, classPD, number, departament);
    }
})

function departamentChoice(dep){
    if(departament){ document.querySelector(`#${departament}`).classList.remove(`selected`); }
    departament = dep;
    document.querySelector(`#${departament}`).classList.add(`selected`);
    return departament;
}
document.onload = departamentEventListener();