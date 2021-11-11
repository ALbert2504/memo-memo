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

    const arr = this.#transformObjectToArray(responseData);
    return arr.map(this.#transformArr);
  }

  async getAllMemories() {
    const response = await fetch(`${BASE_URL}${this.#endpoint}.json?auth=${this.#accessToken}`);
    const responseData = await response.json();

    return this.#transformObjectsToArrays(responseData);
  }

  #transformObjectToArray(obj) {
    if(!Object.entries(obj)) {
      return [];
    }

    return Object.entries(obj).map(([key, value]) => {
      return {
        id: key,
        ...value
      };
    });
  }

  #transformObjectsToArrays(obj) {
    return Object.entries(obj).map(([key, value]) => {
      return Object.entries(value).map(([childKey, childValue]) => {
        return {
          userId: key,
          id: childKey,
          ...childValue,
        };
      });
    }).flat(1);
  }
  
  #transformArr(memory) {
    return {
      ...memory,
      date: new Date(memory.date).toLocaleDateString(),
    };
  }
}

export default new Memory;