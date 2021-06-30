var EntitySchema = require("typeorm").EntitySchema;

const Empresa = new EntitySchema({
    name: "empresa", // Will use table name `post` as default behaviour.
    tableName: "empresa", // Optional: Provide `tableName` property to override the default behaviour for table name. ,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        rut: {
            type: "varchar",
            unique: true,
        },
        nro_referencia: {
            type: "integer",
        },
        telefono: {
            type: "integer",
        },
        celular: {
            type: "integer",
        },
        email: {
            type: "varchar",
        },
        direccion: {
            type: "varchar",
        },
        nombre_fantasia: {
            type: "varchar",
        },
        razon_social: {
            type: "varchar",
        },
        nro_bps: {
            type: "integer",
        },
        fecha_afiliacion: {
            type: "date"
        },
        fecha_inicio_empresa: {
            type: "date"
        },
        activa: {
            type: "bool"
        },
        fecha_baja: {
            type: "date"
        },
        observaciones: {
            type: "varchar"
        },
        logo_empresa: {
            type: "varchar",
        }
    },
    relations: {
        localidad: {
            type: 'many-to-one',
            target: 'localidad',
            joinColumn: true,
            cascade: true
        },

    }
});


module.exports = {
    Empresa
}