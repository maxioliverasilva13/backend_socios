const { request, response } = require("express")
const { getRepository, Like } = require("typeorm");
const { Cargo } = require("../entity/cargo");
const { Empleado } = require("../entity/empleado");
const { Empresa } = require("../entity/empresa");
const { User } = require("../entity/user");

const getEmpleadosXEmpresa = async (req = request, res = response) => {
    try {
        const empleados = await getRepository(Empleado).find({ relations: ["cargo", "user", "empresa"], where: { empresa: req.params.empresa } })
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
                ok: true,
                msg: "No se pudo añadir su empleado a esta empresa"
            })

    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
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


module.exports = {
    getEmpleadosXEmpresa,
    insertEmpleado,
    deleetEmpleado
}
