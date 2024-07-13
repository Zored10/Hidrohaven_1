
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import Login from "./Bienvenida";
import Areas from "./Areas";
import Ganado from "./Ganado";

const Menu = () => {
  
  return (
        
    <BrowserRouter>
    
        <Link to='/' className="navbar-brand">AjoloTics</Link>
        <Link to='/areas' className="dropdown-item" >Cabeza</Link>
        <Link to='/ganado' className="dropdown-item" >Ganado</Link>

        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/ganado" element={<Ganado />} />
        </Routes>
    </BrowserRouter>

  )
}



export default Menu

