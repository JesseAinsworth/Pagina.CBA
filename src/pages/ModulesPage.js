import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaArrowLeft, FaBuilding, FaChevronDown, FaChevronUp, FaListUl, FaTimes } from 'react-icons/fa';

const ModulesPage = () => {
  const location = useLocation();
  const [projectsByCode, setProjectsByCode] = useState({});
  const [expandedCode, setExpandedCode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const availableCodes = useMemo(() => [
    "C/06", "C/07", "C/08", "C/64-A", "C/64-B", "C/103", "C/104", "C/109", 
    "C/111", "C/130", "C/132", "C/134", "C/135", "C/137", "C/147", "C/150", 
    "C/156", "C/199", "C/223", "C/000"
  ], []);

  const codeDescriptions = {
    "C/06": "VARIOS",
    "C/07": "OPDAPAS-LERMA",
    "C/08": "OPDAPAS-SAN MATEO",
    "C/64-A": "EDIF-PANTALON STA FE",
    "C/64-B": "PARQ IND DOÑA ROSA - LERMA (ADMINISTRACIONES ZAI)",
    "C/103": "VARIOS TRABAJOS JUDICATURA - CBS (NAUCALPAN-ADMINSTRACIONES  ZAI)",
    "C/104": "MTTO VARIOS-TUACHI, SRA. LINA",
    "C/109": "MTTO VESTA VARIOS;  MEDID AGUA POTAB;  PODA-JARDINERIA-CRIBAS-DESASOLVE; DEMOLIC MURO, PODA, VIALIDAD, LIMPIEZA BODEGAS Y CRIBAS,",
    "C/111": "BYVA TUACHI",
    "C/130": "VARIOS TRABAJOS CALLE 3-NAUCALPAN-FIDEICOMISO 117-9",
    "C/132": "VALLEJO - VARIOS, REPARAC FUGA, SUMIN LUMINAR",
    "C/134": "VARIOS CALZ LAS NARANJAS (ABUD ATTIE DAYAN)",
    "C/135": " DEPTO ELEVIA (GRUPO ACCIONARIO ATTIE)",
    "C/137": "NAVE WILSON - TEPOTZOTLAN",
    "C/147": "TRABAJOS VARIOS NAVE 38 - DAIMLER PARQ TOLUCA 2000 (QVC, S. DE RL.)",
    "C/150": "VARIOS TRABAJOS DE PAILERIA (PROY-ELPIDIO)",
    "C/156": "GESTAMP VARIOS TRAB - PODA - COCINA - LOBY - GRIETAS - BAJADAS PLUVIALES - PUERTA CRISTAL - ANALISIS ZAPATAS",
    "C/199": "GATES VARIOS - SISTEMA HIDRAULICO - POSTE Y LUMINARIAS - SENSORES",
    "C/223": "COMERCIALIZACION GESTAMP",
    "C/000": "OTRO",
  };

  useEffect(() => {
    const projects = location.state?.projects || [];
    const groupedProjects = availableCodes.reduce((acc, code) => {
      acc[code] = projects.filter(project => project.codes.includes(code));
      return acc;
    }, {});
    setProjectsByCode(groupedProjects);
  }, [location.state, availableCodes]);

  const toggleCode = (code) => {
    setExpandedCode(expandedCode === code ? null : code);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="modules-page p-4 sm:p-8 bg-gray-100 bg-opacity-20 min-h-screen relative">
      <Link to="/tracking" className="mb-4 flex items-center text-blue-600 hover:underline">
        <FaArrowLeft className="mr-2" /> Volver a Seguimiento
      </Link>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Gestión de Proyectos</h1>
      
      <button
        onClick={toggleModal}
        className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none z-30"
      >
        <FaListUl className="inline-block mr-2" />
        Listar Descripciones
      </button>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative">
        {availableCodes.map((code) => (
          <div key={code} className="relative">
            <button
              className="relative group cursor-pointer text-sky-50 overflow-hidden h-12 w-full max-w-xs mx-auto rounded-md bg-sky-800 p-2 flex justify-center items-center font-extrabold"
              onClick={() => toggleCode(code)}
            >
              <div className="absolute top-3 right-12 group-hover:top-10 group-hover:-right-10 z-10 w-20 h-20 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-900"></div>
              <div className="absolute top-3 right-12 group-hover:top-10 group-hover:-right-10 z-10 w-16 h-16 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-800"></div>
              <div className="absolute top-3 right-12 group-hover:top-10 group-hover:-right-10 z-10 w-12 h-12 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-700"></div>
              <div className="absolute top-3 right-12 group-hover:top-10 group-hover:-right-10 z-10 w-8 h-8 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-600"></div>
              <p className="z-10 text-sm">{code}</p>
              {expandedCode === code ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
            </button>
            {expandedCode === code && (
              <div className="absolute z-20 bg-white bg-opacity-90 p-4 rounded-lg shadow-lg w-64 mt-2 right-0 sm:left-auto text-sm" style={{ top: '100%', zIndex: 50 }}>
                {projectsByCode[code] && projectsByCode[code].length > 0 ? (
                  <ul className="list-none pl-0">
                    {projectsByCode[code].map(project => (
                      <li key={project.id} className="flex items-center mb-2">
                        <FaBuilding className="mr-2 text-blue-500" />
                        <span className="text-gray-600">{project.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No hay proyectos asignados a este código.</p>
                )}
                <button
                  onClick={() => toggleCode(code)}
                  className="mt-4 bg-red-600 text-white p-2 rounded-md hover:bg-red-700 focus:outline-none"
                >
                  <FaTimes className="inline-block mr-2" />
                  Cerrar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="border-4 border-blue-600 bg-white p-4 rounded-lg shadow-lg max-w-md w-full h-96 overflow-y-auto text-sm">
            <h2 className="text-lg font-bold mb-2">Descripciones de Códigos</h2>
            <ul className="list-none pl-0">
              {availableCodes.map(code => (
                <li key={code} className="mb-1">
                  <strong>{code}:</strong> {codeDescriptions[code]}
                </li>
              ))}
            </ul>
            <button
              onClick={toggleModal}
              className="mt-4 bg-red-600 text-white p-2 rounded-md hover:bg-red-700 focus:outline-none w-full"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModulesPage;
