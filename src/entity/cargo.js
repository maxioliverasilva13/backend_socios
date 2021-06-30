var EntitySchema = require("typeorm").EntitySchema;

const Cargo = new EntitySchema({
    name: "cargo",
    tableName: "cargo",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
        },
    }

});


module.exports = {
    Cargo
}