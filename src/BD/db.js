const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://seguimientocba:Z2Wel7VJZFeDFcgF@cluster0.9zugemi.mongodb.net/Seguimiento');
    console.log('MongoDB conectado...');
  } catch (err) {
    console.error('Error al conectar a MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
