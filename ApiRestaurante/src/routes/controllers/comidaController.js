const Comida = require('../../models/comidas'); // Asegúrate de que la ruta al modelo es correcta

const listFood = async (req, res) => {
    try {
        const comidas = await Comida.find(); // Busca todas las comidas en la base de datos
        res.status(200).json(comidas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las comidas', error: error });
    }
};

const createFood = async (req, res) => {
    try {
        const newFood = new Comida({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            estado: req.body.estado
        });
        const savedFood = await newFood.save(); // Guarda la nueva comida en la base de datos
        res.status(201).json(savedFood);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la comida', error: error });
    }
};

const updateFood = async (req, res) => {
    const { id } = req.params; // Suponemos que el ID se pasa como parámetro en la URL
    const { name, description, price, imageUrl, estado } = req.body;
    try {
        const updatedFood = await Comida.findOneAndUpdate(
            { id: id },
            { name, description, price, imageUrl, estado },
            { new: true } // Retorna el documento modificado
        );
        if (updatedFood) {
            res.status(200).json(updatedFood);
        } else {
            res.status(404).json({ message: 'Comida no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la comida', error: error });
    }
};

module.exports = {
    listFood,
    createFood,
    updateFood
};
