import React from 'react';
import { FaEdit, FaTrash, FaFileDownload } from 'react-icons/fa';

const ProjectTable = ({ projects, isAdmin, onDeleteProject, onEditProject }) => {
  const handleDownload = async (url, fileName) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error al descargar el archivo. Por favor, inténtelo de nuevo.');
    }
  };

  const getFileUrl = (filePath) => {
    // Asegúrate de que esta URL sea correcta para tu configuración de servidor
    return `http://localhost:5000/${filePath}`;
  };

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-200">Código</th>
          <th className="py-2 px-4 border-b border-gray-200">Nombre</th>
          <th className="py-2 px-4 border-b border-gray-200">Ubicación</th>
          <th className="py-2 px-4 border-b border-gray-200">Estado</th>
          <th className="py-2 px-4 border-b border-gray-200">Cotización Inicial</th>
          <th className="py-2 px-4 border-b border-gray-200">Cotización Final</th>
          <th className="py-2 px-4 border-b border-gray-200">Fecha de Inicio</th>
          <th className="py-2 px-4 border-b border-gray-200">Fecha de Fin</th>
          {isAdmin && <th className="py-2 px-4 border-b border-gray-200">Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project._id}>
            <td className="py-2 px-4 border-b border-gray-200">
              {Array.isArray(project.codes) ? project.codes.join(', ') : project.codes}
            </td>
            <td className="py-2 px-4 border-b border-gray-200">{project.name}</td>
            <td className="py-2 px-4 border-b border-gray-200">{project.location}</td>
            <td className="py-2 px-4 border-b border-gray-200">{project.status}</td>
            <td className="py-2 px-4 border-b border-gray-200">
              {project.initialQuotation ? `$${project.initialQuotation.toFixed(2)}` : 'N/A'}
              {project.initialQuotationFile && (
                <button 
                  onClick={() => handleDownload(getFileUrl(project.initialQuotationFile), `cotizacion_inicial_${project.name}.pdf`)}
                  className="ml-2"
                >
                  <FaFileDownload className="text-blue-600 hover:text-blue-800" />
                </button>
              )}
            </td>
            <td className="py-2 px-4 border-b border-gray-200">
              {project.finalQuotation ? `$${project.finalQuotation.toFixed(2)}` : 'N/A'}
              {project.finalQuotationFile && (
                <button 
                  onClick={() => handleDownload(getFileUrl(project.finalQuotationFile), `cotizacion_final_${project.name}.pdf`)}
                  className="ml-2"
                >
                  <FaFileDownload className="text-blue-600 hover:text-blue-800" />
                </button>
              )}
            </td>
            <td className="py-2 px-4 border-b border-gray-200">
              {new Date(project.startDate).toLocaleDateString()}
            </td>
            <td className="py-2 px-4 border-b border-gray-200">
              {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}
            </td>
            {isAdmin && (
              <td className="py-2 px-4 border-b border-gray-200">
                <button
                  onClick={() => onEditProject(project._id)}
                  className="text-blue-600 hover:underline mr-2"
                  aria-label="Editar proyecto"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDeleteProject(project._id)}
                  className="text-red-600 hover:underline"
                  aria-label="Eliminar proyecto"
                >
                  <FaTrash />
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;