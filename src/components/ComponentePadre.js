import React, { useState } from 'react';
import LoginModal from './LoginModal';

const ParentComponent = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const handleLoginSuccess = () => {
        console.log('Login successful!');
        // Aquí puedes agregar cualquier otra lógica que necesites
    };

    return (
        <div>
            <button onClick={() => setLoginModalOpen(true)}>Open Login Modal</button>
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setLoginModalOpen(false)} 
                onLoginSuccess={handleLoginSuccess} 
            />
        </div>
    );
};

export default ParentComponent;
