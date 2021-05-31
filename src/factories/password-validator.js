function passwordValidator(password) {
    const passwordValidation = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$").test(password);
    return passwordValidation;
}

module.exports = passwordValidator;