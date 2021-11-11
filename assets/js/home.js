// Imports
import { memoryApi } from './util/api/index.js';
import { isFormValid } from './util/helpers.js';
import { Memory } from './util/models.js';
import { MemoryItem } from './util/markupCreators.js';
import { diagramLoader } from './util/ui/loaders/index.js';
import { setHtmlFromArray } from './util/helpers.js';

// Elements
const $memoriesForm = document.querySelector('.memories__form');
const $memoriesFields = $memoriesForm.querySelectorAll('.memories__field');
const $memoriesAttach = $memoriesForm.querySelector('.memories__attach');
const $memoriesUpload = $memoriesForm.querySelector('.memories__upload');
const $memoriesImageWrapper = $memoriesForm.querySelector('.memories__image-wrapper');
const $memoriesImage = $memoriesImageWrapper.querySelector('.memories__image');
const $memoriesImageRemove = $memoriesImageWrapper.querySelector('.memories__image_remove');
const $memoriesListWrapper = document.querySelector('.memories__list-wrapper');
const $memoriesList = $memoriesListWrapper.querySelector('.memories__list');

// Data
const fields = {
  title: '',
  description: '',
  image: null,
};

// Listeners
$memoriesForm.addEventListener('submit', submitForm);
$memoriesFields.forEach((memoryField) => {
  memoryField.addEventListener('input', handleInput);
});
$memoriesUpload.addEventListener('change', handleUpload);
$memoriesImageRemove.addEventListener('click', handleRemoveImage);
window.addEventListener('load', getMemories);

// Listener functions
async function submitForm(e) {
  e.preventDefault();
  const { title, description, image } = fields;
  const isValid = isFormValid(...Object.values(fields));

  const memory = new Memory(title, description, image);

  if (isValid) {
    await memoryApi.createMemory(memory);
    await getMemories();
  } else {
    alert('Make sure you filld all the fields and uploaded an image.');
  }
}

function handleInput(e) {
  const { name, value } = e.target;

  fields[name] = value;
  console.log(fields);
}

function handleUpload(e) {
  const { files } = e.target;
  console.log(files, 'files');

  if (files && files[0]) {
    const file = files[0];
    const reader = new FileReader();

    reader.addEventListener('load', imageIsLoaded);
    reader.readAsDataURL(file);
  }

  function imageIsLoaded(e) {
    renderImage(e.target.result);
    fields.image = e.target.result;
  }
}

function handleRemoveImage() {
  $memoriesImage.src = '';
  $memoriesImageWrapper.classList.add('memories__image-wrapper--hidden');
  $memoriesAttach.classList.remove('memories__attach--hidden');
  fields.image = null;
}

async function getMemories() {
  diagramLoader.showLoader($memoriesListWrapper);
  const memories = await memoryApi.getMemories();
  console.log(memories);
  setHtmlFromArray($memoriesList, memories, MemoryItem.render);
  diagramLoader.hideLoader();
}

// Key functions
function renderImage(image) {
  $memoriesImage.src = image;
  $memoriesImageWrapper.classList.remove('memories__image-wrapper--hidden');
  $memoriesAttach.classList.add('memories__attach--hidden');
}