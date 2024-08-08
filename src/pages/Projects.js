import React from 'react';
import proyecto1 from '../assets/proyectos/proyecto1.png';
import proyecto2 from '../assets/proyectos/proyecto2.png';
import proyecto3 from '../assets/proyectos/proyecto3.png';
import proyecto4 from '../assets/proyectos/proyecto4.png';
import proyecto5 from '../assets/proyectos/proyecto5.png';
import proyecto6 from '../assets/proyectos/proyecto6.png';

const Projects = () => {
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl mb-8 text-center font-bold text-gray-800">Proyectos Recientes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="border-2 border-blue-500 rounded-lg overflow-hidden shadow-md">
                        <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const projects = [
    {
        id: 1,
        title: 'Paileria en sistemas hidraulicos y pluviales',
        imageUrl: proyecto1,
    },
    {
        id: 2,
        title: 'Trenes de descarga pluviales',
        imageUrl: proyecto2,
    },
    {
        id: 3,
        title: 'Mantenimiento a bombas y adecuaciones de pailería en tuberías',
        imageUrl: proyecto3,
    },
    {
        id: 4,
        title: 'Subestaciones y mantenimiento a tableros de control',
        imageUrl: proyecto4,
    },
    {
        id: 5,
        title: 'Drenajes y obras pluviales',
        imageUrl: proyecto5,
    },
    {
        id: 6,
        title: 'Mantenimiento sistemas contra incendios',
        imageUrl: proyecto6,
    },
];

export default Projects;
