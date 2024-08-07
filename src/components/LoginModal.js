import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginModal.css'; // Importa el archivo CSS aquí

const admins = [
    { username: 'Joel Velasco', password: 'Lerma-Metepec24' },
    { username: 'Carlos Flores91', password: 'covercharly07' },
    { username: 'CesarMtz', password: 'Retos33-1' },
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
            navigate('/tracking');
        } else {
            console.log('Credenciales incorrectas');
            alert('Credenciales incorrectas');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="form">
                <h2 className="text-2xl mb-4 text-white">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white">Nombre de usuario</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="input" 
                            placeholder="Ingrese su nombre de usuario"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white">Contraseña</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="input" 
                            placeholder="Ingrese su contraseña"
                            required 
                        />
                    </div>
                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="mr-4 cancel-button"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="form-button"
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
