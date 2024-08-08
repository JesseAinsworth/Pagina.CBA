const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  codes: [{ type: String, required: true }],
  location: { type: String, required: true },
  status: { type: String, enum: ['En Progreso', 'Finalizado', 'Atrasado'], default: 'En Progreso' },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  notes: { type: String },
  initialQuotation: { type: String },
  finalQuotation: { type: String },
  initialQuotationFile: { type: String },
  finalQuotationFile: { type: String },
  adminName: { type: String, required: true } // Añadido campo adminName
});

module.exports = mongoose.model('Project', projectSchema);
