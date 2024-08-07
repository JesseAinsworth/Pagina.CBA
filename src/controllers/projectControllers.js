const Project = require('../models/project');

// Crear un nuevo proyecto
async function createProject(req, res) {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Obtener todos los proyectos
async function getAllProjects(req, res) {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Actualizar un proyecto
async function updateProject(req, res) {
  const { id } = req.params;
  try {
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Eliminar un proyecto
async function deleteProject(req, res) {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(id);
    res.json({ message: 'Proyecto eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject
};
