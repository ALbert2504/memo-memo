// Imports
import { authApi } from "./util/api/index.js";
import { validateAuthForm, isFormValid } from "./util/helpers.js";
import { User } from "./util/models.js";

// Elements
const $signInForm = document.querySelector('.sign-in__form');
const $signInInputs = document.querySelectorAll('.sign-in__input');

// Data
const fields = {
  firstName: {
    value: '',
    touched: false,
    valid: false,
  },
  lastName: {
    value: '',
    touched: false,
    valid: false,
  },
  email: {
    value: '',
    touched: false,
    valid: false,
  },
  password: {
    value: '',
    touched: false,
    valid: false,
  },
  confirmPassword: {
    value: '',
    touched: false,
    valid: false,
  },
};

// Listeners
$signInForm.addEventListener('submit', submitForm);
$signInInputs.forEach((signInInput) => {
  signInInput.addEventListener('input', handleInput);
});

// Listener functions
function submitForm(e) {
  e.preventDefault();

  const {
    firstName: { value: firstName, valid: firstNameValid },
    lastName: { value: lastName, valid: lastNameValid },
    email: { value: email, valid: emailValid },
    password: { value: password, valid: passwordValid },
    confirmPassword: { valid: confirmPasswordValid },
  } = fields;

  const isValid = isFormValid(firstNameValid, lastNameValid, emailValid, passwordValid, confirmPasswordValid);

  const data = new User(firstName, lastName, email);
  
  if (isValid) {
    authApi.signUp(email, password, data);
  } else {
    alert('Please fill all the fields correctly');
  }
}

function handleInput(e) {
  const { name, value } = e.target;
  fields[name].value = value;
  fields[name].touched = true;
  fields[name].valid = validateAuthForm(name, value, fields.password.value);
  console.log(fields);

  checkValidity(fields[name].touched, fields[name].valid, e.target);
}

// Checkers
function checkValidity(touched, valid, signInInput) {
  if (!touched) {
    signInInput.classList.remove('valid');
    signInInput.classList.remove('invalid');
  } else {
    if (valid) {
      signInInput.classList.add('valid');
      signInInput.classList.remove('invalid');
    } else {
      signInInput.classList.remove('valid');
      signInInput.classList.add('invalid');
    }
  }
}
