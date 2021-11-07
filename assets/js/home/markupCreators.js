export class MemoryItem {
  static render([id, item]) {
    return `
      <li class="memories__item" data-id="${id}" id="${id}">
        <a class="memories__item-link" href="#">
          <div class="memories__item_image-container">
            <img class="memories__item_image"
              src="${item.image}" alt="${item.title}">
          </div>
          <div class="memories__item_body">
            <h4 class="memories__item_heading">
              ${item.title}
            </h4>
            <p class="memories__item_description">
              ${item.description}
            </p>
          </div>
          <div class="memories__item_footer">
            <span class="memories__item_date">
              ${item.date}
            </span>
          </div>
        </a>
      </li>
    `;
  }
}