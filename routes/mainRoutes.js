const mainController = require("../controllers/mainController");
const express = require("express");
const router = express.Router();
const User = require("../data/models/User");

/* MIDDLEWARES */
const validationRegister = require("../middlewares/registerMW");
const validationLogin = require("../middlewares/loginMW");
const uploadFile = require("../middlewares/multerMW");
const guestMiddleware = require("../middlewares/guestMW");
const authMiddleware = require("../middlewares/authMW");


/* PÁGINA PRINCIPAL */
router.get("/", mainController.index);


/* PÁGINA DE LOGIN */
router.get("/login", guestMiddleware, mainController.login);
/* PROCESO DE LOGIN */
router.post("/login", validationLogin, mainController.loginProcess);


/* PÁGINA DE REGISTRO */
router.get("/register", guestMiddleware, mainController.register);
/* PROCESO DE REGISTRO */
router.post("/register", validationRegister, mainController.registerProcess);


/* PERFIL DE USUARIO LOGUEADO */
router.get("/profile", authMiddleware, mainController.profile);


/* LOGOUT */
router.get("/logout", mainController.logout);

module.exports = router;