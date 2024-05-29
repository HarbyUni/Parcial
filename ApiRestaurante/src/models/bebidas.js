const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bebidaSchema = new Schema({
    id: Number,
    name: String,
    description: String,
    price: String,
    imageUrl: String,
    estado: String
});

const Bebida = mongoose.model('Bebida', bebidaSchema);

module.exports = Bebida;