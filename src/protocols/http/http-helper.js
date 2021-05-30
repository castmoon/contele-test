const badRequest = error => ({
    statusCode: 400,
    body: error
});

module.exports = badRequest;
