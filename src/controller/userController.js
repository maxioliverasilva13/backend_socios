const { request, response } = require("express")
const { User } = require("../entity/user")
const { Localidad } = require("../entity/localidad")
const jwt = require("jsonwebtoken");

const { getRepository, Like } = require("typeorm")
const { generateJWT } = require("../helpers/jwt")

const getUsers = async (req = request, res = response) => {
    //select from
    try {
        const user = await getRepository(User).find();
        if (user) {
            const userReturn = user.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    last_name: e.last_name,
                    photo: e.photo,
                    name_user: e.name_user,
                    email: e.email,
                    estado: e.estado
                }
            })
            return res.json({ ok: true, data: userReturn })

        } else {
            return res.json({ ok: false, msg: "Error al obtener usuario" })
        }
    } catch (error) {
        return res.json({ ok: false, msg: "Contacte con el desarrollador" })
    }
}

const login = async (req = request, res = response) => {
    try {
        const user = await getRepository(User).findOne({ where: { email: req.body.email, password: req.body.password }, relations: ["rol", "localidad"] });
        if (user) {
            const token = await generateJWT(user.id, user.email);
            return res.json({
                ok: true,
                id: user.id,
                name: user.name,
                last_name: user.last_name,
                photo: user.photo,
                name_user: user.name_user,
                email: user.email,
                rol: user.rol,
                localidad: user.localidad,
                token
            })
        } else {
            return res.json({ ok: false, msg: "Credenciales incorrectas" })
        }

    } catch (error) {
        console.log(error)
        return res.json({ ok: false, error: "Contacte con el desarrollador" })
    }
}

const renewToken = async (req, res = response) => {
    const { id, email } = req;
    const token = await generateJWT(id, email);
    res.json({
        ok: true,
        id,
        email,
        token
    })
}

const signUpWithG = async (req = request, res = response) => {
    try {
        const userEmail = await getRepository(User).findOne({ email: req.body.email });
        if (userEmail) {
            return res.json({
                ok: false,
                msg: "El email ya existe"
            })
        } else {
            const Newuser = await getRepository(User).create(req.body);
            const resultado = await getRepository(User).save(Newuser);
            return res.json({
                ok: true,
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({ msg: "Contacte con el desarrollador" })
    }
}


const getTokenWithG = async (req = request, res = response) => {
    try {
        const user = await getRepository(User).findOne({ email: req.body.email });
        if (user) {
            console.log("llego")
            console.log(req.body)
            const token = await generateJWT(user.id, user.email);
            return res.json({
                ok: true,
                id: user.id,
                name: user.name,
                last_name: user.last_name,
                photo: user.photo,
                name_user: user.name_user,
                email: user.email,
                rol: user.rol,
                localidad: user.localidad,
                token
            })
        } else {
            return res.json({
                ok: false,
                msg: "Credenciales invalidas"
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({ ok: true, msg: "Contacte con el desarrollador" })
    }
}



const createUser = async (req = request, res = response) => {
    try {
        console.log("LLego")
        const locality = await getRepository(Localidad).findOne(req.body.localidadId);
        if (!locality) {
            return res.json({
                ok: false,
                msg: "NO existe la localidad indicada"
            })
        }
        const userEmail = await getRepository(User).findOne({ email: req.body.email });
        console.log(userEmail);
        if (userEmail) {
            return res.json({
                ok: false,
                msg: "El email ya existe"
            })
        }
        const Newuser = await getRepository(User).create(req.body);
        const resultado = await getRepository(User).save(Newuser);
        const token = await generateJWT(resultado.id, resultado.email);

        return res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error)
        return res.json({ ok: true, msg: "Contacte con el desarrollador" })
    }
}
const getDataUser = async (req = request, res = response) => {
    try {
        const usuario = await getRepository(User).findOne(req.params.id);
        if (!usuario) {
            return res.json({
                ok: false,
                msg: "No existe el usuario que desea consultar"
            })
        } else {
            console.log(usuario)
            return res.json({
                ok: true,
                usuario: {
                    id: usuario.id,
                    name: usuario.name,
                    last_name: usuario.last_name,
                    photo: usuario.photo,
                    name_user: usuario.name_user,
                    email: usuario.email,
                    estado: usuario.estado
                }
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: "Contacte con el desarrollador" })
    }
}



const validarTokenUser = async (req = request, res = response) => {
    try {
        const { token } = req.params
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: "No esta autenticado"
            })
        }
        const { id, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        if (id) {
            const usuario = await getRepository(User).findOne({ where: { id: id }, relations: ["rol", "localidad"] });
            console.log(usuario)
            return res.json({
                ok: true,
                usuario: {
                    id: usuario.id,
                    name: usuario.name,
                    last_name: usuario.last_name,
                    photo: usuario.photo,
                    name_user: usuario.name_user,
                    email: usuario.email,
                    estado: usuario.estado,
                    localidad: usuario.localidad,
                    rol: usuario.rol
                }
            })
        } else {
            return res.status(401).json({ ok: false, msg: "No esta autenticado" })
        }

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: "Token no valido"
        })
    }
}


const searchUser = async (req = request, res = response) => {
    const { text } = req.params
    try {
        const usuarios = await getRepository(User).find({ relations: ["rol", "localidad"], where: [{ name: Like(`%${text}%`) }, { email: Like(`%${text}%`) }, { last_name: Like(`%${text}%`) }, { rol: Like(`%${text}%`) }, { localidad: Like(`%${text}%`) }] })
        res.json({ ok: true, usuarios })
    } catch (error) {
        console.log(error);
        return res.json({ ok: false, msg: "Contacte con el desarrollador" })
    }
}
const updateUser = async (req = request, res = response) => {
    try {
        const usuario = await getRepository(User).findOne({ where: { id: req.params.id }, relations: ["rol", "localidad"] });
        if (!usuario) {
            return res.json({
                ok: false,
                msg: "No existe el usuario que desea editar"
            })
        } else {
            await getRepository(User).update({ id: req.params.id }, { ...req.body });
            return res.json({ ok: true, msg: "Usuario Actualizado" })
        }
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: "Contacte con el desarrollador" })
    }
}
const deleteUser = async (req = request, res = response) => {
    try {
        const usuario = getRepository(User).delete(req.params.id);
        res.json({ ok: true, msg: "Usuario Eliminado Correctamente" })
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: "Contacte con el desarrollador" })
    }
}



module.exports = {
    getUsers,
    createUser,
    searchUser,
    updateUser,
    deleteUser,
    getDataUser,
    login,
    renewToken,
    validarTokenUser,
    signUpWithG,
    getTokenWithG
}
