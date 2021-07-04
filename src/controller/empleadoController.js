const { request, response } = require("express")
const { getRepository, Like } = require("typeorm");
const { Cargo } = require("../entity/cargo");
const { Empleado } = require("../entity/empleado");
const { Empresa } = require("../entity/empresa");
const { Localidad } = require("../entity/localidad");
const { User } = require("../entity/user");

const getEmpleadosXEmpresa = async (req = request, res = response) => {
    try {
        const empleados = await getRepository(Empleado).find({ relations: ["cargo", "user", "empresa"], where: { empresa: req.params.empresa } })
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
        const empresa = await getRepository(Empresa).findOne(req.params.empresa);
        const cargo = await getRepository(Cargo).findOne(req.params.cargo);
        const user = await getRepository(User).findOne(req.params.user);

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
    getEmpleadoSolicitudes
}
