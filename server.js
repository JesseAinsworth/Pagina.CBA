require('dotenv').config();
const express = require('express');
const connectDB = require('./src/BD/db');
const projectRoutes = require('./src/routes/projects');
const codeRoutes = require('./src/routes/codes');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Project = require('./src/BD/models/projectM'); // Importa el modelo Project

// Verificar si la URI de MongoDB se carga correctamente
console.log('Mongo URI:', process.env.MONGO_URI);

// Conectar a la base de datos
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de multer para manejar archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

// Endpoint para servir archivos subidos
app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});

// Endpoint para crear un nuevo proyecto
app.post('/api/projects', upload.fields([
  { name: 'initialQuotationFile', maxCount: 1 },
  { name: 'finalQuotationFile', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);
    console.log('Archivos recibidos:', req.files);

    const codes = Array.isArray(req.body.codes) ? req.body.codes : req.body.codes.split(',');

    const projectData = {
      name: req.body.name,
      codes: codes,
      location: req.body.location,
      status: req.body.status,
      startDate: new Date(req.body.startDate),
      endDate: req.body.endDate ? new Date(req.body.endDate) : null,
      notes: req.body.notes,
      initialQuotationFile: req.files.initialQuotationFile ? req.files.initialQuotationFile[0].path : null,
      finalQuotationFile: req.files.finalQuotationFile ? req.files.finalQuotationFile[0].path : null
    };

    const project = new Project(projectData);
    await project.save();
    
    res.status(201).json(project);
  } catch (error) {
    console.error('Error al crear proyecto:', error);
    res.status(400).json({ message: error.message });
  }
});

// Endpoint para actualizar un proyecto existente
app.put('/api/projects/:id', upload.fields([
  { name: 'initialQuotationFile', maxCount: 1 },
  { name: 'finalQuotationFile', maxCount: 1 }
]), async (req, res) => {
  try {
    const projectId = req.params.id;
    console.log('Datos recibidos para actualización:', req.body);
    console.log('Archivos recibidos para actualización:', req.files);

    const codes = Array.isArray(req.body.codes) ? req.body.codes : req.body.codes.split(',');

    const updateData = {
      name: req.body.name,
      codes: codes,
      location: req.body.location,
      status: req.body.status,
      startDate: new Date(req.body.startDate),
      endDate: req.body.endDate ? new Date(req.body.endDate) : null,
      notes: req.body.notes,
      initialQuotationFile: req.files.initialQuotationFile ? req.files.initialQuotationFile[0].path : req.body.initialQuotationFile,
      finalQuotationFile: req.files.finalQuotationFile ? req.files.finalQuotationFile[0].path : req.body.finalQuotationFile
    };

    const updatedProject = await Project.findByIdAndUpdate(projectId, updateData, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    res.status(400).json({ message: error.message });
  }
});

// Rutas para los proyectos
app.use('/api/projects', projectRoutes);

// Rutas para los códigos
app.use('/api/codes', codeRoutes);

// Servir archivos estáticos (si tienes una página HTML estática en 'public')
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
