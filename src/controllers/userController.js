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

}

module.exports = UserController;