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
            type: "varchar",
            nullable: true

        },
        telefono: {
            type: "varchar",
            nullable: true

        },
        celular: {
            type: "varchar",
            nullable: true

        },
        email: {
            type: "varchar",
        },
        direccion: {
            type: "varchar",
        },
        nombre_fantasia: {
            type: "varchar",
            nullable: true
        },
        razon_social: {
            type: "varchar",
            nullable: true
        },
        nro_bps: {
            type: "varchar",
            nullable: true
        },
        fecha_afiliacion: {
            nullable: true,
            type: "date"
        },
        fecha_inicio_empresa: {
            type: "date",
            nullable: true
        },
        activa: {
            type: "bool",
            nullable: true
        },
        fecha_baja: {
            type: "date",
            nullable:true
        },
        observaciones: {
            type: "varchar",
            nullable:true

        },
        logo_empresa: {
            type: "varchar",
            nullable:true
        }
    },
    relations: {
        localidad: {
            type: 'many-to-one',
            target: 'localidad',
            joinColumn: true,
            cascade: true,
            onDelete:"SET NULL"
        },

    }
});


module.exports = {
    Empresa
}