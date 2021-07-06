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
            type: "varchar",
            nullable: true
        },
        photo: {
            type: "varchar",
            nullable: true
        },
        name_user: {
            type: "varchar",
            nullable: true
        },
        password: {
            type: "varchar",
            nullable: true
        },
        email: {
            type: "varchar",
            unique: true
        },
        estado: {
            type: "bool",
            nullable: true
        },
        telefono: {
            type: "integer",
            nullable: true
        },
        esemprendedor: {
            type: "bool",
            nullable: true
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
            nullable: true,
            onDelete: "CASCADE"
        },
    }
});


module.exports = {
    User
}