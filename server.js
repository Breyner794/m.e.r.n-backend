const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
require('dotenv').config();
const aeropuertoRouter = require('./routes/aeropuertoRouter.js');
const avionesRouter = require('./routes/avionesRouter.js');
const empleadosRouter = require('./routes/empleadosRouter.js');
const pasajeroRouter = require('./routes/pasajeroRouter.js');
const rolesRouter = require('./routes/rolesRouter.js');
const vuelosRouter = require('./routes/vuelosRouter.js');
const ReservasRouter = require('./routes/reservasRouter.js');
const equipajeRouter = require('./routes/equipajeRouter.js');
const tripulacionRouter = require('./routes/tripulacionVueloRouter.js');
const authRoutes = require('./routes/authRoutes.js');
const testRoutes = require('./routes/testRoutes.js')


const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
/* app.use(express.urlencoded({extended:true})) */

// Conexión a MongoDB
connectDB();

// Rutas
/* app.use('/api/auth', authRoutes, testRoutes);
app.use('/api', aeropuertoRouter, avionesRouter, empleadosRouter, pasajeroRouter, rolesRouter, vuelosRouter, ReservasRouter, equipajeRouter, tripulacionRouter); */
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/aeropuertos', aeropuertoRouter);
app.use('/api/aviones', avionesRouter);
app.use('/api/empleados', empleadosRouter);
app.use('/api/pasajeros', pasajeroRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/vuelos', vuelosRouter);
app.use('/api/reservas', ReservasRouter);
app.use('/api/equipaje', equipajeRouter);
app.use('/api/tripulacion', tripulacionRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});


  

    // (5000, '0.0.0.0', () => {
    //   console.log('Servidor corriendo en puerto 5000'); (PORT, () => {
  //console.log(`Servidor corriendo en puerto ${PORT}`);