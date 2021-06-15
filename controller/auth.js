const { response } = require("express");
const Usuario = require("../models/UsuarioModel");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const Participants = require("../models/ParticipantsModel")


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

    const { uid, name, urlPhoto } = req;
    const token = await generateJWT(uid, name, urlPhoto);
    res.json({
        ok: true,
        uid,
        name,
        urlPhoto,
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
            usuario: {
                name: usuario.name,
                urlPhoto: usuario.urlPhoto,
                email: usuario.email,
                uid: usuario._id
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: "Usuario no encontradso"
        })
    }
}


const searchUser = async (req, res = response) => {
    const { text } = req.params;
    const { eid } = req.body;
    try {
        const usuario = await Usuario.find();
        const result = [];
        var count = 0;
        await Promise.all(usuario.map(async e => {
            if (e.name.toString().toUpperCase().includes(text.toUpperCase()) || e.email.toString().toUpperCase().includes(text.toUpperCase())) {
                count++;
                const evento = await Participants.find({ $and: [{ uid: e._id }, { eid }] })
                if (count <= 10) {
                    if (evento.length > 0) {
                        result.push({
                            id: e.id,
                            name: e.name,
                            email: e.email,
                            urlPhoto: e.urlPhoto,
                            confirmed: evento[0].confirmed
                        });
                    } else {
                        result.push({
                            id: e.id,
                            name: e.name,
                            email: e.email,
                            urlPhoto: e.urlPhoto,
                            confirmed: null
                        });
                    }
                }


            }
        }));
        if (result.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "No hay resultados para su busqueda"
            })
        }
        res.status(200).json({
            ok: true,
            resultados: result
        })

    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok: false,
            msg: error
        })
    }
}
const tokenValid = (req, res = response) => {
    res.json({
        ok: true,
        msg: "Token Valido"
    })
}

module.exports = {
    createUser,
    login,
    renew,
    getUserData,
    searchUser,
    tokenValid
}