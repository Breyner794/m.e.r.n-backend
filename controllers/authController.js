const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const Role = require('../models/roles.js');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate('role');
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password, roleName } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario o email ya existe' });
    }

    // Obtener el rol
    const role = await Role.findOne({ name: roleName });
    if (!role) {
      return res.status(400).json({ message: 'Rol no válido' });
    }

    // Crear nuevo usuario
    const user = new User({
      username,
      email,
      password,
      role: role._id
    });

    await user.save();

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: roleName
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    .populate('role', 'name');
    
    const MostrarUsuarios = users.map(user => ({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role.name
    }));

    res.json({
      success: true,
      data: MostrarUsuarios
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios',
      error: error.message
    });
  }
};

module.exports = {
  login,
  register,
  getUsers
};