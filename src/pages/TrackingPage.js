import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import Modal from 'react-modal';
import AdminPage from '../components/AdminPage'; // Ajusta la ruta si es necesario

// Establecer el elemento raíz para el modal
Modal.setAppElement('#root');

const TrackingPage = () => {
  const [codes, setCodes] = useState([]);
  const [newCode, setNewCode] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchCodes = async () => {
      const response = await axios.get('http://localhost:5000/api/codes');
      setCodes(response.data);
    };
    fetchCodes();
  }, []);

  const handleAddCode = async () => {
    if (newCode && newDescription) {
      const response = await axios.post('http://localhost:5000/api/codes', {
        code: newCode,
        description: newDescription
      });
      setCodes(prevCodes => [...prevCodes, response.data]);
      setNewCode('');
      setNewDescription('');
    }
  };

  const handleOpenLogin = () => {
    setModalIsOpen(true);
  };

  const handleCloseLogin = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="modules-page p-4 sm:p-8 bg-gray-100 bg-opacity-20 min-h-screen relative">
      <Link to="/tracking" className="mb-4 flex items-center text-blue-600 hover:underline">
        <FaArrowLeft className="mr-2" /> Volver al inicio
      </Link>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Descripciones</h1>

      <div className="mb-4">
        <button
          onClick={handleOpenLogin}
          className="bg-green-600 text-white px-4 py-1 rounded mb-4 hover:bg-green-700"
        >
          Crear Proyecto
        </button>
        <h2 className="text-xl font-bold mb-2">Agregar nuevo código</h2>
        <div className="flex flex-col sm:flex-row items-center mb-2">
          <input
            type="text"
            placeholder="Código"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            className="mb-2 sm:mb-0 sm:mr-2 px-2 py-1 border rounded"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="mb-2 sm:mb-0 sm:mr-2 px-2 py-1 border rounded"
          />
          <button
            onClick={handleAddCode}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Agregar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto max-h-64 overflow-y-scroll border-t border-b border-gray-200">
        <table className="min-w-full bg-white shadow-md rounded-lg text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left text-gray-800 bg-gray-200">Código</th>
              <th className="px-2 py-1 text-left text-gray-800 bg-gray-200">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code) => (
              <tr key={code._id} className="border-b border-gray-200">
                <td className="px-2 py-1 text-gray-700">{code.code}</td>
                <td className="px-2 py-1 text-gray-700">{code.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseLogin}
        contentLabel="Login Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <AdminPage onClose={handleCloseLogin} />
      </Modal>
    </div>
  );
};

export default TrackingPage;
