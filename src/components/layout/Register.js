import { useState } from "react";
import styles from "./Register.module.css";
import { Link } from 'react-router-dom';

function Register(){



    const [emailNovoCadastro, setEmailNovoCadastro] = useState();
    const [senhaNovoCadastro, setSenhaNovoCadastro] = useState();
    const [nomeNovoCadastro, setNomeNovoCadastro] = useState();
    const [sobrenomeNovoCadastro, setSobrenomeNovoCadastro] = useState();
    const [mostrarSenha, setMostrarSenha] = useState(false);

    function cadastrarNovoUsuario(){
        fetch('https://apifullchat-production.up.railway.app/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    email: emailNovoCadastro,
                    senha: senhaNovoCadastro,
                    nome: nomeNovoCadastro,
                    sobrenome: sobrenomeNovoCadastro    
            })
        }).then((response)=>{
            return response.json();
        }).then((data)=>{
            console.log(data);
            alert(data);
        }).catch((err)=>{
            console.log(err);
        })
    };


    function setarEmailCadastro (e){
        setEmailNovoCadastro(e.target.value)
    };

    function setarSenhaCadastro (e){
        setSenhaNovoCadastro(e.target.value)
    };

    function setarNomeCadastro (e){
        setNomeNovoCadastro(e.target.value)
    };

    function setarSobreNomeCadastro (e){
        setSobrenomeNovoCadastro(e.target.value)
    };

    function botaoMostrarSenha(){
        if (mostrarSenha) {
            setMostrarSenha(false);
        }else{
            setMostrarSenha(true);
        }
    }


    return(
        <div  className="container-fluid bg-black">
            <div className="row justify-content-center align-items-center bg-black">
                <div className="col-12 col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mt-5">
                    <div className="card" >
                        <div className="card-header d-flex justify-content-center bg-dark">
                            <h1 className="card-title text-bg-dark">Cadastre o seu acesso!</h1>
                        </div>
                        <div className="card-body bg-dark">  
                            <div>
                                <label htmlFor='email' className="form-label text-white"> Email: </label>
                                <input onChange={setarEmailCadastro} type="email" placeholder="Digite aqui o seu email válido"id="email" className="form-control"></input>
                            </div>
                            <label htmlFor='senha' className="form-label text-white"> Senha: </label>
                            <div className="input-group">
                                                        
                                <input type={mostrarSenha ? 'text' : 'password'} id="senha" placeholder='senha' className="form-control" onChange={setarSenhaCadastro}>
                                </input>
                                <div className="input-group-append">
                                    <span className="input-group-text rounded-start-0" id={styles.eyePassword} title={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'} onClick={botaoMostrarSenha}>
                                    <i className={`${mostrarSenha ? 'bi-eye' : 'bi-eye-slash'} ${styles.cursorPointer}`}></i>
                                    </span>
                                </div>

                            </div>   
                            <div>
                                <label htmlFor='nome' className="form-label text-white">Primeiro nome:</label>
                                <input onChange={setarNomeCadastro} type="text" placeholder="Digite o seu primeiro nome" id="nome" className="form-control"></input>
                            </div>
                            <div>
                                <label htmlFor='sobrenome'className="form-label text-white">Sobrenome:</label>
                                <input onChange={setarSobreNomeCadastro} type="text" placeholder="Digite o seu sobrenome" id="sobrenome" className="form-control"></input>
                            </div>
                            
                        </div>
                        <div className="d-grid gap-2 bg-dark">
                            <div>
                                <button onClick={cadastrarNovoUsuario} className="btn btn-success p-2 w-100">Cadastrar</button> 
                            </div>
                            <div>
                                <Link to="/login" className="btn btn-primary w-100">Ir para página de Login</Link>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>        
        </div>
    )
};

export default Register;