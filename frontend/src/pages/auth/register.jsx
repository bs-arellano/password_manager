import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BACKEND_URL } from "../../config/constants";
import Container from "../../components/container/container";

const Register = () => {
    const navigate = useNavigate()

    //Revisa si ya existe una sesion
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
    }, [isAuthenticated, navigate])
    //Datos del formulario
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })
    //Solicitud albackend
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = formData
        const data = {
            "username": username,
            "email": email,
            "password": password
        }
        try {
            const response = await fetch(`${BACKEND_URL}/register`, {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            //Alamacena la sesion y redirige a la pagina principal
            if (response.ok) {
                navigate("/")
            } else {
                console.error('Error al realizar la solicitud');
                navigate("/register")
            }
        } catch (error) {
            console.log('Error en la solicitud:', error)
            navigate("/register")
        }
    }
    return (
        <Container>

            <form className="data-form" onSubmit={handleSubmit}>
                <h2>Registrarse</h2>
                {/* USERNAME */}
                <div className="data-form-option">
                    <label htmlFor="username">Nombre de usuario</label>
                    <input
                        type="text"
                        id="username"
                        value={formData.username}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                username: e.target.value
                            })
                        }}
                    />
                </div>
                {/* EMAIL */}
                <div className="data-form-option">
                    <label htmlFor="email">Correo eletronico</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }}
                    />
                </div>
                {/* PASSWORD */}
                <div className="data-form-option">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                password: e.target.value
                            })
                        }}
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </Container>
    )
}

export default Register