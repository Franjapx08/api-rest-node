
const { Schema, model } = require('mongoose');

const PublicacionSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatorio'],
    },
    fechaCreacion: {
        type: String,
        default: Date()
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

PublicacionSchema.methods.toJSON = function() {
    const { __v, _id, ...publicacion  } = this.toObject();
    publicacion.uid = _id;
    return publicacion;
}

module.exports = model( 'Publicacion', PublicacionSchema );
