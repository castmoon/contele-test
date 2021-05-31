const validator = require('email-validator');

function emailValidator(email) {
    return validator.validate(email);
}

module.exports = emailValidator;