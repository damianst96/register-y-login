const { check } = require("express-validator");

const validationRegister = [
    check("username").notEmpty().withMessage("Debes completar el nombre de usuario").bail()
    .isLength({min: 5}).withMessage("El nombre de usuario debe tener como mínimo 5 caracteres").bail(),

    check("email").notEmpty().withMessage("Debes completar el e-mail").bail()
    .isEmail().withMessage("Debes colocar un e-mail válido").bail(),

    check("password").notEmpty().withMessage("Debes completar la contraseña").bail()
    .isLength({min: 5}).withMessage("La contraseña debe tener como mínimo 5 caracteres").bail(),

    check("repPassword").notEmpty().withMessage("Debes reintroducir la contraseña").bail()
    .isLength({min: 5}).withMessage("La contraseña debe tener como mínimo 5 caracteres").bail()
]

module.exports = validationRegister;