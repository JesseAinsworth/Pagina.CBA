import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png'; // Asegúrate de que la ruta sea correcta
import '../Navbar.css'; // Importa el archivo CSS

const Navbar = ({ onLoginClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-transparent p-4 text-white">
            <div className="container mx-auto flex justify-between items-center flex-wrap">
                <div className="text-xl font-bold">
                    <button onClick={onLoginClick} className="focus:outline-none">
                        <img src={logo} alt="Logo" className="h-14" /> {/* Ajusta la clase y el tamaño según sea necesario */}
                    </button>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
                <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
                    {isOpen && (
                        <button onClick={toggleMenu} className="close-button">
                            <FaTimes size={29} />
                        </button>
                    )}
                    <div className="navbar-menu-content">
                        <Link to="/" className="hover:text-gray-300">
                            <button className="navbar-button">
                                <span className="navbar-button-span"></span>
                                Inicio
                            </button>
                        </Link>
                        <Link to="/servicios" className="hover:text-gray-300">
                            <button className="navbar-button">
                                <span className="navbar-button-span"></span>
                                Servicios
                            </button>
                        </Link>
                        <Link to="/proyectos" className="hover:text-gray-300">
                            <button className="navbar-button">
                                <span className="navbar-button-span"></span>
                                Proyectos
                            </button>
                        </Link>
                        <Link to="/contacto" className="hover:text-gray-300">
                            <button className="navbar-button">
                                <span className="navbar-button-span"></span>
                                Contacto
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
