import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import images from '../assets/images/images';

const serviceData = [
    {
        title: 'Construcción',
        description: [
            'Comercio al por mayor de otros materiales, excepto de madera.',
            'Comercio al por mayor de materiales metálicos.',
            'Comercio al por mayor de cemento, tabique y grava.',
            'Otros trabajos especializados para la construcción.'
        ],
        images: images.construccion
    },
    {
        title: 'Electromecánica',
        description: [
            'Instalación y mantenimiento de sistemas eléctricos.',
            'Comercio al por mayor de equipo y materiales eléctricos.'
        ],
        images: images.electromecanica
    },
    {
        title: 'Hidráulica-Sanitaria',
        description: [
            'Diseño e instalación de sistemas hidráulicos y sanitarios.',
            'Proveemos soluciones hidráulicas y sanitarias, desde el diseño hasta la ejecución, asegurando sistemas eficientes y sostenibles.'
        ],
        images: images.hidraulica
    },
    {
        title: 'Sistemas Contra Incendios',
        description: [
            'Planificación y diseño de sistemas de detección y extinción de incendios.',
            'Instalación de alarmas y rociadores automáticos.',
            'Inspección y mantenimiento de equipos contra incendios.'
        ],
        images: images.incendios
    },
    {
        title: 'Remodelación',
        description: [
            'Pintura-Tablaroca-Albañileria-Plomeria',
            'Rediseño y renovación de espacios interiores y exteriores.',
            'Uso de materiales de alta calidad para garantizar durabilidad.',
            'Servicios integrales desde la planificación hasta la ejecución.'
        ],
        images: images.remodelacion
    }
];

const ServiceCard = ({ title, description, images }) => (
    <div className="md:flex md:space-x-4 items-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-md border border-blue-500">
        <div className="md:w-1/2">
            <h3 className="text-2xl mb-4 font-semibold">{title}</h3>
            <ul className="list-disc pl-6 text-lg">
                {description.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
        <div className="md:w-1/2">
            <Carousel showThumbs={false} autoPlay infiniteLoop>
                {images.map((img, index) => (
                    <div key={index}>
                        <img src={img} alt={`${title} ${index + 1}`} className="w-full h-auto rounded-lg shadow-lg mb-4 md:mb-0" />
                    </div>
                ))}
            </Carousel>
        </div>
    </div>
);

const Services = () => (
    <div className="container mx-auto p-4">
        <h2 className="text-4xl mb-8 font-bold text-center">Nuestros Servicios</h2>
        <div className="space-y-16">
            {serviceData.map((service, index) => (
                <ServiceCard
                    key={index}
                    title={service.title}
                    description={service.description}
                    images={service.images}
                />
            ))}
        </div>
    </div>
);

export default Services;
