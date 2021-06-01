const fs = require('fs');

class JsonDatabaseManager {
    constructor(databasePath) {
        this._path = databasePath;
    }
    _writeFile(data) {
        return fs.writeFileSync(this._path, JSON.stringify(data), 'utf-8');
    }

    _readFile() {
        const databaseValue = JSON.parse(fs.readFileSync(this._path), 'utf-8');
        return databaseValue;
    }

    getAllUsers() {
        return this._readFile();
    }
    getUserById(id) {
        const filteredUser = this._readFile().find(user => user.id === id);
        return filteredUser;
    }

    addUser(user) {
        const users = this.getAllUsers();
        const newUsers = [...users, user];
        return this._writeFile(newUsers);
    }

    updateUser(user) {
        const { id } = user;
        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex === -1) return;
        users[userIndex] = user;
        return this._writeFile(users);
    }

    deleteAll() {
        return this._writeFile([]);
    }

    deleteOne(id) {
        const users = this.getAllUsers();
        const filteredUsers = users.filter(u => u.id !== id);
        return this._writeFile(filteredUsers);
    }
}

module.exports = JsonDatabaseManager;