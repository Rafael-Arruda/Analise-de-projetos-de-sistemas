
import Header from "../../components/Header";
import Title from "../../components/Title";
import {FiHome} from 'react-icons/fi';

export default function Dashboard(){

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Fazer pedido">
                    <FiHome size={25} color="#000"/>
                </Title>
            </div>
        </div>
    )
}