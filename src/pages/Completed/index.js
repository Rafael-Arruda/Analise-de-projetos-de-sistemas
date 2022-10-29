
import Header from '../../components/Header';
import Title from '../../components/Title';

import {FiCheckSquare} from 'react-icons/fi'

export default function Completed() {
    return(
        <div>

            <Header/>

            <div className="content">
                <Title name="Concluídos">
                    <FiCheckSquare size={25} color="#000"/>
                </Title>
            </div>
        </div>
    )
}