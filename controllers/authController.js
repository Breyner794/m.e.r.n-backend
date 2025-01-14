const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const Role = require('../models/roles.js');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Intento de login con:', email);

    const allUsers = await User.find({}, 'email');
    console.log('Emails en la base de datos:', allUsers.map(u => u.email));

    const user = await User.findOne({ email }).populate('role');
    console.log('Query resultado:', user);
    
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    console.log('Hash almacenado:', user.password);
    console.log('Contraseña recibida:', password);

    const isMatch = await user.comparePassword(password);
    console.log('¿Contraseña coincide?:', isMatch);

    if (!isMatch) {
      console.log('Contraseña no coincide');
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