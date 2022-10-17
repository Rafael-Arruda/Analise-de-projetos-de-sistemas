import React, {useContext} from "react"

import { AuthContext } from '../../contexts/auth';

export default function Dashboard(){

    const { signOut, user } = useContext(AuthContext);

    return(
        <div>
            <h1>Bem vindo, {user.nome}</h1>
            <button onClick={() => signOut()}>Fazer logout</button>
        </div>
    )
}