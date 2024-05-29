/* global location */

import { useState } from 'react';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';


function LoginForm(){
    
    const [emailDigitado,setEmailDigitado] = useState('');
    const [senhadigitada, setSenhaDigitada] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    

    function setarEmail(e){
        setEmailDigitado(e.target.value);
    };

    function setarSenha(e){
        setSenhaDigitada(e.target.value);
    };

    function getEnterKey(e){
        if(e.key === 'Enter')
        {loginEnviar()};
    };

    function loginEnviar(){

        fetch('http://localhost:8081/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: emailDigitado, senha: senhadigitada})
        }).then((response)=>{
             return response.json();
        }).then((data)=>{
            if(data === null){
                alert("usuário ou senha incorretos!")
            }else{
            localStorage.setItem('email', data.email);        
            localStorage.setItem('key',true);
            window.location.reload();  
        };
        }).catch((err)=>{
            console.log(err);
        });
        
    };
    
    function botaoMostrarSenha(){
        if (mostrarSenha) {
            setMostrarSenha(false);
        }else{
            setMostrarSenha(true);
        }
    }

    
    return(
            <div className="container-fluid">
                        <div className="row justify-content-center align-items-center min-vh-100" id={styles.image}>
                            <div className="col-12 col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 ">
                                <div className="card bg-dark bg-opacity-50">
                                    <div className="card-body">
                                            <h1 className="card-title text-white justify-content-center text-center">Full-Chat!</h1>
                                            <div>
                                                <div className="mb-3">
                                                    <label htmlFor='email' className="form-label text-white">Email</label>
                                                    <input type="email" id="email" placeholder='email' className="form-control" onChange={setarEmail}></input>
                                                </div>
                                                <div className="mb-3">
                                                        <label htmlFor='senha' className="form-label text-white">Senha </label>
                                                    <div className="input-group">
                                                        
                                                        <input type={mostrarSenha ? 'text' : 'password'} id="senha" placeholder='senha' className="form-control" onChange={setarSenha} onKeyDown={(e)=>getEnterKey(e)}>
                                                        </input>
                                                        <div className="input-group-append">
                                                            <span className="input-group-text rounded-start-0" id={styles.eyePassword} title={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'} onClick={botaoMostrarSenha}>
                                                                <i className={mostrarSenha ? 'bi-eye' : 'bi-eye-slash'}></i>
                                                            </span>
                                                        </div>

                                                    </div>    
                                                </div>
                                            </div>
                                            <div className="d-grid gap-2">
                                                <button onClick={loginEnviar} className="btn btn-success">Entrar</button>
                                                
                                                <Link to ="/cadastro"><button className="btn btn-dark w-100">Registrar-se</button></Link>
                                                
                                                  
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>          
            </div>

            
    )
};

export default LoginForm;

