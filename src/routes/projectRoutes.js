const express = require('express');
const Project = require('../BD/models/projectM'); // Asegúrate de que la ruta al modelo sea correcta
const router = express.Router();

// Middleware para autenticar al usuario y obtener el nombre del administrador
const authenticate = (req, res, next) => {
  // Aquí debes implementar tu lógica de autenticación y autorización
  // Asegúrate de que req.user contiene el nombre del administrador
  // Este es un ejemplo de cómo podrías obtener el nombre del administrador usando un JWT
  // Suponiendo que tienes un JWT y un middleware para verificarlo

  // Ejemplo de autenticación: esto debería ser reemplazado por tu lógica de autenticación real
  req.user = { name: 'AdminName' }; // Aquí deberías obtener el nombre del administrador de la fuente de autenticación real
  next();
};

// Obtener todos los proyectos del administrador autenticado
router.get('/', authenticate, async (req, res) => {
  try {
    const adminName = req.user.name; // Nombre del administrador autenticado
    const projects = await Project.find({ adminName }); // Filtra por el nombre del administrador
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo proyecto
router.post('/', authenticate, async (req, res) => {
  const adminName = req.user.name; // Nombre del administrador autenticado
  const project = new Project({ ...req.body, adminName }); // Incluye el nombre del administrador al crear el proyecto
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un proyecto
router.put('/:id', authenticate, async (req, res) => {
  try {
    console.log('Actualizando proyecto. ID:', req.params.id);
    console.log('Datos de actualización:', req.body);

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedProject) {
      console.log('Proyecto no encontrado');
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    console.log('Proyecto actualizado:', updatedProject);
    res.json(updatedProject);
  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un proyecto
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    res.json({ message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
