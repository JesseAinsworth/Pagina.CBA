import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSync } from 'react-icons/fa';
import ProjectTable from '../pages/ProjectTable';
import StatCard from '../pages/StatCard';
import '../TrackingPage.css';

const AdminDashboard = () => {
  const [isAdmin] = useState(true);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: '',
    codes: [''],
    location: '',
    status: 'En Progreso',
    startDate: '',
    endDate: '',
    notes: '',
    initialQuotationFile: null,
    finalQuotationFile: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      if (!response.ok) {
        throw new Error('Error al obtener proyectos');
      }
      const data = await response.json();
      setProjects(data);
      console.log('Proyectos actualizados:', data);
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewProject(prevState => ({
      ...prevState,
      [name]: files[0]
    }));
  };

  const handleCodeChange = (index, value) => {
    const updatedCodes = [...newProject.codes];
    updatedCodes[index] = value;
    setNewProject(prevState => ({
      ...prevState,
      codes: updatedCodes
    }));
  };

  const addCode = () => {
    setNewProject(prevState => ({
      ...prevState,
      codes: [...prevState.codes, '']
    }));
  };

  const removeCode = (index) => {
    setNewProject(prevState => ({
      ...prevState,
      codes: prevState.codes.filter((_, i) => i !== index)
    }));
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    if (!newProject.name || !newProject.location || !newProject.startDate) {
      alert('Por favor, completa todos los campos obligatorios: Nombre del Proyecto, Ubicación, Fecha de Inicio.');
      return;
    }

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing 
        ? `http://localhost:5000/api/projects/${currentProject._id}`
        : 'http://localhost:5000/api/projects';

      const formData = new FormData();
      Object.keys(newProject).forEach(key => {
        if (newProject[key] !== null && newProject[key] !== undefined) {
          if (key === 'codes') {
            formData.append('codes', JSON.stringify(newProject[key]));
          } else if (key.includes('File')) {
            formData.append(key, newProject[key]);
          } else {
            formData.append(key, newProject[key]);
          }
        }
      });

      const response = await fetch(url, {
        method: method,
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }

      const updatedProject = await response.json();
      console.log('Respuesta del servidor:', updatedProject);

      // Actualizar el estado local inmediatamente
      if (isEditing) {
        setProjects(prevProjects => 
          prevProjects.map(project => 
            project._id === updatedProject._id ? updatedProject : project
          )
        );
      } else {
        setProjects(prevProjects => [...prevProjects, updatedProject]);
      }

      // Resetear el formulario y el estado de edición
      setNewProject({
        name: '',
        codes: [''],
        location: '',
        status: 'En Progreso',
        startDate: '',
        endDate: '',
        notes: '',
        initialQuotationFile: null,
        finalQuotationFile: null
      });
      setIsEditing(false);
      setCurrentProject(null);

      // Actualizar la lista de proyectos
      fetchProjects();

    } catch (error) {
      console.error('Error al crear/actualizar proyecto:', error);
      alert(`Error al crear/actualizar proyecto: ${error.message}`);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el proyecto');
      }
      setProjects(projects.filter(project => project._id !== projectId));
      console.log('Proyecto eliminado:', projectId);
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
      alert(`Error al eliminar proyecto: ${error.message}`);
    }
  };

  const handleEditProject = (projectId) => {
    const projectToEdit = projects.find(project => project._id === projectId);
    setNewProject({
      ...projectToEdit,
      startDate: formatDate(projectToEdit.startDate),
      endDate: formatDate(projectToEdit.endDate),
      codes: projectToEdit.codes || [''],
      initialQuotationFile: null,
      finalQuotationFile: null
    });
    setIsEditing(true);
    setCurrentProject(projectToEdit);
    console.log('Editando proyecto:', projectToEdit);
  };

  const statusCounts = projects.reduce((counts, project) => {
    counts[project.status] = (counts[project.status] || 0) + 1;
    return counts;
  }, {});

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex items-center justify-between mb-4">
        <Link to="/" className="text-blue-600 hover:underline">
          <FaArrowLeft /> Volver
        </Link>
        <h1 className="text-2xl font-semibold">Seguimiento de Proyectos</h1>
        <div>
          <button onClick={fetchProjects} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
            <FaSync className="mr-2" /> Refrescar Proyectos
          </button>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <StatCard title="Proyectos en Progreso" value={statusCounts['En Progreso'] || 0} />
        <StatCard title="Proyectos Finalizados" value={statusCounts['Finalizado'] || 0} />
        <StatCard title="Proyectos Atrasados" value={statusCounts['Atrasado'] || 0} />
      </div>
      <ProjectTable
        projects={projects}
        isAdmin={isAdmin}
        onDeleteProject={handleDeleteProject}
        onEditProject={handleEditProject}
      />
      {isAdmin && (
        <form onSubmit={handleCreateProject} className="mt-4">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
            <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-medium mb-1">Nombre del Proyecto</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newProject.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="location" className="font-medium mb-1">Ubicación</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={newProject.location}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="status" className="font-medium mb-1">Estado</label>
                <select
                  id="status"
                  name="status"
                  value={newProject.status}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="En Progreso">En Progreso</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Atrasado">Atrasado</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="startDate" className="font-medium mb-1">Fecha de Inicio</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={newProject.startDate}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="endDate" className="font-medium mb-1">Fecha de Fin</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={newProject.endDate}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col md:col-span-2">
                <label htmlFor="notes" className="font-medium mb-1">Notas</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={newProject.notes}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-medium mb-2">Códigos del Proyecto</h3>
              {newProject.codes.map((code, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    className="border border-gray-300 rounded-md p-2 mr-2"
                    placeholder="Ingrese código"
                  />
                  {newProject.codes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCode(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addCode}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Añadir Código
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <label htmlFor="initialQuotationFile" className="font-medium mb-1">Presupuesto Inicial</label>
                <input
                  type="file"
                  id="initialQuotationFile"
                  name="initialQuotationFile"
                  onChange={handleFileChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="finalQuotationFile" className="font-medium mb-1">Presupuesto Final</label>
                <input
                  type="file"
                  id="finalQuotationFile"
                  name="finalQuotationFile"
                  onChange={handleFileChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                {isEditing ? 'Guardar Cambios' : 'Crear Proyecto'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentProject(null);
                    setNewProject({
                      name: '',
                      codes: [''],
                      location: '',
                      status: 'En Progreso',
                      startDate: '',
                      endDate: '',
                      notes: '',
                      initialQuotationFile: null,
                      finalQuotationFile: null
                    });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminDashboard;
