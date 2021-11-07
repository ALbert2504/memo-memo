// Imports
import { authApi } from "../util/api/index.js";

// Elements
const $headerUserName = document.querySelector('.header__user-name');

// Globals
const accesToken = localStorage.getItem('access_token');
const uid = localStorage.getItem('user_id');
let user = JSON.parse(localStorage.getItem('user_data'));

// Accesibility
window.addEventListener('load', contentLoaded);



// Listener functions
function contentLoaded() {
  if(!accesToken || !uid) {
    location.href = 'index.html';
  } else {
    if(!user) {
      getUser();
    } else {
      renderUser();
    }
  }
}

// Render functions
function renderUser() {
  $headerUserName.innerHTML = `${user.firstName} ${user.lastName}`;
}

// Serving functions
async function getUser() {
  try {
    const response = await authApi.getUser(uid);
  
    user = response;
    renderUser();
  } catch (error) {
    console.log(error);
  }
}