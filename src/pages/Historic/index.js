

import Header from '../../components/Header';
import Title from '../../components/Title';

import {FiDatabase} from 'react-icons/fi'

export default function Historic() {
    return(
        <div>

            <Header/>

            <div className="content">
                <Title name="Histórico">
                    <FiDatabase size={25} color="#000"/>
                </Title>
            </div>
        </div>
    )
}