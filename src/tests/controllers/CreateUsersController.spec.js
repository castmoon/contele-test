const { CreateUserController } = require('../../controllers');
const { NotFoundError, MissingParamError, InvalidParamError } = require('../../protocols/errors');


describe('CreateUsersController', () => {

    const makeCreateUserController = () => {
        return new CreateUserController([]);
    }
    test('should throws if no email is provided', () => {
        const createUserController = makeCreateUserController();
        const createUserSpy = createUserController.handle('', 'test_password');
        expect(createUserSpy.body).toEqual(new MissingParamError('email'));
        expect(createUserSpy.statusCode).toBe(400);
    });

    test('should throws if no password is provided', () => {
        const createUserController = makeCreateUserController();
        const createUserSpy = createUserController.handle('test@test.com', '');
        expect(createUserSpy.body).toEqual(new MissingParamError('password'));
        expect(createUserSpy.statusCode).toBe(400);
    });

    test('should throws if an invalid email is provided', () => {
        const createUserController = makeCreateUserController();
        const createUserSpy = createUserController.handle('test', 'test_password');
        expect(createUserSpy.body).toEqual(new InvalidParamError('email'));
        expect(createUserSpy.statusCode).toBe(400);
    });

    test('should throws if an invalid password is provided', () => {
        const createUserController = makeCreateUserController();
        const createUserSpy = createUserController.handle('test@test.com', 'test_password');
        expect(createUserSpy.body).toEqual(new InvalidParamError('password', 'Your password must have at least 8 characters, a capital letter, a lower letter, a number and a special character.'));
        expect(createUserSpy.statusCode).toBe(400);
    });

    test('should throws if already email exists', () => {
        const createUserController = new CreateUserController([{
            "id": "test_id",
            "email": "test@test.com",
            "password": "password"
        }])
        const createUserSpy = createUserController.handle('test@test.com', 'testPassword1@');
        expect(createUserSpy.body).toEqual(new InvalidParamError('email', 'Email already used'));
        expect(createUserSpy.statusCode).toBe(400);
    });
});