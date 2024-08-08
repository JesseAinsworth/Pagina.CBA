const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  codes: [String],
  location: String,
  status: String,
  startDate: Date,
  endDate: Date,
  notes: String,
  initialQuotationFile: String,
  finalQuotationFile: String
});

// Crear el modelo 'Project' usando el esquema definido
//const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
