import {
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  numberRegexp,
  emailRegexp,
} from "./constants.js";

export const validateAuthForm = (name, value, passwordValue = '') => {
  switch(name) {
    case firstName: {
      return !numberRegexp.test(value) && value.length >= 2;
    } 
    case lastName: {
      return !numberRegexp.test(value) && value.length >= 2;
    }
    case email: {
      return emailRegexp.test(value);
    }
    case password: {
      return value.length >= 8;
    }
    case confirmPassword: {
      return value === passwordValue;
    }
    default: {
      return false;
    }
  }
}

export const isFormValid = (...values) => values.every(Boolean);

export const createLoader = (markup) => {
  const laoderWrapper = document.createElement('div');
  laoderWrapper.setAttribute('class', 'loader__wrapper');
  laoderWrapper.innerHTML = markup;
  return laoderWrapper;
}