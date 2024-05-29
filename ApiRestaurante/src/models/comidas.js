const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comidaSchema = new Schema({
    id: Number,
    name: String,
    description: String,
    price: String,
    imageUrl: String,
    estado: String
});

const Comida = mongoose.model('Comida', comidaSchema);

module.exports = Comida;