import { createClient } from "@connect2ic/core"
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity"
import { ConnectButton, ConnectDialog, Connect2ICProvider } from "@connect2ic/react"
import * as rutaGanadoBackend from "declarations/rutaGanadoBackend";
import {  useConnect } from "@connect2ic/react";
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import Login from "./Bienvenida";
import Areas from "./Areas";
import Ganado from "./Ganado";
import CabezaNueva from "./CabezaNueva";
import Catalogo from "./Catalogo";

const Home = () => {
  const {principal} = useConnect();

  function onElementAvailable(selector, callback) {
    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        callback();
      }
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  onElementAvailable(".ii-styles", () => {
    const btn2 = Array.from(document.getElementsByClassName('ii-styles'));

    const custom_style={
        "color": "red",
        "background-color": "blue",
        "padding": "3px",
        "margin-left": "4px"
    }
    

    Object.assign(btn2[0].style,custom_style);

    const texto = Array.from(document.getElementsByClassName('button-label'));
    if (texto[0])
        texto[0].remove();

    const img = Array.from(document.getElementsByClassName('img-styles'));
    img[0].style.height = "25px";

  });

  onElementAvailable(".connect-button", () => {
    const btn = Array.from(document.getElementsByClassName('connect-button'));
    const custom_style={
        "background-color": "blue",
        "font-size": "17px",
    }
    Object.assign(btn[0].style,custom_style);
    if ( btn[0].textContent == 'Connect' || btn[0].textContent == 'Conectar II')
        btn[0].textContent = 'Conectar II' ;
    else
        btn[0].textContent = 'Desconectar II' ;


  });

  
  return (
        <BrowserRouter>
            <nav className="navbar navbar-dark bg-dark" data-bs-theme="light">
        
        { principal ? ( 
            <div className="container">       
                    
                      <div class="col-sm-2"><button className="btn btn-primary btn-lg"> <Link to='/ganado' >Buscar Arete</Link></button></div>
                      <div class="col-sm-2"><button  className="btn btn-primary btn-lg"><Link to='/cabeza-nueva' >Nuevo registro</Link></button></div>
                      <div class="col-sm-2"><button className="btn btn-primary btn-lg"><Link to='/catalogo'  >Catalogo</Link></button></div>
                    {/* <span className="fs-6 text">{principal}</span> */}
                    <ConnectButton />
                    <ConnectDialog />

            </div>
        )
        : ( 
            <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#"></a>
                    </li>
                </ul>
                <ConnectButton />
                <ConnectDialog />
            </div>
        </div>
        )}
       
    </nav>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/areas" element={<Areas />} />
        <Route path="/cabeza-nueva" element={<CabezaNueva />} />
        <Route path="/ganado" element={<Ganado />} />
        <Route path="/Catalogo" element={<Catalogo />} />
    </Routes>

    </BrowserRouter>

  )
}


const client = createClient({
    canisters: {
      rutaGanadoBackend,
    },
    providers: [
      new InternetIdentity({ providerUrl: "http://127.0.0.1:8000/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai" })
    ],
    globalProviderConfig: {
      /*
       * Disables dev mode in production
       * Should be enabled when using local canisters
       */
      dev: true,
    },
  });


export default () => (
  <Connect2ICProvider client={client}>
    <Home />
  </Connect2ICProvider>
)


