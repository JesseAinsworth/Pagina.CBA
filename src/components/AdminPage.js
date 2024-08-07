import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { admins } from '../adminCredentials'; // Ajusta la ruta si es necesario

const AdminPage = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const admin = admins.find(
      (admin) => admin.username === username && admin.password === password
    );

    if (admin) {
      // Redirigir a la página específica según el usuario
      switch (admin.username) {
        case 'Joel Velasco':
          navigate('/admin1');
          break;
        case 'Carlos Flores91':
          navigate('/admin2');
          break;
        case 'CesarMtz':
          navigate('/admin3');
          break;
        default:
          setError('Usuario no reconocido');
      }
      setError('');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-64 h-80 bg-indigo-50 rounded shadow flex flex-col justify-between p-3">
        <form className="text-indigo-500" action="" method="post">
          <fieldset className="border-4 border-dotted border-indigo-500 p-5">
            <legend className="px-2 italic -mx-2">Welcome again!</legend>
            <label className="text-xs font-bold after:content-['*'] after:text-red-400" htmlFor="email">Mail </label>     
            <input
              className="w-full p-2 mb-2 mt-1 outline-none ring-0 focus:ring-2 focus:ring-indigo-500"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />   
            <label className="text-xs font-bold after:content-['*'] after:text-red-400" htmlFor="password">Password  </label>
            <input
              className="w-full p-2 mb-2 mt-1 outline-none ring-0 focus:ring-2 focus:ring-indigo-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
            <button
              type="button"
              onClick={handleLogin}
              className="w-full rounded bg-indigo-500 text-indigo-50 p-2 text-center font-bold hover:bg-indigo-400"
            >
              Log In
            </button>
          </fieldset>
        </form>
        <button
          onClick={onClose}
          className="mt-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
