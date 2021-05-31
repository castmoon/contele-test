const { Router } = require('express');
const routes = Router();
const { ListUsersController, CreateUserController, UpdateUserController, DeleteUserController } = require('../controllers');
const readDatabase = require('../database/databaseLoader');

routes.get('/', (req, res) => {
  const listUsersController = new ListUsersController(readDatabase());
  const users = listUsersController.listAllUsers();
  return res.status(users.statusCode).json(users.body);
});

routes.get('/:id', (req, res) => {
  const id = req.params.id;
  const listUsersController = new ListUsersController(readDatabase());
  const user = listUsersController.listUserById(id);
  return res.status(user.statusCode).json(user.body);
});

routes.post('', async(req, res) => {
  const createUserController = new CreateUserController(readDatabase());
  const createdUser = await createUserController.handle({email, password} = req.body);
  return res.status(createdUser.statusCode).json(createdUser.body);
});

routes.put('/:id', (req, res) => {
  const id = req.params.id;
  const updateUserController = new UpdateUserController(readDatabase());
  const updatedUser = updateUserController.handle(id, { password } = req.body);
  return res.status(updatedUser.statusCode).json(updatedUser.body);
});

routes.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const deleteUserController = new DeleteUserController(readDatabase());
  const responseOfDeletedUser = await deleteUserController.deleteOne(id);
  res.status(responseOfDeletedUser.statusCode).json(responseOfDeletedUser.body);
});

routes.delete('/', (req, res) => {
  const deleteUserController = new DeleteUserController(readDatabase());
  const responseOfDeletedUsers = deleteUserController.deleteAll();
  res.status(responseOfDeletedUsers.statusCode).json(responseOfDeletedUsers.body);
});


module.exports = routes;
