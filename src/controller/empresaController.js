const { request, response } = require("express")
const { getRepository, Like } = require("typeorm");
const { Empleado } = require("../entity/empleado");
const { Empresa } = require("../entity/empresa");
const { Localidad } = require("../entity/localidad");

const getEmpresas = async (req = request, res = response) => {
    try {
        const empresas = await getRepository(Empresa).find({ relations: ["localidad"] })
        return res.json({
            ok: true,
            empresas
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}
const insertEmpresa = async (req = request, res = response) => {
    try {
        const localidad = await getRepository(Localidad).findOne(req.body.localidad);
        if (!localidad) {
            return res.json({
                ok: false,
                msg: "Por favor inserte una localidad valida"
            })
        }

        const empresa = await getRepository(Empresa).create(req.body);
        const resultado = await getRepository(Empresa).save(empresa);
        return (resultado) ?
            res.json({
                ok: true,
                msg: "Empresa añadido Correctamente a esta empresa",
                id: empresa.id
            })
            :
            res.json({
                ok: true,
                msg: "No se pudo añadir empresa"
            })

    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}
//TODO : DELETE CASCDE
const deleteEmpresa = async (req = request, res = response) => {
    try {
        const empresaDelete = await getRepository(Empresa).createQueryBuilder()
            .delete()
            .where("id = :id ", { id: req.params.empresa })
            .execute();
        res.json({
            ok: true,
            msg: "Empresa eliminaad correctamente"
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}


const updateEmpresa = async (req = request, res = response) => {
    try {
        const empresa = await getRepository(Empresa).findOne({ where: { id: req.params.empresa } });
        if (!empresa) {
            return res.json({
                ok: false,
                msg: "No existe la empresa que desea editar"
            })
        } else {
            await getRepository(Empresa).update({ id: req.params.empresa }, { ...req.body });
            return res.json({ ok: true, msg: "Usuario Actualizado" })
        }
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}
const searchEmpresa = async (req = request, res = response) => {
    try {
        const empresas = await getRepository(Empresa).find({ relations: ["localidad"], where: [{ direccion: Like(`%${req.params.text}%`) }, { email: Like(`%${req.params.text}%`) }, { rut: Like(`%${req.params.text}%`) }, { razon_social: Like(`%${req.params.text}%`) }, { nombre_fantasia: Like(`%${req.params.text}%`) }] })
        return res.json({
            ok: true,
            empresas
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermosos" })
    }
}

const getDataEmpresa = async (req = request, res = response) => {
    try {
        const empresa = await getRepository(Empresa).find({ relations: ["localidad"], where: { id: req.params.empresa } })
        return res.json({
            ok: true,
            empresa
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermosos" })
    }
}

const searchEmpresaAndEmpleado = async (req = request, res = response) => {
    try {
        const empresas = await getRepository(Empresa).find({ relations: ["localidad"], where: [{ direccion: Like(`%${req.params.text}%`) }, { email: Like(`%${req.params.text}%`) }, { rut: Like(`%${req.params.text}%`) }, { razon_social: Like(`%${req.params.text}%`) }, { nombre_fantasia: Like(`%${req.params.text}%`) }] })
        const empresasEstado = Promise.all(empresas.map(async e => {
            const empleo = await getRepository(Empleado).findOne({ where: { user: req.body.uid, empresa: e.id } })
            if (empleo) {
                return {
                    ...e,
                    solicitud: (empleo?.estado || !!!empleo.estado)
                }
            } else {
                return e;
            }

        }));
        const empresaEstado = await empresasEstado;
        return res.json({
            ok: true,
            empresaEstado
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermosos" })
    }
}



module.exports = {
    getEmpresas,
    insertEmpresa,
    deleteEmpresa,
    updateEmpresa,
    searchEmpresa,
    searchEmpresaAndEmpleado,
    getDataEmpresa
}
