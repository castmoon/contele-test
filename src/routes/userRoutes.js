const { create } = require('domain');
const { Router } = require('express');
const routes = Router();
const fs = require('fs');
const UsersController = require('../controllers/userController');

const readDatabase = () => JSON.parse(fs.readFileSync(`${__dirname}/../database.json`), 'utf-8');

const usersController = new UsersController(readDatabase());


routes.get('/', (req, res) => {
  const users = usersController.listAllUsers();
  return res.status(users.statusCode).json(users.body);
});

routes.get('/:id', (req, res) => {
  const id = req.params.id;
  const user = usersController.listUserById(id);
  return res.status(user.statusCode).json(user.body);
});

routes.post('', (req, res) => {
  const createdUser = usersController.createUser({email, password} = req.body);
  return res.status(createdUser.statusCode).json(createdUser.body);
});

routes.put('/:id', (req, res) => {
  const id = req.params.id;
  const updatedUser = usersController.updateUser(id, { password } = req.body);
  return res.status(updatedUser.statusCode).json(updatedUser.body);
});

routes.delete('/:id', (req, res) => {
  const id = req.params.id;
  const responseOfDeletedUser =  usersController.deleteUser(id);
  res.status(responseOfDeletedUser.statusCode).json(responseOfDeletedUser.body);
});

routes.delete('/', (req, res) => {
  const responseOfDeletedUsers = usersController.deleteAllUsers();
  res.status(responseOfDeletedUsers.statusCode).json(responseOfDeletedUsers.body);
});


module.exports = routes;
