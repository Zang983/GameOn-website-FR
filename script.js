let modalVisibility = false;
// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".btn-submit")
// Form Element for validity Check
const subscribeForm = document.forms[0]
let formValidate = false;

document.querySelector(".icon").addEventListener("click", () => editNav())
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
/**
 * Toggle the visibility of modal form
 */
function toggleModal() {
  modalVisibility = !modalVisibility
  if (modalVisibility) {
    modalbg.style.display = "block";
  }
  else {
    modalbg.style.display = "none";
  }
}
/**
 * Check if one radiobox is checked
 * @param {[HTMLElement]} arrayLocation 
 * @returns {boolean}
 */
function checkLocationChecked(arrayLocation) {
  for (let location of arrayLocation) {
    if (location.checked === true) {
      return true
    }
  }
  return false
}
/**
 * Function to display an error's message for each false block
 * @param {string} message 
 * @param {HTMLElement} parent 
 */
function displayErrorMessage(message, parent) {
  parent.setAttribute("data-error", message)
  parent.setAttribute("data-error-visible", "true")

}
/*
At each submit form reset alert message
*/
function resetErrorMessage() {
  for (let field of subscribeForm.querySelectorAll(".formData")) {
    field.removeAttribute("data-error-visible")
  }
}
/**
 * Check each field of inscription form
 * @returns {boolean}
 */
function checkForm() {
  let lastname = subscribeForm.querySelector("#lastname")
  let firstname = subscribeForm.querySelector("#firstname")
  let nameRegex = new RegExp(/[0-9^\&\~\#\(\)\@\]\[\|\$\µ\!\§\;\\\/]/)
  let email = subscribeForm.querySelector("#email")
  let regexEmail = new RegExp(/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,15}$/)
  let birthdate = subscribeForm.querySelector("#birthdate")
  let quantity = subscribeForm.querySelector("#quantity")
  let quantityValue = parseInt(quantity.value, 10)
  let cgu = subscribeForm.querySelector("#checkbox1")
  validity = true

  /* Check lastname & firstname*/
  if (firstname.value.length < 2 || firstname.value === null || nameRegex.test(firstname.value.trim())) {
    displayErrorMessage("Votre prénom doit avoir plus de deux caractères et ne pas contenir de chiffre", firstname.parentNode)
    validity = false
  }
  if (lastname.value.length < 2 || lastname.value === null || nameRegex.test(lastname.value.trim())) {
    displayErrorMessage("Votre nom doit avoir plus de deux caractères et ne pas contenir de chiffre", lastname.parentNode)
    validity = false
  }
  /* Test email with regex*/
  if (!regexEmail.test(email.value.trim())) {
    displayErrorMessage("Vérifier la validité de votre adresse e-mail", email.parentNode)
    validity = false
  }
  if (birthdate.value === "" || new Date(birthdate.value) > new Date()) {
    if (birthdate.value != "") {
      displayErrorMessage("Vous devez être né pour participer !", birthdate.parentNode)
    }
    else {
      displayErrorMessage("Vous devez saisir votre date de naissance", birthdate.parentNode)
    }

    validity = false
  }
  /* Check quantity */
  if (quantityValue < 0 || quantityValue > 100 || isNaN(quantityValue)) {
    displayErrorMessage("Vous devez indiquer un nombre entre 0 et 100", quantity.parentNode)
    validity = false
  }
  /* Check location*/
  if (!checkLocationChecked(subscribeForm.querySelectorAll("input[type=radio]"))) {

    displayErrorMessage("Vous devez sélectionner un tournoi", subscribeForm.querySelectorAll("input[type=radio]")[0].parentNode)
    validity = false
  }
  if (!cgu.checked) {
    displayErrorMessage("Vous devez accepter les CGU pour vous inscrire.", subscribeForm.querySelector("#checkbox1").parentNode)
    validity = false
  }
  return validity;
}
/**
 * Delete confirm message when user close modal after a valid submit
 */
function deleteConfirmDisplay() {
  let confirmBtn = document.querySelector(".btn-confirm")
  let confirmMessage = document.querySelector(".confirmMessage")
  formValidate = false
  if (confirmBtn != null && confirmMessage != null) {
    document.querySelector(".modal-body").removeChild(confirmBtn);
    document.querySelector(".modal-body").removeChild(confirmMessage);
  }

}
/**
 * Confirm signup
 */
function displayConfirm() {
  let body = document.querySelector(".modal-body");
  document.querySelector("form").style.display = "none";
  let confirmMessage = document.createElement("p");
  confirmMessage.setAttribute("class", "confirmMessage");
  confirmMessage.innerText = "Merci pour votre inscription";
  let newBtn = document.createElement("button");
  newBtn.setAttribute("class", "btn-confirm");
  newBtn.innerText = "Fermer";
  body.appendChild(confirmMessage);
  body.appendChild(newBtn);
  newBtn.addEventListener("click", () => {
    deleteConfirmDisplay();
    resetForm();
  })
}
function resetForm() {
  let form = document.querySelector("form")
  form.style.display = "block";
  form.reset();
  toggleModal();
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", () => toggleModal()))
// close modal event
closeBtn.addEventListener("click", () => {
  if (formValidate) {
    deleteConfirmDisplay();
    resetForm()
  }
  else {
    toggleModal()
  }

});

submitBtn.addEventListener("click", event => {
  resetErrorMessage()
  event.preventDefault();
  if (checkForm()) {
    formValidate = true;
    displayConfirm();
  }
})

