import React, { useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import TrackingPage from './pages/TrackingPage';
import Admin1Page from './pages/Admin1Page';
import Admin2Page from './pages/Admin2Page';
import Admin3Page from './pages/Admin3Page';
import LoginModal from './components/LoginModal'; // Asegúrate de que la ruta es correcta
import './index.css';

const App = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleOpenLogin = () => {
        setIsLoginOpen(true);
    };

    const handleCloseLogin = () => {
        setIsLoginOpen(false);
    };

    const handleLoginSuccess = () => {
        setIsLoginOpen(false);
        setIsLoggedIn(true);
        navigate('/tracking'); // Redirige a TrackingPage al iniciar sesión
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar onLoginClick={handleOpenLogin} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/servicios" element={<Services />} />
                    <Route path="/proyectos" element={<Projects />} />
                    <Route path="/contacto" element={<Contact />} />
                    <Route path="/tracking" element={
                        isLoggedIn ? <TrackingPage /> : <Navigate to="/" replace />
                    } />
                    <Route path="/admin1" element={<Admin1Page />} />
                    <Route path="/admin2" element={<Admin2Page />} />
                    <Route path="/admin3" element={<Admin3Page />} />
                </Routes>
            </main>
            <Footer />
            <LoginModal isOpen={isLoginOpen} onClose={handleCloseLogin} onLoginSuccess={handleLoginSuccess} />
        </div>
    );
};

export default App;
