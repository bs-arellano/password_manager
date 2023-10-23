import { useEffect, useState } from "react"
import Container from "../../components/container/container"
import ListItem from "../../components/listItem/listItem"
import { BACKEND_URL } from "../../config/constants";

const Manager = () => {
    const [crentials, setCredentials] = useState([])
    const fetchData = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/credentials`, {
                method: 'GET',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                const result = await response.json();
                return setCredentials(result)
            } else {
                console.error('Error al realizar la solicitud');
            }
        }
        catch (error) {
            console.log('Error al realizar la solicitud:', error);
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <article>
            <h2>Tus credenciales</h2>
            <p>A continuación, se muestran las contraseñas que has almacenado:</p>
            {crentials?crentials.map((credential, index)=>{
                <ListItem key={index} text={credential.text} data={credential}/>
            }):null}
        </article >
    )
}

export default Manager