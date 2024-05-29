const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    Nombre: { type: String, required: true },  // Uso de mayúscula inicial para coincidir con tus datos
    Apellidos: { type: String, required: true },
    Rol: {
        type: String,
        required: true,
        enum: ['Admin', 'Mesero', 'Cosinero'], // Asegúrate de que estos roles coincidan con los que necesitas
        default: 'Admin'
    },
    Usuario: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'], // Asumiendo que solo usas estos dos estados
        default: 'Activo'
    }
});

// Crear el modelo a partir del esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
