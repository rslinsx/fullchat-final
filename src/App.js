import './App.css';
import { useEffect, useState } from 'react';
import MainScren from './components/layout/MainScren';
import Navbar from './components/layout/Navbar';
import HomeHome from './components/layout/HomeHome';
import LoginForm from './components/layout/LoginForm';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {


  //marcador de login que será alterado para true quando usuario logar
  //o JSON.parse tranforma de string para valor boolenano da variável localstorage key
  const [estaLogado, setEstaLogado] = useState(JSON.parse(localStorage.getItem('key')));
  const [socketUnic, setSocketUnic] = useState(null);
  const [listDeConversas, setListDeConversas] = useState(null);

  function logOut(){
    localStorage.setItem('key', false);
  };



  return (
    <div className="App">
      <MainScren>
        <Router>
          {estaLogado && <Navbar sair={logOut}/>}
          <Routes>
            <Route path='/' element={ estaLogado ? <HomeHome/> : <Navigate to="/login"/> }/>

            <Route path="/login" element={estaLogado ? <Navigate to="/"/> : <LoginForm/>}/>

          </Routes>

        </Router>  

      </MainScren>

    </div>
  );
}

export default App;
