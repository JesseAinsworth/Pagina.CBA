import React from 'react';
import referenciaImg1 from '../assets/images/referencia1.jpg';  // Asegúrate de importar tus imágenes
import referenciaImg2 from '../assets/images/referencia2.jpg';
import referenciaImg3 from '../assets/images/referencia3.jpg';  // Agregar más imágenes según sea necesario
import referenciaImg4 from '../assets/images/referencia4.jpg';

const Contact = () => {
    return (
        <div className="container mx-auto p-8 bg-opacity-50 bg-white border-4 border-blue-500 rounded-lg shadow-lg">
            <h2 className="text-4xl mb-6 font-bold text-gray-800 text-center">Contacto</h2>
            <p className="text-lg mb-4 text-gray-600 text-center">Para más información, contáctanos a través de los siguientes medios:</p>
            <div className="text-lg text-gray-700 text-center mb-6">
                <p className="mb-2">
                    <strong>Email:</strong> <a href="mailto:contacto@comercializadora-constructora.com" className="text-blue-500 hover:underline">joel.velasco.cbamexico@gmail.com</a>
                </p>
                <p className="mb-2">
                    <strong>Teléfono:</strong> <a href="tel:+1234567890" className="text-blue-500 hover:underline">+52 722 319 2737</a>
                </p>
                <p className="mb-2">
                    <strong>WhatsApp:</strong> <a href="https://wa.me/1234567890" className="text-blue-500 hover:underline">+52 55 420 45 241</a>
                </p>
                <p className="mb-2">
                    <strong>Facebook:</strong> <a href="https://www.facebook.com/profile.php?id=100089416552581" className="text-blue-500 hover:underline">CoverAll Sacv</a>
                </p>
            </div>
            <div className="md:flex md:space-x-4">
                <div className="md:w-1/2">
                    <h3 className="text-2xl mb-4 font-bold text-gray-800">Ubicación</h3>
                    <p className="text-lg mb-4 text-gray-600">Nos encontramos en:</p>
                    <p className="text-lg mb-4 text-gray-700">111 Calle Zaragoza, Lerma de Villada</p>
                    <div className="w-full h-64 md:h-48">
                        <iframe
                            className="w-full h-full rounded-lg shadow-lg"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d816.3550571668417!2d-99.50845083813851!3d19.291995802873675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses-419!2smx!4v1718662645949!5m2!1ses-419!2smx"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps Location"
                        ></iframe>
                    </div>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0">
                    <h3 className="text-2xl mb-4 font-bold text-gray-800">Imágenes de Referencia</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <img src={referenciaImg1} alt="Referencia 1" className="w-full h-auto rounded-lg shadow-lg" />
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 text-sm">Referencia 1</div>
                        </div>
                        <div className="relative">
                            <img src={referenciaImg2} alt="Referencia 2" className="w-full h-auto rounded-lg shadow-lg" />
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 text-sm">Referencia 2</div>
                        </div>
                        <div className="relative">
                            <img src={referenciaImg3} alt="Referencia 3" className="w-full h-auto rounded-lg shadow-lg" />
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 text-sm">Referencia 3</div>
                        </div>
                        <div className="relative">
                            <img src={referenciaImg4} alt="Referencia 4" className="w-full h-auto rounded-lg shadow-lg" />
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 text-sm">Referencia 4</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
