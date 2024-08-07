import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginModal.css'; // Asegúrate de que esta ruta es correcta

const admins = [
    { username: 'GrupoCBA', password: 'Cba.Mexico' },
];

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const admin = admins.find(
            (admin) => admin.username === username && admin.password === password
        );

        if (admin) {
            console.log('Inicio de sesión exitoso para:', admin.username);
            onClose();
            if (typeof onLoginSuccess === 'function') {
                onLoginSuccess();
            }
            navigate('/tracking'); // Redirige a TrackingPage después de iniciar sesión
        } else {
            console.log('Credenciales incorrectas');
            alert('Credenciales incorrectas');
        }
    };

    if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="form bg-white p-6 rounded shadow-lg">
                <h2 className="text-2xl mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre de usuario</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="input border rounded p-2 w-full"
                            placeholder="Ingrese su nombre de usuario"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Contraseña</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="input border rounded p-2 w-full"
                            placeholder="Ingrese su contraseña"
                            required 
                        />
                    </div>
                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="mr-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
