import React, { useState } from 'react';
import { rutaGanadoBackend } from 'declarations/rutaGanadoBackend';

function App() {
    const initialDatosDepartamento = {
        propietario: '',
        consumoAguaPotable: '',
        consumoAguaGris: '',
        consumoAguaNegra: '',
        estadoAgua: '',
        registroMantenimiento: '',
    };

    const [message, setMessage] = useState('');
    const [propietario, setPropietario] = useState('');
    const [consumoAguaPotable, setConsumoAguaPotable] = useState('');
    const [consumoAguaGris, setConsumoAguaGris] = useState('');
    const [consumoAguaNegra, setConsumoAguaNegra] = useState('');
    const [estadoAgua, setEstadoAgua] = useState('');
    const [registroMantenimiento, setRegistroMantenimiento] = useState('');
    const [idDepartamento, setIdDepartamento] = useState('');

    function handleSaveDepartamento(event) {
        event.preventDefault();
        const datosDepartamento = {
            propietario,
            consumoAguaPotable,
            consumoAguaGris,
            consumoAguaNegra,
            estadoAgua,
            registroMantenimiento,
        };
        rutaGanadoBackend
            .saveDepartamento(datosDepartamento, idDepartamento)
            .then(() => {
                setMessage('Tu departamento fue agregado correctamente, gracias!');
            })
            .catch((error) => {
                setMessage(`Error: ${error}`);
            });
    }

    function handleReset(event) {
        event.preventDefault();
        setPropietario('');
        setConsumoAguaPotable('');
        setConsumoAguaGris('');
        setConsumoAguaNegra('');
        setEstadoAgua('');
        setRegistroMantenimiento('');
        setIdDepartamento('');
        setMessage('');
    }

    return (
        <div className="container p-sm-2">
            <h2 className="text-center p-sm-2">Agregar Datos de Departamento</h2>
            <div className="row">
                <form className="col-md-6" onSubmit={handleSaveDepartamento}>
                    <input
                        type="text"
                        value={idDepartamento}
                        onChange={(e) => setIdDepartamento(e.target.value)}
                        placeholder="ID de Departamento"
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                        placeholder="Propietario"
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        value={consumoAguaPotable}
                        onChange={(e) => setConsumoAguaPotable(e.target.value)}
                        placeholder="Consumo de Agua Potable"
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        value={consumoAguaGris}
                        onChange={(e) => setConsumoAguaGris(e.target.value)}
                        placeholder="Consumo de Agua Gris"
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        value={consumoAguaNegra}
                        onChange={(e) => setConsumoAguaNegra(e.target.value)}
                        placeholder="Consumo de Agua Negra"
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        value={estadoAgua}
                        onChange={(e) => setEstadoAgua(e.target.value)}
                        placeholder="Estado del Agua"
                        className="form-control mb-2"
                    />
                    <input
                        type="text"
                        value={registroMantenimiento}
                        onChange={(e) => setRegistroMantenimiento(e.target.value)}
                        placeholder="Registro de Mantenimiento"
                        className="form-control mb-2"
                    />
                    <button type="submit" className="btn btn-primary mr-2">Guardar</button>
                    <button type="button" className="btn btn-secondary" onClick={handleReset}>Nuevo ingreso</button>
                </form>
                <div className="col-md-6">
                    {/* Aquí puedes añadir más campos o detalles relacionados con el manejo del agua */}
                </div>
                <div className="alert"><p>{message}</p></div>
            </div>
        </div>
    );
}

export default App;
