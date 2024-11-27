import mongoose from 'mongoose';

// Define el esquema para la cobertura
const coberturaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
});

// Crear el modelo a partir del esquema
const Cobertura = mongoose.model('Cobertura', coberturaSchema);

export default Cobertura;
