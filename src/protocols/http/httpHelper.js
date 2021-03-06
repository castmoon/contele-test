const { ServerError } = require('../errors');

const badRequest = error => ({
    statusCode: 400,
    body: error
});

const notFound = error => ({
    statusCode: 404,
    body: error
});

const serverError = error => ({
    statusCode: 500,
    body: new ServerError()
});

module.exports = { badRequest, serverError, notFound };
