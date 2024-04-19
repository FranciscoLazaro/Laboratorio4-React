import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface Instrumento {
  id: string;
  instrumento: string;
  marca: string;
  modelo: string;
  imagen: string;
  precio: string;
  costoEnvio: string;
  cantidadVendida: string;
  descripcion: string;
}

const App: React.FC = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  useEffect(() => {
    fetch('/instrumentos.json')
      .then(response => response.json())
      .then(data => setInstrumentos(data.instrumentos))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Instrumentos</h1>
      {instrumentos.map((instrumento) => (
        <div key={instrumento.id} className="instrumento">
          <img src={instrumento.imagen} alt={instrumento.instrumento} />
          <div className="descripcion">
            <h2>{instrumento.instrumento}</h2>
            <p>Marca: {instrumento.marca}</p>
            <p>Modelo: {instrumento.modelo}</p>
            <p>Precio: ${instrumento.precio}</p>
            <p>  {instrumento.costoEnvio === 'G' ? 'Envío gratis a todo el país' : `El costo del envio es: $${instrumento.costoEnvio}`}</p>
            <p>{instrumento.cantidadVendida} vendidos</p>
            <p>Descripción: {instrumento.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
