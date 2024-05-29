const Pedido = require('../../models/pedidos'); // Asegúrate de que la ruta al modelo es correcta

const listarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find(); // Busca todos los pedidos en la base de datos
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pedidos', error: error });
    }
};

const agregarPedido = async (req, res) => {
    try {
        const newPedido = new Pedido({
            idPedido: req.body.idPedido,
            idMesa: req.body.idMesa,
            items: req.body.items,
            fecha: req.body.fecha,
            total: req.body.total,
            estado: req.body.estado
        });
        const savedPedido = await newPedido.save(); // Guarda el nuevo pedido en la base de datos
        res.status(201).json(savedPedido);
    } catch (error) {
        res.status(400).json({ message: 'Error al agregar el pedido', error: error });
    }
};

const cambiarEstadoPedido = async (req, res) => {
    const { idPedido } = req.params; // Suponemos que el ID del pedido se pasa como parámetro en la URL
    const { estado } = req.body;
    try {
        const updatedPedido = await Pedido.findOneAndUpdate(
            { idPedido: idPedido },
            { estado: estado },
            { new: true } // Retorna el documento modificado
        );
        if (updatedPedido) {
            res.status(200).json(updatedPedido);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al cambiar el estado del pedido', error: error });
    }
};

module.exports = {
    listarPedidos,
    agregarPedido,
    cambiarEstadoPedido
};
