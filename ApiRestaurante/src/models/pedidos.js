const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemPedidoSchema = new Schema({
    idItem: Number,
    tipo: String,
    cantidad: Number,
    comentario: String,
    precioUnitario: Number
});

const pedidoSchema = new Schema({
    idPedido: Number,
    idMesa: Number,
    items: [itemPedidoSchema],
    fecha: String,
    total: String,
    estado: String
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido
