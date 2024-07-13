import React, { useState, useEffect } from 'react';
import { rutaGanadoBackend } from '../../../declarations/rutaGanadoBackend';

function App() {

    const [error, setError] = useState(null);
    const [edificios, setEdificios] = useState([]);

    async function handleGetEdificios() {
        try {
            const edificiosResponse = await rutaGanadoBackend.consultDepartamentos();
            setEdificios(edificiosResponse);
            console.log(edificiosResponse);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        handleGetEdificios();
    }, []);

    return (
        <div>
            <h2>Consultar Edificios</h2>
            {error && <p>Error: {error}</p>}
            {edificios && edificios.map((departamento, index) => (
                <div key={index}>
                    <h3>Departamento {index + 1}:</h3>
                    <p>Propietario: {departamento.propietario}</p>
                    <p>Consumo de Agua Potable: {departamento.consumoAguaPotable}</p>
                    <p>Consumo de Agua Gris: {departamento.consumoAguaGris}</p>
                    <p>Consumo de Agua Negra: {departamento.consumoAguaNegra}</p>
                    <p>Estado del Agua: {departamento.estadoAgua}</p>
                    <p>Registro de Mantenimiento: {departamento.registroMantenimiento}</p>
                </div>
            ))}
        </div>
    );
}

export default App;
