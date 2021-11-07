import { BASE_URL } from '../../config.js';

class Memory {
  #accessToken = localStorage.getItem('access_token');
  #uid = localStorage.getItem('user_id');
  #endpoint = 'memories';

  async createMemory(data) {
    const response = await fetch(`${BASE_URL}${this.#endpoint}/${this.#uid}.json?auth=${this.#accessToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    console.log(responseData);

    return responseData;
  }

  async getMemories() {
    const response = await fetch(`${BASE_URL}${this.#endpoint}/${this.#uid}.json?auth=${this.#accessToken}`);
    const responseData = await response.json();

    return responseData;
  }
}

export default new Memory;