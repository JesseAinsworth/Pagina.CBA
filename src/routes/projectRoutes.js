const express = require('express');
const Project = require('../BD/models/Project');
const router = express.Router();

// Obtener todos los proyectos
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo proyecto
router.post('/', async (req, res) => {
  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un proyecto
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
