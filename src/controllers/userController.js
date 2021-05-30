const User = require("../models/User");
const fs = require('fs');

class UserController {
  constructor(database) {
    this.database = database;
  }

  listAllUsers() {
    return this.database;
  }

  listUserById(id) {
    const filteredUser = this.database.filter(user => user.id === id);
    return filteredUser;
  }

  createUser({ email, password } = req) {
    let user = new User(4, email, password);
    this.database.push(user);
    fs.writeFileSync(`${__dirname}/../database.json`, JSON.stringify(this.database));
    return user;
  }

}

module.exports = UserController;