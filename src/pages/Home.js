import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Home = () => {
    const images = [
        {
            original: '/assets/image-gallery/image1.png',
            thumbnail: '/assets/image-gallery/image1-thumbnail.png',
            description: ''
        },
        {
            original: '/assets/image-gallery/image2.jpg',
            thumbnail: '/assets/image-gallery/image2-thumbnail.jpg',
            description: ''
        },
        {
            original: '/assets/image-gallery/image3.png',
            thumbnail: '/assets/image-gallery/image3-thumbnail.png',
            description: ''
        },
        {
            original: '/assets/image-gallery/image4.png',
            thumbnail: '/assets/image-gallery/image4-thumbnail.png',
            description: ''
        },
        {
            original: '/assets/image-gallery/image5.png',
            thumbnail: '/assets/image-gallery/image5-thumbnail.png',
            description: ''
        },
        {
            original: '/assets/image-gallery/image6.png',
            thumbnail: '/assets/image-gallery/image6-thumbnail.png',
            description: ''
        },
    ];

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg border-4 border-blue-500 bg-opacity-75">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Bienvenidos a Grupo CBA</h2>
                <p className="text-xl text-gray-600">Hidráulica y construcción.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-1/2">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">Imágenes</h3>
                    <ImageGallery items={images} />
                </div>
                <div className="w-full md:w-1/2">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">Quiénes Somos</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Cover All Industrias es una empresa creada para ser eficiente en los procesos de construcción utilizando materiales que son fabricados bajo las más estrictas normas y buscando el ahorro de nuestros clientes. Contamos con un grupo de profesionales especialistas en su área que buscan generar mejores opciones de costo y de diseño de proyectos, contando con la tecnología y maquinaria más moderna. En la búsqueda para ofrecer más y mejores alternativas, partiendo de la información básica que el cliente proporciona al profesional de la construcción, la información recopilada nos permite enfocarlo en la realización de proyectos integrales que puedan contemplar nuevas tendencias que conlleven a un ahorro a mediano plazo.
                    </p>
                </div>
            </div>

            <div className="mt-12">
                <h4 className="text-2xl font-bold text-gray-800 mb-4">Misión</h4>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">“Buscar la satisfacción de nuestros clientes, mediante proyectos de calidad con ahorros significativos”</p>
                <h4 className="text-2xl font-bold text-gray-800 mb-4">Visión</h4>
                <p className="text-lg text-gray-700 leading-relaxed">Consolidarse como la mejor empresa de suministro y servicio en material hidráulico, herramientas, de seguridad y eléctrico, así como; En Obras Hidráulicas, Mantenimientos a pozos y redes, Obra electromecánica, Obra civil, optimizando los recursos humanos, materiales y financieros.</p>
            </div>
        </div>
    );
};

export default Home;
