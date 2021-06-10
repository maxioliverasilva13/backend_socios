const { response } = require("express");
const Usuario = require("../models/UsuarioModel");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");


const createUser = async (req, res = response) => {
    const { name, email, password, urlPhoto } = req.body;

    try {
        let usuario = await Usuario.findOne({ email: email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario ya existe con ese correo"
            })
        }
        usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save();
        //generar jwt
        const token = await generateJWT(usuario.id, usuario.name, usuario.urlPhoto);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            email: usuario.email,
            url: usuario.urlPhoto,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el admin"
        })

    }
}

const login = async (req, res = response) => {

    const { email, password } = req.body

    try {
        const usuario = await Usuario.findOne({ email: email });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "Credenciales Incorrectas"
            })
        }
        //confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password no valido"
            })
        }
        const token = await generateJWT(usuario.id, usuario.name, usuario.urlPhoto);
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            email: usuario.email,
            url: usuario.urlPhoto,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el admin"
        })

    }


}


const renew = async (req, res = response) => {

    const { uid, name, url } = req;
    const token = await generateJWT(uid, name, url);
    console.log(urlPhoto)
    res.json({
        ok: true,
        uid,
        name,
        url,
        token
    })
}


const getUserData = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado"
            })
        }
        res.status(200).json({
            ok: true,
            usuario
        })

    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: "Usuario no encontradso"
        })
    }
}

module.exports = {
    createUser,
    login,
    renew,
    getUserData
}