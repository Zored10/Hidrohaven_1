import React, { useState } from 'react';
import { rutaGanadoBackend } from '../../../declarations/rutaGanadoBackend';

function App() {
  const [idDepartamento, setIdDepartamento] = useState('');
  const [datosDepartamento, setDatosDepartamento] = useState(null);
  const [error, setError] = useState(null);

  async function handleConsultarDepartamento() {
    try {
      const datosDepartamentoResponse = await rutaGanadoBackend.consultDepartamento(idDepartamento);
      setDatosDepartamento(datosDepartamentoResponse);
      console.log(datosDepartamentoResponse);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Consultar Departamento</h2>
      <input
        type="text"
        value={idDepartamento}
        onChange={(e) => setIdDepartamento(e.target.value)}
        placeholder="Ingrese el ID del departamento"
      />
      <button onClick={handleConsultarDepartamento}>Consultar</button>
      {error && <p>Error: {error}</p>}
      {datosDepartamento && (
        <div>
          <h3>Datos del Departamento:</h3>
          <div>
            <label>Propietario: </label>
            <strong>{datosDepartamento.propietario}</strong>
          </div>
          <div>
            <label>Consumo de Agua Potable: </label>
            <strong>{datosDepartamento.consumoAguaPotable}</strong>
          </div>
          <div>
            <label>Consumo de Agua Gris: </label>
            <strong>{datosDepartamento.consumoAguaGris}</strong>
          </div>
          <div>
            <label>Consumo de Agua Negra: </label>
            <strong>{datosDepartamento.consumoAguaNegra}</strong>
          </div>
          <div>
            <label>Estado del Agua: </label>
            <strong>{datosDepartamento.estadoAgua}</strong>
          </div>
          <div>
            <label>Registro de Mantenimiento: </label>
            <strong>{datosDepartamento.registroMantenimiento}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
