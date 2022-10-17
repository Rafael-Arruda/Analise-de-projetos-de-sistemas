import { useState, useContext, useEffect } from "react"
import {Link} from 'react-router-dom';
import './signin.css';
import logo from '../../assets/logo.png';

import { MdEmail , MdLock} from 'react-icons/md';

import { AuthContext } from '../../contexts/auth';

export default function SignIn() {

    const { signIn, loadingAuth, errorMessage, setErrorMessage } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setErrorMessage('');
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        
        if(email !== '' && password !== '') {
            signIn(email, password);
        }
    }

    return(
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Sistema Logo"/>
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div>
                        <MdEmail size={16} color="#000"/>
                        <input type="text" placeholder="email@email.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <MdLock size={16} color="#000"/>
                        <input type="password" placeholder="******" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    { errorMessage !== '' && <span className="error">{errorMessage}</span>}
                    <button type="submit">{ loadingAuth ? 'Carregando...' : 'Acessar' }</button>
                </form>

                <Link to="/register">Não possui uma conta? Criar uma conta</Link>

            </div>
        </div>
    )
}