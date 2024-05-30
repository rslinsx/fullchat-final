import styles from "./Navbar.module.css";
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({sair}){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
            <Link to="/" className="navbar-brand"><img src="favicon.ico" id={styles.logoMenu} title="home"></img></Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><Link to="/mensagens" className="nav-link">conversas</Link></li>
                    <li className="nav-item"><Link to="/crm" className="nav-link" >crm</Link></li>
                    <li className="nav-item"><Link to="/perfil" className="nav-link" >perfil</Link></li>
                    <li><a href="" className="nav-link" onClick={sair}>sair</a></li>
                </ul>
            </div>
            </div>
        </nav>
    );
};

export default Navbar;