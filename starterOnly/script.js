let modalVisibility = false;

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal form
function toggleModal() {
  modalVisibility = !modalVisibility
  if(modalVisibility){
    modalbg.style.display = "block";
  }
  else{
    modalbg.style.display = "none";
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click",()=>toggleModal()))
// close modal event
closeBtn.addEventListener("click", ()=>toggleModal());




