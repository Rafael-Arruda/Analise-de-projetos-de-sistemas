
import Header from '../../components/Header';
import Title from '../../components/Title';

import {FiUser} from 'react-icons/fi'

export default function Customer() {
    return(
        <div>

            <Header/>

            <div className="content">
                <Title name="Novo cliente">
                    <FiUser size={25} color="#000"/>
                </Title>
            </div>
        </div>
    )
}