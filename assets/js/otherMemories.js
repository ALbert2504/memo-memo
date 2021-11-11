// Imports
import { memoryApi } from './util/api/index.js';
import { squaresLoader } from './util/ui/loaders/index.js';
import { setHtmlFromArray } from './util/helpers.js';
import { MemoryItem } from './util/markupCreators.js';

// Elements
const $otherMemoriesListWrapper = document.querySelector('.other-memories__list-wrapper');
const $memoriesList = $otherMemoriesListWrapper.querySelector('.memories__list');

// Listeners
window.addEventListener('load', getAllMemories);

// Listener functions
async function getAllMemories() {
  squaresLoader.showLoader($otherMemoriesListWrapper);
  const memories = await memoryApi.getAllMemories();
  setHtmlFromArray($memoriesList, memories, MemoryItem.render);
  squaresLoader.hideLoader();
}