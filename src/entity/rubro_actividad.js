var EntitySchema = require("typeorm").EntitySchema;

const RubroA = new EntitySchema({
    name: "rubro_a",
    tableName: "rubro_a",
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
    RubroA
}