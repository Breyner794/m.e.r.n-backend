const mongoose = require('mongoose');

const initializeRoles = async () => {
  const Role = require('../models/roles.js');

  const rolesIniciales = [
    {
      name: 'admin',
      permissions: {
        create: true,
        read: true,
        update: true,
        delete: false
      },
      allowedRoutes: ['/admin', '/dashboard']
    },
    {
      name: 'super_admin',
      permissions: {
        create: true,
        read: true,
        update: true,
        delete: true
      },
      allowedRoutes: ['*']
    },
    {
      name: 'user',
      permissions: {
        create: false,
        read: true,
        update: false,
        delete: false
      },
      allowedRoutes: ['/dashboard']
    }
  ];

  try {
    for (const role of rolesIniciales) {
      await Role.findOneAndUpdate(
        { name: role.name },
        role,
        { upsert: true, new: true }
      );
    }
    console.log('✅ Roles inicializados correctamente');
  } catch (error) {
    console.error('❌ Error inicializando roles:', error);
    throw error;
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await initializeRoles();
    console.log(`✅ Conectado a MongoDB exitosamente: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error de conexión a MongoDB:', ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;