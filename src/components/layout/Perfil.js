import React, { useEffect, useState, useRef } from "react";
import styles from './Perfil.module.css';


function Perfil() {


  const [primeiroNomePerfil, setPrimeiroNomePerfil] = useState('');
  const [ultimoNomePerfil, setUltimoNomePerfil] = useState('');

  function carregarInfosDoPerfil(){
    fetch('http://localhost:8081/perfil', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        email: localStorage.getItem('email')
      })
    }).then((response)=>{
      return response.json();
    }).then((data)=>{
      setPrimeiroNomePerfil(data.firstname);
      setUltimoNomePerfil(data.lastname);
      
    }).catch(err=>{
      console.log(err)
    })
  };

  useEffect(()=>{
    carregarInfosDoPerfil();
  }, []);
  

  return (
    <div className="container-fluid bg-black">
      <div className="card bg-dark text-bg-dark mt-5 justify-content-center align-items-center bg-opacity-50">

        <div className="card-body">
          <div className="card-header">
            <h1 className="card-title">Cadastro</h1>
          </div>
          <h3 >Nome: {primeiroNomePerfil}</h3>
          <h3>sobrenome: {ultimoNomePerfil}</h3>
          <h3>Email: {localStorage.getItem('email')}</h3>
        </div>
      </div>
    </div>
  );
}

export default Perfil;