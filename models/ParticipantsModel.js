const { Schema, model } = require('mongoose');

const ParticipantSchema = Schema({
    eid: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: "Eventos",
        required: true
    },
    confirmed: {
        type: Boolean,
        required: false
    },
})

ParticipantSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model("Participantes", ParticipantSchema);