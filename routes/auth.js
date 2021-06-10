const express = require("express");
const router = express.Router();
const { createUser, login, renew, getUserData } = require("../controller/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middelwares/validar-campos");
const { validarJWt } = require("../middelwares/validar-jwt");
// ------Rutas de usuarios  --- host:/api/auth
router.post("/register",
    //midelware
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es oblogatorio').isEmail(),
        check('password', 'El password debe tener minimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ]
    , createUser)

router.post("/",
    [
        check('email', 'El email es oblogatorio').isEmail(),
        check('password', 'El password debe tener minimo 6 caracteres').isLength({ min: 6 }),
        validarCampos

    ]
    , login)

router.get("/renew",
    [validarJWt]
    , renew)

router.get("/:id",
    [validarJWt]
    , getUserData)




module.exports = router;