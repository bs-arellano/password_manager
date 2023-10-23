import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Container from "../../components/container/container"
import ListItem from "../../components/listItem/listItem"
import { BACKEND_URL } from "../../config/constants";
import { useSelector } from "react-redux";

const Manager = () => {
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const token = useSelector(state => state.auth.token)
    const [credentials, setCredentials] = useState()
    const [newCredentialData, setNewCredentialData] = useState({
        url: "",
        username: "",
        password: ""
    })
    const saveCredential = async () => {
        const data = {
            url: newCredentialData.url,
            username: newCredentialData.username,
            password: newCredentialData.password
        }
        const response = await fetch(`${BACKEND_URL}/add_credential`, {
            mode: "cors",
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            },
            body: JSON.stringify(data),
        })
        if (response.ok){
            window.location.reload();
        }
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/")
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/credentials`, {
                    method: 'GET',
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'bearer ' + token
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
    
        fetchData()
    }, [isAuthenticated, navigate, token])

    return (
        <>
            <article>
                <h2>Agregar una credencial</h2>
                <Container>
                    <form className="dataForm">
                        <label htmlFor="adCredentialURL">Sitio web:</label>
                        <input id="adCredentialURL" type="url" onChange={(e) => {
                            setNewCredentialData({
                                ...newCredentialData,
                                url: e.target.value
                            })
                        }} />
                        <label htmlFor="addCredentialUsername">Nombre de usuario</label>
                        <input id="addCredentialUsername" type="text" onChange={(e) => {
                            setNewCredentialData({
                                ...newCredentialData,
                                username: e.target.value
                            })
                        }} />
                        <label htmlFor="addCredentialPassword">Contraseña:</label>
                        <input id="addCredentialPassword" type="password" onChange={(e) => {
                            setNewCredentialData({
                                ...newCredentialData,
                                password: e.target.value
                            })
                        }} />
                        <button onClick={(e) => {
                            e.preventDefault()
                            saveCredential()
                        }}>Guardar credencial</button>
                    </form>
                </Container>
            </article>
            <article>
                <h2>Tus credenciales</h2>
                <p>A continuación, se muestran las contraseñas que has almacenado:</p>
                <Container>
                    {credentials ? credentials.map((credential, index) => (
                        <ListItem key={index} text={credential.url} data={credential} />
                    )) : null}
                </Container>
            </article >
        </>
    )
}

export default Manager