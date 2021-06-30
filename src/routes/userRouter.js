const express = require("express");
const { getUsers, createUser, searchUser, deleteUser, updateUser, getDataUser, login, renewToken } = require("../controller/userController");
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
router.post("/:text", searchUser);

router.post("/",
    check('email', 'Datos obligatorio').not().isEmpty(),
    check('password', 'Datos obligatorio').not().isEmpty(),
    check('estado', 'Datos obligatorio').not().isEmpty(),
    check('name', 'Datos obligatorio').not().isEmpty(),
    check('last_name', 'Datos obligatorio').not().isEmpty(),
    check('name_user', 'Datos  obligatorio').not().isEmpty(),
    check('rol', 'Datos obligatorio').not().isEmpty(),
    check('localidad', 'Datos obligatorio').not().isEmpty(),
    validarCampos
    , createUser);
router.put("/:id", [validarJWt], updateUser)
router.delete("/:id", [validarJWt], deleteUser)


module.exports = router;



