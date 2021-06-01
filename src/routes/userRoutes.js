const { Router } = require('express');
const routes = Router();
const { ListUsersController, CreateUserController, UpdateUserController, DeleteUserController } = require('../controllers');

const JsonDatabaseManager = require('../database/JsonDatabaseManager');
const jsonDatabaseManager = new JsonDatabaseManager(`${__dirname}/../database/database.json`);


/**
 * Get all users in json file
 * @return {[User]}         An array of users
 */
routes.get('/', (req, res) => {
  const listUsersController = new ListUsersController(jsonDatabaseManager);
  const users = listUsersController.listAllUsers();
  return res.status(users.statusCode).json(users.body);
});

/**
 * Get a user with their id, in json file
 * @param {string} id The user id
 * @return {User}           The user
 */

routes.get('/:id', (req, res) => {
  const id = req.params.id;
  const listUsersController = new ListUsersController(jsonDatabaseManager);
  const user = listUsersController.listUserById(id);
  return res.status(user.statusCode).json(user.body);
});

/**
 * Create new user in json file
 * @param {string} email The user email you want to create
 * @param {string} password The user password you want to create. The password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character
 * @return {string}         A message that the user was created successfully
 */

routes.post('/', async(req, res) => {
  const { email, password } = req.body;
  const createUserController = new CreateUserController(jsonDatabaseManager);
  const createdUser = await createUserController.createUser(email, password);
  return res.status(createdUser.statusCode).json(createdUser.body);
});

/**
 * Update an existing user in json file
 * @param {string} id The user id
 * @param {string} email The email you want to overwrite
 * @param {string} password the password you want to overwrite. The password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character
 * @return {string}         A message that the user was updated successfully
 */

routes.put('/:id', (req, res) => {
  const id = req.params.id;
  const { email, password } = req.body;
  const updateUserController = new UpdateUserController(jsonDatabaseManager);
  const updatedUser = updateUserController.update(id, email, password);
  return res.status(updatedUser.statusCode).json(updatedUser.body);
});

/**
 * Delete an existing user in json file
 * @param {string} id The user id
 * @return {string}        A message that the user was deleted successfully
 */

routes.delete('/:id', (req, res) => {
  const id = req.params.id;
  const deleteUserController = new DeleteUserController(jsonDatabaseManager);
  const responseOfDeletedUser =  deleteUserController.deleteOne(id);
  res.status(responseOfDeletedUser.statusCode).json(responseOfDeletedUser.body);
});

/**
 * Delete all existing users in json file
 * @return {string}        A message that informs users that it was updated successfully
 */

routes.delete('/', (req, res) => {
  const deleteUserController = new DeleteUserController(jsonDatabaseManager);
  const responseOfDeletedUsers = deleteUserController.deleteAll();
  res.status(responseOfDeletedUsers.statusCode).json(responseOfDeletedUsers.body);
});


module.exports = routes;
