const Usuario = require('../../models/Usuarios'); // Asegúrate de que la ruta al modelo es correcta

// Iniciar sesión de un usuario
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await Usuario.findOne({ Usuario: username, Password: password });
        if (user) {
            res.status(200).json({ message: 'Usuario autenticado con éxito', user: user });
        } else {
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error });
    }
};

// Obtener un usuario por ID
const getUserid = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Usuario.findById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error: error });
    }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await Usuario.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error });
    }
};

const createUser = async (req, res) => {
   
    try {
        // Asumiendo que req.body es un array de usuarios
        const userPromises = req.body.map(userData => {
            const newUser = new Usuario({
                id: userData.id,
                Nombre: userData.Nombre,
                Apellidos: userData.Apellidos,
                Rol: userData.Rol,
                Usuario: userData.Usuario,
                Password: userData.Password,
                Estado: userData.Estado
            });
            return newUser.save();
        });

        const savedUsers = await Promise.all(userPromises);
        res.status(201).json(savedUsers);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear los usuarios', error: error });
    }
};


// Actualizar un usuario existente
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Apellidos, Rol, Usuario, Password, Estado } = req.body;
    try {
        const updatedUser = await Usuario.findByIdAndUpdate(id, { Nombre, Apellidos, Rol, Usuario, Password, Estado }, { new: true });
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error: error });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await Usuario.findByIdAndDelete(id);
        if (deletedUser) {
            res.status(200).json({ message: 'Usuario eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error: error });
    }
};

module.exports = {
    getUsers,
    loginUser,
    getUserid,
    createUser,
    updateUser,
    deleteUser
};
