import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../../reducers/authSlice";
import { BACKEND_URL } from "../../config/constants";
import Container from "../../components/container/container";

const Login = () => {
    const dispatch = useDispatch()
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
        email: "",
        password: ""
    })
    //Solicitud albackend
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData
        const data = {
            "email": email,
            "password": password
        }
        try {
            const response = await fetch(`${BACKEND_URL}/login`, {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            //Alamacena la sesion y redirige a la pagina principal
            if (response.ok) {
                const result = await response.json();
                const payload = {
                    user: result.username,
                    token: result.token
                }
                dispatch(login(payload))
                navigate("/")
            } else {
                console.error('Error al realizar la solicitud');
                navigate("/login")
            }
        } catch (error) {
            console.log('Error en la solicitud:', error)
            navigate("/login")
        }
    }
    return (
        <Container>
            <form className="dataForm" onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                {/* EMAIL */}
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
                {/* PASSWORD */}
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

                <button type="submit">Iniciar Sesion</button>
            </form>
        </Container>
    )
}

export default Login