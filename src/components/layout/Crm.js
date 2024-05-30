import React, {useEffect, useState} from "react";
import styles from "./Crm.module.css";
import { Link } from 'react-router-dom';

function Crm({socket}){ 
    
    const [mostrarJanelaProcurar, setMostarJanelaProcurar] = useState(false);
    const [mostrarJanelaCadastro, setMostrarJanelaCadastro] = useState(false);
    const [mostrarJanelaExcluirContatoEConversa, setMostrarJanelaExcluirContatoEConversa] = useState(false);
    
    //hooks para encontrar contatos para adicionar no CRM
    const [emailProcurado, setEmailProcurado] = useState('');
    const [emailContatoEncontrado, setEmailContatoEncontrado] = useState('');
    const [nomeContatoEncontrado, setNomeContatoEncontrado] = useState('');
    const [ultimoNomeContatoEncontrado, setUltimoNomeContatoEncontrado] = useState('');
    //email procurado no proprio crm
    const [emailProcuradoCrm, setEmailProcuradoCrm] = useState('');
    const [emailEncontradoCrm, setEmailEncontradoCrm] = useState('');
    const [mostrarJanelaProcurarCadastro, setMostrarJanelaProcurarContato] = useState(false);
    const [mostrarJanelaEmailEncontradoCrm, setMostarJanelaEmailEncontradoCrm] = useState(false);
    //contatos do email crm
    const [contatosEncontradosCrm, setcontatosEncontradosCrm] = useState([]);
    const [emailASerExcluido, setEmailASerExcluido] = useState('');
    


    function procurarEmail(){

        if (emailProcurado !== '') {

        fetch('https://apifullchat-production.up.railway.app/crm/procurar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: emailProcurado})
        }).then((response)=>{
             return response.json();
        }).then((data)=>{
            if(data === null){
                alert("Email nao encontrado!")
            }else{
             setEmailContatoEncontrado(data.email); 
             setNomeContatoEncontrado(data.firstname);
             setUltimoNomeContatoEncontrado(data.lastname);
             setMostrarJanelaCadastro(true);          
        };
        }).catch((err)=>{
            console.log(err);
        });
        }else{
        alert("Campo vazio!");
    }};

    //função de procurar contato no CRM
    function procurarEmailParaIniciarConversa(){

        if (emailProcuradoCrm !== '') {

        fetch('https://apifullchat-production.up.railway.app/crm/procurarcontato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({emailUserAtual: localStorage.getItem('email'), 
                                  emailProcuradoCrm: emailProcuradoCrm})
        }).then((response)=>{
             return response.json();
        }).then((data)=>{
            if(data === null){
                alert("Email nao encontrado no seu CRM!")
            }else{
             
             setEmailEncontradoCrm(data.email);
             setMostarJanelaEmailEncontradoCrm(true);        
        };
        }).catch((err)=>{
            console.log(err);
        });
        }else{
        alert("Campo vazio!");
    }};



    


    function incluirContatoCrm() {
        fetch('https://apifullchat-production.up.railway.app/crm/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                 emailUserAtual: localStorage.getItem('email'),
                 email: emailContatoEncontrado, 
                 nome: nomeContatoEncontrado,
                 ultimoNome: ultimoNomeContatoEncontrado
                 })
        }).then((response)=>{
             return response.json();
        }).then((data)=>{
            alert(data)
        }).catch((err)=>{
            console.log(err);
        });

        setEmailProcurado('');
        setMostrarJanelaCadastro(false);
        setMostarJanelaProcurar(false);
        window.location.reload(); 
};

     function carregarContatos(){
        fetch('https://apifullchat-production.up.railway.app/crm/contatos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                crmBuscado: `${localStorage.getItem('email')}contacts`
            })
        })
        .then(response => {
            return response.json();
        })
        .then(data=>{
            setcontatosEncontradosCrm(data);
            // contatosEncontradosCrm.map((c)=>{
            //     console.log(c.email);
            // });
        })
        .catch(error => {
            console.log(error);
        });
     };
    
     useEffect(()=>{
        carregarContatos(); 
      }, []);



    function CadastrarContato(){
      setMostarJanelaProcurar(true); 
    };

    function procurarContato(){
        setMostrarJanelaProcurarContato(true);
    }

    function fecharJanelaProcurarContato(){
        setMostrarJanelaProcurarContato(false);
        setEmailProcuradoCrm('');
        setEmailEncontradoCrm('');
        setMostarJanelaEmailEncontradoCrm(false);

    }

    function fecharJanelaCadastro(){
        setEmailProcurado('');
        setMostrarJanelaCadastro(false);
        setMostarJanelaProcurar(false); 
      };

    function setarEmailProcurado(e){
        setEmailProcurado(e.target.value);
    };

    function setarEmailProcuradoProprioCrm(e){
        setEmailProcuradoCrm(e.target.value);
    }
    function teclaEnterProcurarContatoCrm(e){
        if (e.key === 'Enter'){
            procurarEmailParaIniciarConversa();
        }
    }

    // Lógica socket // iniciar conversa

    function generateConversationKey(email1, email2) {
        const sortedEmails = [email1, email2].sort();
        return `${sortedEmails[0]}_${sortedEmails[1]}`;
    };

    function iniciarConversa(email){
        socket.emit('EmitirInicio', {emailIniciado: email, emailIniciou: localStorage.getItem('email'), keyConversation: generateConversationKey(email, localStorage.getItem('email'))});
        socket.emit("ListaDeConversas", localStorage.getItem('email'));
    };

    function excluirContatoEConversa(){
        setMostrarJanelaExcluirContatoEConversa(true)
        socket.emit('excluirContatoEConversa', {emailLogado: localStorage.getItem('email'), emailASerExcluido: emailASerExcluido, keyConversation: generateConversationKey(localStorage.getItem('email'), emailASerExcluido)});
        window.location.reload();
    };

    function fecharJanelaExcluirContatoEConversa(){
        setMostrarJanelaExcluirContatoEConversa(false);
    };

    function mostrarJanelaConfirmacaoESetarEmailParaSerExcluido(email) {
        setEmailASerExcluido(email);
        setMostrarJanelaExcluirContatoEConversa(true);
    };



    return(
        <div className="container-fluid min-vh-100"  id={styles.image}>
            
            <div className="p-4 d-flex justify-content-center flex-column align-items-center">
                <h1 className="p-3">CRM</h1>
                <button onClick={CadastrarContato} className="btn btn-success">Cadastrar contato</button>
                <button onClick={procurarContato} className="btn btn-success mt-2">Procurar contato</button>
            </div>
                <div className="row">
                {contatosEncontradosCrm.map((contatoEncontrado)=>(
                
                    <div className="col-3 mt-3">
                        <div className="card bg-dark bg-opacity-50 ms-2" id={contatoEncontrado.email} style={{width: "16rem"}}>
                            <img src="https://www.guiaviagensbrasil.com/imagens/Imagem%20do%20mar%20calma%20e%20belo%20da%20Praia%20da%20Engenhoca-Itacar%C3%A9-Bahia-BA.jpg" class="card-img-top" alt="..."></img>
                            <div className="card-body">
                                <div className="card-header">
                                    <h5 class="card-title text-white">{contatoEncontrado.email}</h5>
                                    <p className="card-text text-white">{contatoEncontrado.firstname} {contatoEncontrado.lastname}</p>
                                </div>
                                <div className="card-footer d-flex flex-column align-items-center">    
                                    <Link to ="/mensagens"><button className="btn btn-success" onClick={()=> iniciarConversa(contatoEncontrado.email)}>Iniciar conversa</button></Link>
                                    <button onClick={()=>mostrarJanelaConfirmacaoESetarEmailParaSerExcluido(contatoEncontrado.email)} className="btn mt-1 btn-danger">Deletar</button>
                                </div>
                            </div>
                        </div>
                    </div>                
                ))}
                </div>


            {mostrarJanelaProcurar && (
            
            <div className={`${styles.janelaCadastroContato} card bg-dark text-bg-dark w-50 h-75 fixed-top`}>
                <div className="d-flex justify-content-end">
                    
                    <button  className="btn btn-danger" onClick={fecharJanelaCadastro}>X</button>
                </div>
                <div className="d-flex justify-content-center">
                    <h2 className="text-white me-1 card-header">Adicionar novo contato</h2>
                </div>    
                <div className="input-group mt-3">
                    <input id="email" className="form-control" placeholder="Digite o email completo"onChange={setarEmailProcurado}/>
                    <div className="input-group-append">
                    <button className="btn btn-success" onClick={procurarEmail}>Procurar</button>
                    </div>
                </div>

                {mostrarJanelaCadastro && (
                <div className="d-flex justify-content-center mt-4">
                    <div className="card w-50 bg-black">
                        <div className="card-header text-white">
                            <h4>nome: {nomeContatoEncontrado} {ultimoNomeContatoEncontrado}</h4>
                        </div>
                        <div className="card-body d-flex justify-content-center text-white">
                            <p>email: {emailContatoEncontrado} </p>
                            <button className="btn btn-success"
                            onClick={incluirContatoCrm}>Incluir contato no CRM</button>
                        </div>
                    </div>
                </div>
                
                )} 
    

            </div>)} 

            {/* JANELA EXCLUIR CONTATO E CONVERSA */}
            {mostrarJanelaExcluirContatoEConversa && (
            <div className={`${styles.janelaExcluirContatoEConversa} card bg-dark text-bg-dark w-25 h-50 fixed-top`}>
                <div className="card-header d-flex justify-content-end">
                    <button className="btn btn-danger" onClick={()=>fecharJanelaExcluirContatoEConversa()}>X</button>
                </div>
                <div className="card-body bg-black">
                    <p>Essa ação é irreversível. A conversa será apagada também para contato selecionado. Se desejar pode adicionar novamente o contato no seu CRM e iniciar uma nova conversa.</p>
                    <p>Certeza de que desejar apagar o contato e a conversa de {emailASerExcluido}? </p>
                </div>
                <div className="card-footer d-flex justify-content-end">
                <button className="btn btn-danger" onClick={()=> excluirContatoEConversa()}>Confirmar</button>    
            </div>
                </div>
            )}
            
            
            {mostrarJanelaProcurarCadastro && (<div className="card bg-dark text-bg-dark w-50 h-75 fixed-top" id={styles.procurarContato}>
                <div className="card-body">
                    <div className="card-header d-flex justify-content-end">
                        <button  className="btn btn-danger"onClick={()=>fecharJanelaProcurarContato()}>X</button>
                    </div>
                    <div className="card-title d-flex justify-content-center">
                        <h3>Procurar contato</h3>
                    </div>
                    <div className="input-group">    
                        <input  className="form-control w-75" type="text" onKeyDown={(e)=>{teclaEnterProcurarContatoCrm(e)}} onChange={setarEmailProcuradoProprioCrm}/>
                        <div className="input-group-append">
                            <button className="btn btn-success" onClick={procurarEmailParaIniciarConversa}>Pesquisar</button>
                        </div>
                    </div>
                    {mostrarJanelaEmailEncontradoCrm && (
                    <div className="d-flex justify-content-center mt-4">
                        <div className="card bg-black w-50">
                        <div className="card-header d-flex justify-content-center">
                            <h4 className="text-white">email: {emailEncontradoCrm}</h4>
                        </div>
                            <div className="card-body d-flex justify-content-center flex-column w-50">
                                <Link to ="/mensagens"><button className="btn btn-success" onClick={()=> iniciarConversa(emailEncontradoCrm)}>Iniciar conversa</button></Link>
                                <button onClick={()=>mostrarJanelaConfirmacaoESetarEmailParaSerExcluido(emailEncontradoCrm)} className="btn mt-1 btn-danger">Deletar</button>
                            </div>
                        </div>
                    </div>
                    )}
                </div>    
            </div>)}





        </div>

          

    )

}


export default Crm;