const { request, response } = require("express")
const { getRepository, Like } = require("typeorm");
const { Cargo } = require("../entity/cargo");
const { Empleado } = require("../entity/empleado");
const { Empresa } = require("../entity/empresa");
const { Localidad } = require("../entity/localidad");
const { User } = require("../entity/user");

const getEmpleadosXEmpresa = async (req = request, res = response) => {
    try {
        const empleados = await getRepository(Empleado).find({ relations: ["cargo", "user", "empresa"], where: { empresa: req.params.empresa, estado: true } })
        const localidad = await getRepository(Localidad).findOne()
        return res.json({
            ok: true,
            empleados: empleados
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}
const insertEmpleado = async (req = request, res = response) => {
    try {
        const empresa = await getRepository(Empresa).findOne(req.body.empresa);
        const cargo = await getRepository(Cargo).findOne(req.body.cargo);
        const user = await getRepository(User).findOne(req.body.user);

        if (!user || !cargo || !empresa) {
            return res.json({
                ok: false,
                msg: "Empresa,cargo o usuario incorrecto"
            })
        }

        const empleado = await getRepository(Empleado).create(req.body);
        const resultado = await getRepository(Empleado).save(empleado);
        return (resultado) ?
            res.json({
                ok: true,
                msg: "Empleado añadido Correctamente a esta empresa"
            })
            :
            res.json({
                ok: false,
                msg: "No se pudo añadir su empleado a esta empresa"
            })

    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}


const crearEmpleadoNuevo = async (req = request, res = response) => {
    try {
        const empresa = await getRepository(Empresa).findOne(req.params.empresa);
        const cargo = await getRepository(Cargo).findOne(req.params.cargo);
        const locality = await getRepository(Localidad).findOne(req.body.Localidad);
        const userEmail = await getRepository(User).findOne({ email: req.body.email });
        if (userEmail) {
            return res.json({
                ok: false,
                msg: "El email ya existe"
            })
        }
        const Newuser = await getRepository(User).create(req.body);
        const NewUserCreated = await getRepository(User).save(Newuser);

        if (!NewUserCreated || !cargo || !empresa || !locality) {
            return res.json({
                ok: false,
                msg: "Empresa,cargo o usuario incorrecto",

            })
        }
        const empleado = await getRepository(Empleado).create({ cargo: req.body.cargo, empresa: req.body.empresa, user: NewUserCreated.id, estado: true });
        const resultado = await getRepository(Empleado).save(empleado);

        //send email
        return (resultado) ?
            res.json({
                ok: true,
                msg: "Empleado añadido Correctamente a esta empresa"
            })
            :
            res.json({
                ok: true,
                msg: "No se pudo añadir su empleado a esta empresa"
            })

    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}

// router.post("/:text", searchUser);


const allowEmployed = async (req = request, res = response) => {
    try {
        const empresa = await getRepository(Empresa).findOne(req.body.empresa);
        const cargo = await getRepository(Cargo).findOne(req.body.cargo);
        const user = await getRepository(User).findOne(req.body.user);

        if (!user || !cargo || !empresa) {
            return res.json({
                ok: false,
                msg: "Empresa,cargo o usuario incorrecto"
            })
        }
        else {
            await getRepository(Empleado).update({ user: req.body.user, empresa: req.body.empresa, cargo: req.body.cargo }, { ...req.body, estado: true });
            return res.json({ ok: true, msg: "Empleado añadido a la empresa" })
        }
    } catch (error) {
        console.log(error)
    }
}


const searchEmpleado = async (req = request, res = response) => {
    const { text, empresa } = req.body;
    try {
        const usuarios = await getRepository(User).find({ relations: ["rol", "localidad"], where: [{ name: Like(`%${text}%`) }, { email: Like(`%${text}%`) }, { last_name: Like(`%${text}%`) }, { rol: Like(`%${text}%`) }, { localidad: Like(`%${text}%`) }] })
        const empleadosFIlter = Promise.all(usuarios.map(async e => {
            console.log(e)
            const empleado = await getRepository(Empleado).findOne({ where: { user: e.id, empresa: empresa }, relations: ["user", "cargo", "empresa"] })
            return (empleado) ? { empleado, rol: e.rol, localidad: e.localidad } : null
        }))
        const empleados = await (await empleadosFIlter).filter(e => e != null);
        res.json({ ok: true, empleados })
    } catch (error) {
        console.log(error);
        return res.json({ ok: false, msg: "Contacte con el desarrollador" })
    }

}


const deleetEmpleado = async (req = request, res = response) => {
    try {
        const empresaRubro = await getRepository(Empleado).createQueryBuilder()
            .delete()
            .where("user = :id and empresa= :id2 and cargo = :id3", { id: req.body.user, id2: req.body.empresa, id3: req.body.cargo })
            .execute();
        res.json({
            ok: true,
            msg: "Empleado eliminado correctamente"
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}


const getEmpleadoSolicitudes = async (req = request, res = response) => {
    try {
        const empleos = await getRepository(Empleado).find({ relations: ["empresa"], where: { user: req.params.user } })
        return res.json({
            ok: true,
            empleos
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}

module.exports = {
    getEmpleadosXEmpresa,
    insertEmpleado,
    deleetEmpleado,
    crearEmpleadoNuevo,
    getEmpleadoSolicitudes,
    allowEmployed,
    searchEmpleado
}
