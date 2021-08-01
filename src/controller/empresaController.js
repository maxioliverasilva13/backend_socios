const { request, response } = require("express")
const { getRepository, Like } = require("typeorm");
const { Cargo } = require("../entity/cargo");
const { Departamento } = require("../entity/departamento");
const { Empleado } = require("../entity/empleado");
const { Empresa } = require("../entity/empresa");
const { EmpresaRubroA } = require("../entity/empresa_rubroA");
const { Localidad } = require("../entity/localidad");
const { RubroA } = require("../entity/rubro_actividad");
const { User } = require("../entity/user");

const getEmpresas = async (req = request, res = response) => {
    try {
        const empresas = await getRepository(Empresa).find({ relations: ["localidad"] })
        const newEmrpesas = await Promise.all(empresas.map(async e => {
            const rubros = await getRepository(EmpresaRubroA).find({ where: { empresa: e.id }, relations: ["rubro_a"] })
            const empleados = await getRepository(Empleado).find({ where: { empresa: e?.id } })
            if (rubros) {
                return {
                    ...e,
                    rubros: rubros,
                    numEmpleados: empleados.length
                }
            } else {
                return e;
            }
        }))
        return res.json({
            ok: true,
            empresas: newEmrpesas
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}
const getfechaAniversario = async (req = request, res = response) => {
    try {
        const empresas = await getRepository(Empresa).find({ relations: ["localidad"] })
        const fechasAniversario = empresas.map(empresas => { return { fecha: empresas?.fecha_inicio_empresa, nombre: empresas?.nombre_fantasia, email: empresas?.email } })
        return res.json({
            ok: true,
            fechasAniversario
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}

const insertEmpresa = async (req = request, res = response) => {
    try {
        const localidad = await getRepository(Localidad).findOne(req?.body?.localidad);
        if ((req.body.localidad != null) && !localidad) {
            return res.json({
                ok: false,
                msg: "Por favor inserte una localidad valida"
            })
        }
        const logo = (req.body.logo_empresa != "" && req.body.empresa != null) ? req.body.logo_empresa : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
        const empresa = await getRepository(Empresa).create({ ...req.body, logo_empresa: logo, activa: true });
        const resultado = await getRepository(Empresa).save(empresa);
        if (resultado) {
            if (req?.body?.rubroAP) {
                const rubroAE = await getRepository(EmpresaRubroA).create({ empresa: empresa.id, rubro_a: req.body.rubroAP,primary:true });
                const resultado = await getRepository(EmpresaRubroA).save(rubroAE);
            }
            if (req?.body?.rubroAS) {
                const rubroAE = await getRepository(EmpresaRubroA).create({ empresa: empresa.id, rubro_a: req.body.rubroAS,primary:false });
                const resultado = await getRepository(EmpresaRubroA).save(rubroAE);
            }
        }
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

const insertEmpresaEmprendedor = async (req = request, res = response) => {
    try {
        const localidad = await getRepository(Localidad).findOne(req.body.localidad);
        if (!localidad) {
            return res.json({
                ok: false,
                msg: "Por favor inserte una localidad valida"
            })
        }
        const logo = (req.body.logo_empresa != "" && req.body.empresa != null) ? req.body.logo_empresa : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
        const empresa = await getRepository(Empresa).create({ ...req.body, logo_empresa: logo, activa: null });
        const resultado = await getRepository(Empresa).save(empresa);
        if (resultado) {
            if (req?.body?.rubroAP) {
                const rubroAE = await getRepository(EmpresaRubroA).create({ empresa: empresa.id, rubro_a: req.body.rubroAP });
                const resultado = await getRepository(EmpresaRubroA).save(rubroAE);
            }
            if (req?.body?.rubroAS) {
                const rubroAE = await getRepository(EmpresaRubroA).create({ empresa: empresa.id, rubro_a: req.body.rubroAS });
                const resultado = await getRepository(EmpresaRubroA).save(rubroAE);
            }
        }
        const empleado = await getRepository(Empleado).create({ cargo: 2, empresa: empresa.id, user: req.params.emprendedor, estado: null });
        const resultado1 = await getRepository(Empleado).save(empleado);

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
const allowEmpresaEmprendedor = async (req = request, res = response) => {
    try {
        console.log(req.body)
        const empresa = await getRepository(Empresa).findOne({ where: { id: req.body.empresa } });
        const usuario = await getRepository(User).findOne({ where: { id: req.body.user } });
        const cargo = await getRepository(Cargo).findOne({ where: { id: req.body.cargo } });

        if (!empresa || !usuario || !cargo) {
            return res.json({
                ok: false,
                msg: "No existe la empresa  o el usuario que desea editar"
            })
        } else {

            await getRepository(Empresa).update({ id: empresa.id }, { activa: true });
            await getRepository(User).update({ id: usuario.id }, { esemprendedor: false, rol: 3 });
            await getRepository(Empleado).update({ user: usuario.id, empresa: empresa.id, cargo: cargo.id }, { estado: true });
            return res.json({ ok: true, msg: "Usuario Actualizado" })
        }
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}
const deniedEmpresaEmprendedor = async (req = request, res = response) => {
    try {
        const empresa = await getRepository(Empresa).delete({ where: { id: req.body.empresa } });
        const usuario = await getRepository(User).findOne({ where: { id: req.body.user } });
        const cargo = await getRepository(Cargo).findOne({ where: { id: req.body.cargo } });

        if (!empresa || !usuario || !cargo) {
            return res.json({
                ok: false,
                msg: "No existe la empresa  o el usuario que desea editar"
            })
        } else {
            const empresa = await getRepository(Empresa).delete({ id: req.body.user });
            await getRepository(Empresa).update({ id: empresa.id }, { activa: true });
            await getRepository(Empleado).delete({ user: usuario.id, empresa: empresa.id, cargo: cargo.id });
            return res.json({ ok: true, msg: "Usuario Actualizado" })
        }
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}


//TODO : DELETE CASCDE
const deleteEmpresa = async (req = request, res = response) => {
    try {

        const empresa = await getRepository(Empresa).findOne({ where: { id: req.params.empresa }, relations: ["localidad"] });
        if (!empresa) {
            return res.json({
                ok: false,
                msg: "No existe el usuario que desea editar"
            })
        } else {
            const empresa = await getRepository(Empresa).findOne({ where: { id: req.params.empresa }, relations: ["localidad"] });
            const updateEmpresa = await getRepository(Empresa).update({ id: req.params.empresa }, { ...empresa, activa: false, fecha_baja: new Date() });
            console.log(updateEmpresa)
            return res.json({ ok: true, empresa: empresa })
        }
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
            console.log(req.params.empresa)
            const rubros = await getRepository(EmpresaRubroA).find({ where: { empresa: req.params.empresa }, relations: ["empresa", "rubro_a"] })
            const resa = await Promise.all(rubros.map(async e => {
                console.log(e);
                const empresaRubroAP = await getRepository(EmpresaRubroA).createQueryBuilder()
                    .delete()
                    .where("empresa = :id and rubro_a = :id2 ", { id: e?.empresa?.id, id2: e?.rubro_a?.id })
                    .execute();
            }))
            await resa;
            if (req?.body?.rubroAP != null && req.body.rubroAP != "") {
                const rubroA = await getRepository(EmpresaRubroA).create({ rubro_a: req.body.rubroAP, empresa: req.params.empresa ,primary:true})
                const resultado = await getRepository(EmpresaRubroA).save(rubroA);
            }
            if (req?.body?.rubroAS != null && req.body.rubroAS != "") {
                const rubroA = await getRepository(EmpresaRubroA).create({ rubro_a: req.body.rubroAS, empresa: req.params.empresa,primary:false })
                const resultado = await getRepository(EmpresaRubroA).save(rubroA);

            }


            delete req.body.rubroAP;
            delete req.body.rubroAS;
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
        var departamento = null;
        const empresa = await getRepository(Empresa).find({ relations: ["localidad"], where: { id: req.params.empresa } })
        const localidad = await getRepository(Localidad).findOne({ relations: ["departamento"], where: { id: empresa[0]?.localidad?.id } })
        if (localidad) {
            departamento = await getRepository(Departamento).findOne({ where: { id: localidad?.departamento?.id } })
        }
        const newEmrpesas = await Promise.all(empresa.map(async e => {
            const rubros = await getRepository(EmpresaRubroA).find({ where: { empresa: e?.id }, relations: ["rubro_a"] })
            if (rubros) {
                return {
                    ...e,
                    rubros: rubros
                }
            } else {
                return e;
            }
        }))
        return res.json({
            ok: true,
            empresa: newEmrpesas,
            departamento
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
    getDataEmpresa,
    getfechaAniversario,
    insertEmpresaEmprendedor,
    deniedEmpresaEmprendedor,
    allowEmpresaEmprendedor
}
