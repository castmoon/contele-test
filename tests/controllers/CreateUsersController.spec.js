const { CreateUserController } = require('../../src/controllers');
const { MissingParamError, InvalidParamError } = require('../../src/protocols/errors');
const JsonDatabaseManager = require('../../src/database/JsonDatabaseManager');


describe('CreateUsersController', () => {
    const jsonDatabaseManager = new JsonDatabaseManager(`${__dirname}/../mocks/createDatabase.json`);
    const createUserController = new CreateUserController(jsonDatabaseManager);

    afterAll(() => {
        jsonDatabaseManager.deleteAll();
    })

    beforeEach(() => {
        jsonDatabaseManager.deleteAll();
    })
    
    
    test('should throws if no email is provided', () => {
        const createUserSpy = createUserController.createUser('', 'test_password');
        expect(createUserSpy.body).toEqual(new MissingParamError('email'));
        expect(createUserSpy.statusCode).toBe(400);
    });

    test('should throws if no password is provided', () => {
        const createUserSpy = createUserController.createUser('test@test.com', '');
        expect(createUserSpy.body).toEqual(new MissingParamError('password'));
        expect(createUserSpy.statusCode).toBe(400);
    });

    test('should throws if an invalid email is provided', () => {
        const createUserSpy = createUserController.createUser('test', 'test_password');
        expect(createUserSpy.body).toEqual(new InvalidParamError('email'));
        expect(createUserSpy.statusCode).toBe(400);
    });

    test('should throws if an invalid password is provided', () => {
        const createUserSpy = createUserController.createUser('test@test.com', 'test_password');
        expect(createUserSpy.body).toEqual(new InvalidParamError('password', 'Your password must have at least 8 characters, a capital letter, a lower letter, a number and a special character.'));
        expect(createUserSpy.statusCode).toBe(400);
    });

    test('should throws if already email exists', () => {
        const jsonDatabaseManager = new JsonDatabaseManager(`${__dirname}/../mocks/usersAlreadyExists.json`);
        const createUserController = new CreateUserController(jsonDatabaseManager);
        const createUserSpy = createUserController.createUser('test@test.com', 'testPassword1@');
        expect(createUserSpy.body).toEqual(new InvalidParamError('email', 'Email already used'));
        expect(createUserSpy.statusCode).toBe(400);
    });

    test('should return success if successfully created user', () => {
        const createUserController = new CreateUserController(jsonDatabaseManager);
        createUserController.createUser('test@test.com', 'testPassword1@');
        const verifyUser = createUserController.databaseManager.getAllUsers().find(user => user.email == 'test@test.com');
        expect(verifyUser).toBeTruthy();
    });

    test('should return 200 and success if successfully created user', () => {
        const createUserController = new CreateUserController(jsonDatabaseManager);
        const createUserSpy = createUserController.createUser('test@test.com', 'testPassword1@');
        expect(createUserSpy.body).toBe('User successfully created');
        expect(createUserSpy.statusCode).toBe(200);
    });
});