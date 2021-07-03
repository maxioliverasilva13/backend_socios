const express = require("express");
const { getUsers, createUser, searchUser, deleteUser, updateUser, getDataUser, login, renewToken, validarTokenUser, loginG, getTokenWithG, signUpWithG } = require("../controller/userController");
const router = express.Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middelwars.js/validar_campos");
const { validarJWt } = require("../middelwars.js/validar_jwr");

router.get("/", getUsers);
router.post("/login",
    check('email', 'Datos obligatorio').not().isEmpty(),
    check('password', 'Datos obligatorio').not().isEmpty(),
    validarCampos
    , login);

router.get("/renew", [validarJWt], renewToken)

router.get("/:id", [validarJWt], getDataUser)

router.get("/validarToken/:token", validarTokenUser)

router.post("/signInWithG", getTokenWithG)

router.post("/signUpWithG", signUpWithG)

router.get("/search/:text", searchUser);

router.post("/",
    check('email', 'Datos obligatorio').not().isEmpty(),
    check('name', 'Datos obligatorio').not().isEmpty(),
    validarCampos
    , createUser);
router.post("/signupwithG",
    check('email', 'Datos obligatorio').not().isEmpty(),
    check('name', 'Datos obligatorio').not().isEmpty(),
    validarCampos
    , createUser);
router.put("/:id", [validarJWt], updateUser)
router.delete("/:id", [validarJWt], deleteUser)


module.exports = router;



