import React, { useState, useContext, useEffect } from "react"
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.png';

import { MdPerson, MdEmail, MdLock} from 'react-icons/md';

import { AuthContext } from '../../contexts/auth';

export default function SignUp() {

    const { signUp, loadingAuth, errorMessage, setErrorMessage } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setErrorMessage('');
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        
        if(name !== '' && email !== '' && password !== ''){
            signUp(email, password, name);
        }
    }

    return(
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Sistema Logo"/>
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Cadastrar</h1>
                    <div>
                        <MdPerson size={16} color="#000"/>
                        <input type="text" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div>
                        <MdEmail size={16} color="#000"/>
                        <input type="text" placeholder="email@email.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <MdLock size={16} color="#000"/>
                        <input type="password" placeholder="********" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    { errorMessage !== '' && <span className="error">{errorMessage}</span>}
                    <button type="submit">{ loadingAuth ? 'Carregando...' : 'Cadastrar' }</button>
                </form>

                <Link to="/">Já possui uma conta? Faça login</Link>

            </div>
        </div>
    )
}