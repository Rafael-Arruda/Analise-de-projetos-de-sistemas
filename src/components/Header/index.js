import React, {useContext} from 'react';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png';
import './header.css';

import {FiHome, FiUser, FiDatabase, FiCheckSquare, FiSettings} from 'react-icons/fi';

import {Link} from 'react-router-dom';

export default function Header() {

    const { user } = useContext(AuthContext)

    return(
        <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="foto avatar"/>
            </div>

            <Link to='/dashboard'>
                <FiHome color="#fff" size={24}/>
                Fazer pedido
            </Link>
            <Link to='/dashboard'>
                <FiUser color="#fff" size={24}/>
                Novo Cliente
            </Link>
            <Link to='/dashboard'>
                <FiDatabase color="#fff" size={24}/>
                Histórico
            </Link>
            <Link to='/dashboard'>
                <FiCheckSquare color="#fff" size={24}/>
                Concluídos
            </Link>
            <Link to='/dashboard'>
                <FiSettings color="#fff" size={24}/>
                Configurações
            </Link>
        </div>
    )
}