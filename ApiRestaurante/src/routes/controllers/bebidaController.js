const Bebida = require('../../models/bebidas'); // Asegúrate de que la ruta al modelo es correcta

const listDrinks = async (req, res) => {
    try {
        const bebidas = await Bebida.find(); // Busca todas las bebidas en la base de datos
        res.status(200).json(bebidas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las bebidas', error: error });
    }
};

const createDrinks = async (req, res) => {
    try {
        // El cuerpo de la solicitud espera un array de objetos bebida
        const drinkPromises = req.body.map(drinkData => {
            const newDrink = new Bebida({
                id: drinkData.id,
                name: drinkData.name,
                description: drinkData.description,
                price: drinkData.price,
                imageUrl: drinkData.imageUrl,
                estado: drinkData.estado
            });
            return newDrink.save(); // Devuelve la promesa de guardar la bebida
        });

        const savedDrinks = await Promise.all(drinkPromises); // Ejecuta todas las promesas en paralelo
        res.status(201).json(savedDrinks); // Devuelve todas las bebidas guardadas
    } catch (error) {
        res.status(400).json({ message: 'Error al crear las bebidas', error: error });
    }
};


const updateDrinks = async (req, res) => {
    const { id } = req.params; // Suponemos que el ID se pasa como parámetro en la URL
    const { name, description, price, imageUrl, estado } = req.body;
    try {
        const updatedDrink = await Bebida.findOneAndUpdate(
            { id: id },
            { name, description, price, imageUrl, estado },
            { new: true } // Retorna el documento modificado
        );
        if (updatedDrink) {
            res.status(200).json(updatedDrink);
        } else {
            res.status(404).json({ message: 'Bebida no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la bebida', error: error });
    }
};

module.exports = {
    listDrinks,
    createDrinks,
    updateDrinks
};
