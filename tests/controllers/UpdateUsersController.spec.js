const { UpdateUserController } = require('../../src/controllers');
const { NotFoundError, MissingParamError, InvalidParamError } = require('../../src/protocols/errors');
const JsonDatabaseManager = require('../../src/database/JsonDatabaseManager');
const User = require('../../src/models/User');


describe('UpdateUsersController', () => {

    

    const jsonDatabaseManager = new JsonDatabaseManager(`${__dirname}/../mocks/updateDatabase.json`);
    const updateUserController = new UpdateUserController(jsonDatabaseManager);
    
    afterAll(() => {
        updateUserController.databaseManager.deleteAll();
        updateUserController.databaseManager.addUser(new User("0957107ru", "test@test.com", "testPassword123@"))
    });

    test('should throws if no id is provided', () => {
        const updateUserSpy = updateUserController.update('','test_password');
        expect(updateUserSpy.body).toEqual(new MissingParamError('id'));
        expect(updateUserSpy.statusCode).toBe(400);
    });

    test('should throws if no email and no password is provided', () => {
        const updateUserSpy = updateUserController.update('test_id', '');
        expect(updateUserSpy.body).toEqual(new MissingParamError('email & password'));
        expect(updateUserSpy.statusCode).toBe(400);
    });

    test('should throws if an invalid password is provided', () => {
        const updateUserSpy = updateUserController.update('test_id', 'test@test.com','invalid_password');
        expect(updateUserSpy.body).toEqual(new InvalidParamError('password', 'Your password must have at least 8 characters, a capital letter, a lower letter, a number and a special character.'));
        expect(updateUserSpy.statusCode).toBe(400);
    });

    test('should throws if an invalid id is provided', () => {
        const updateUserSpy = updateUserController.update('invalid_id', 'test@test.com','testPassword123@');
        expect(updateUserSpy.body).toEqual(new NotFoundError('user'));
        expect(updateUserSpy.statusCode).toBe(404);
    });

    test('should return sucess if user password successfully updated', () => {
        const updateUserSpy = updateUserController.update('0957107ru', '', 'UpdatedPassword123@');
        const verifyUser = updateUserController.databaseManager.getAllUsers().find(user => user.id === '0957107ru');
        expect(verifyUser.password).toEqual('UpdatedPassword123@');
    });

    test('should return sucess if user email successfully updated', () => {
        const updateUserSpy = updateUserController.update('0957107ru', 'updated@email.com', '');
        const verifyUser = updateUserController.databaseManager.getAllUsers().find(user => user.id === '0957107ru');
        expect(verifyUser.email).toEqual('updated@email.com');
    });

    test('should return sucess if user email and password successfully updated', () => {
        const updateUserSpy = updateUserController.update('0957107ru', 'updated@email.com', 'updatedPassword123@');
        const verifyUser = updateUserController.databaseManager.getAllUsers().find(user => user.id === '0957107ru');
        expect(verifyUser.email).toEqual('updated@email.com');
        expect(verifyUser.password).toEqual('updatedPassword123@');
    });

    test('should return 200 and success message if user updated', () => {
        const updateUserSpy = updateUserController.update('0957107ru', 'updated@email.com', 'updatedPassword123@');
        expect(updateUserSpy.body).toEqual({message: 'user successfully updated'});
        expect(updateUserSpy.statusCode).toBe(200);
    });


});