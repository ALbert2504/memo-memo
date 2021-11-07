export class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

export class Memory {
  constructor(title, description, image) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.date = new Date().toISOString();
  }
}