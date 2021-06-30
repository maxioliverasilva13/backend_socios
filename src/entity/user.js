var EntitySchema = require("typeorm").EntitySchema;

const User = new EntitySchema({
    name: "users", // Will use table name `post` as default behaviour.
    tableName: "users", // Optional: Provide `tableName` property to override the default behaviour for table name. 
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
        },
        last_name: {
            type: "varchar"
        },
        photo: {
            type: "varchar",
        },
        name_user: {
            type: "varchar",
        },
        password: {
            type: "varchar",
        },
        email: {
            type: "varchar",
            unique: true
        },
        estado: {
            type: "bool",
        },
        telefono: {
            type: "integer",
        },
        esemprendedor: {
            type: "bool",
        },
    },
    relations: {
        rol: {
            type: 'many-to-one',
            target: 'rol',
            joinColumn: true,
        },
        localidad: {
            type: 'many-to-one',
            target: 'localidad',
            joinColumn: true,
            cascade: true,
            onDelete: "CASCADE"
        },
    }
});


module.exports = {
    User
}