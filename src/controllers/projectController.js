// src/controllers/projectController.js

const Project = require('../BD/models/projectM');

// Crear un nuevo proyecto
const createProject = async (req, res) => {
    try {

        console.log('Datos recibidos:', req.body);

        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {

        console.error('Error al crear proyecto:', error);

        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los proyectos
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un proyecto por ID
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un proyecto por ID
const updateProject = async (req, res) => {
    try {
        console.log('Actualizando proyecto. ID:', req.params.id);
        console.log('Datos de actualización:', req.body);

        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        if (!project) {
            console.log('Proyecto no encontrado');
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        
        console.log('Proyecto actualizado:', project);
        res.status(200).json(project);
    } catch (error) {
        console.error('Error al actualizar proyecto:', error);
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un proyecto por ID
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.status(200).json({ message: 'Proyecto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
};
