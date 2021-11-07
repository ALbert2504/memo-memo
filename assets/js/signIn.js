// Imports
import { authApi } from "./util/api/index.js";

// Elements
const $signInForm = document.querySelector('.sign-in__form');
const $signInInputs = document.querySelectorAll('.sign-in__input');

// Data
const fields = {
  email: '',
  password: ''
};

// Listeners
$signInForm.addEventListener('submit', submitForm);
$signInInputs.forEach((signInInput) => {
  signInInput.addEventListener('input', handleInput);
});

// Listener functions
function submitForm(e) {
  e.preventDefault();
  const {email, password} = fields;

  if(!!email.trim() && !!password.trim()) {
    authApi.signIn(email, password);
  } else {
    alert('Fields can\'t be empty');
  }
}

function handleInput(e) {
  const {name, value} = e.target;

  fields[name] = value;
}