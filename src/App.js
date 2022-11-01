import axios from 'axios';
import { useState } from 'react';
import './App.css';
function App() {
  const [busqueda, setBusqueda] = useState("");
  const [listado, setListado] = useState([]);

  const hazBusqueda = () => {
    const url = `https://fr1.api.radio-browser.info/json/stations/byname/${busqueda}`;
    axios.get(url)
      .then(r => setListado(r.data))
      .catch(e => console.error(e))
  }

  return (
    <div className="App">
      <h1>Bienvenid@ a la app <span>OpenRadioCamp</span></h1>
      <input type="text" placeholder='Escribe el nombre de la radio' value={busqueda} onChange={e => setBusqueda(e.target.value)}/>
      <button onClick={hazBusqueda}>Buscar</button>
      <section aria-label='listado-emisoras'>
        {listado.length}
      </section>
    </div>
  );
}

export default App;
