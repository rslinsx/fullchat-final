import './App.css';
import { useEffect, useState } from 'react';
import MainScren from './components/MainScren';


function App() {


  //marcador de login que será alterado para true quando usuario logar
  //o JSON.parse tranforma de string para valor boolenano da variável localstorage key
  const [estaLogado, setEstaLogado] = useState(JSON.parse(localStorage.getItem('key')));
  const [socketUnic, setSocketUnic] = useState(null);
  const [listDeConversas, setListDeConversas] = useState(null);



  return (
    <div className="App">
      <MainScren>
          <h1>Hello World!</h1>

      </MainScren>

    </div>
  );
}

export default App;
