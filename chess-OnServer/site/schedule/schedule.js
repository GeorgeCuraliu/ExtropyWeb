import {Events} from "/chess-OnServer/site/!modules/eventJSON.js";
let events = new Events();//import the modules(i have to move all the ajax in to the modules)

//i will check the credentials to verify that the person who is accessing this page is admin
window.onload = async () => {
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
      window.location.href = `/chess-OnServer/site/main/main.php`
  }
} else {
  window.location.href = `/chess-OnServer/site/main/main.php`
}
}

var value_title_idea;
var value_text_idea;

document.addEventListener('DOMContentLoaded', function() {
  button_add();
});

function button_add() {
  let add_buttons = document.querySelectorAll(".card-add-button");
  add_buttons.forEach(add_button => {
    add_button.addEventListener(`click`, ()=>{
      let section = add_button.closest(`.sections`);
      let card_container = section.querySelector(`.card-container`);
      card_container.innerHTML +=
        `   <div class="new-card">
              <div class="new-card-section">
                 <h3>title</h3>
                 <input class="new-card-input" id="get-title-idea" type="text">
              </div>
              <div class="new-card-section">
                <h3>text</h3>
                <input class="new-card-input" id="get-text-idea" type="text">
                <button id="confirm-adding-new-card" class="confirm-add-card">Create</button>
              </div>
            </div>`;
      add_button.disabled = true;
      search_for_buttons();
    });
  });
  
}

function search_for_buttons(){
  search_for_delete_buttons();
  search_for_move_right_functions();
  search_for_left_arrow();
  search_confirm_new_card();
}



function search_confirm_new_card(){

var confirm_new_card = document.querySelectorAll(`.confirm-add-card`);
confirm_new_card.forEach(confirm_new_card =>{
  confirm_new_card.addEventListener(`click`, ()=>{
   var title_input_idea = document.getElementById("get-title-idea").value;//geting the title and text values
   var text_input_idea = document.getElementById("get-text-idea").value;
   let container =  confirm_new_card.closest(`.card-container`);
   //let new_card = container.querySelector(`.new-card`);
   container.innerHTML += 
   `<div class="card">
   <div class="left-card">
      <div class="card-title">${title_input_idea}</div>
      <div class="card-content">${text_input_idea}</div>
  </div>
  <div class="right-card">
      <div class="card-creator">creator</div>
      <div class="buttons-idea-container">
      <button id="move-left" class="button-idea fas fa-reply"></button>
      <button id="delete" class="button-idea fas fa-trash"></button>
      <button id="move-right" class="button-idea fas fa-share"></button>
  </div>
   </div>
  </div>`;
    container.removeChild(container.querySelector(`.new-card`));//has to be container.querySelector(`.new-card`), either it will not fin the element
    container.querySelector(`.card-add-button`).disabled = false;
    search_for_buttons();
  })
})


}


//the delete card button from tasks
function search_for_delete_buttons(){
    let delete_buttons = document.querySelectorAll("#delete");//there it search for delete butons
    delete_buttons.forEach(delete_buttons =>{//for each button it adds a event listener
      delete_buttons.addEventListener(`click`, ()=>{
      let card = delete_buttons.closest(`.card`);//when the event listener trigered, it will delete the card
      card.remove();  
      search_for_buttons();  
  })  
})
}

function search_for_move_right_functions(){
  let next_arrow = document.querySelectorAll("#move-right");
  next_arrow.forEach(next_arrow =>{
    next_arrow.addEventListener(`click`, ()=>{
      let card = next_arrow.closest(`.card`);
      let parent_section = card.closest(`.sections`);
      let next_section = parent_section.nextElementSibling;//selecting the next section card from next element
      let next_container = next_section.querySelector(`.card-container`);
      let card_copy = card.cloneNode(true); // Create a copy of the card element
      next_container.appendChild(card_copy);
      card.remove();//id removes from the current container
      search_for_buttons();
    })
  })
}
function search_for_left_arrow(){
  let left_arrow = document.querySelectorAll("#move-left");
  left_arrow.forEach(left_arrow =>{
    left_arrow.addEventListener(`click`, ()=>{
      let card = left_arrow.closest(`.card`);
      let parent_section = card.closest(`.sections`);
      let next_section = parent_section.previousElementSibling;
      let next_container = next_section.querySelector(`.card-container`);
      let card_copy =  card.cloneNode(true);
      next_container.appendChild(card_copy);
      card.remove();
      search_for_buttons();
    })
  })
}






















