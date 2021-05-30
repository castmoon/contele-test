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
    const filteredUser = this.database.find(user => user.id === id);
    return filteredUser;
  }

  createUser({ email, password }) {
    const generatedId = Math.random().toString(32).substr(2,9)
    let user = new User(generatedId, email, password);
    this.database.push(user);
    fs.writeFileSync(`${__dirname}/../database.json`, JSON.stringify(this.database), 'utf-8');
    return user;
  }

  updateUser(id, {password}) {
    const indexOfUser = this.database.findIndex(user => user.id === id);
    this.database[indexOfUser].password = password;
    fs.writeFileSync(`${__dirname}/../database.json`, JSON.stringify(this.database), 'utf-8');
  }

}

module.exports = UserController;