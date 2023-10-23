import { useState } from "react"
import { useSelector } from "react-redux";
import Container from "../../components/container/container"
import { BACKEND_URL } from "../../config/constants";

import './generator.css'

const Generator = () => {
    const token = useSelector(state => state.auth.token)
    const [generatedPassword, setGeneratedPassword] = useState(null)
    const [formData, setFormData] = useState({
        numChars: 8,
        upperCase: false,
        specialChars: false
    })
    const generatePassword = async () => {
        const data = {
            "len": formData.numChars,
            "upper": formData.upperCase,
            "special_chars": formData.specialChars,
        }
        try {
            const response = await fetch(`${BACKEND_URL}/generate`, {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + token
                },
                body: JSON.stringify(data),
            })
            if (response.ok) {
                const result = await response.json();
                setGeneratedPassword(result.generated_password)
            } else {
                console.error('Error al realizar la solicitud');
            }
        }
        catch (error) {
            console.log('Error al realizar la solicitud:', error);
        }
    }
    return (
        <article>
            <h2>Generador de contraseñas</h2>
            <p>Protege tus datos personales y asegura la integridad de tus cuentas en línea con contraseñas sólidas y únicas. ¡Comienza a generar tus contraseñas personalizadas ahora mismo y mantén tus cuentas seguras en todo momento!</p>
            <Container>
                <form className="inline-form">
                    <div className="inline-form-option">
                        <label htmlFor="numChars">Número de caracteres</label>
                        <input type="number" id="numChars" value={formData.numChars} min="1" max="99" onChange={(e) => {
                            if (e.target.value < 1) {
                                e.target.value = 1
                            }
                            if (e.target.value > 99) {
                                e.target.value = 99
                            }
                            setFormData({
                                ...formData,
                                numChars: e.target.value
                            })
                        }} />
                    </div>
                    <div className="inline-form-option">
                        <input type="checkbox" id="upperCase" checked={formData.upperCase} onChange={(e) => {
                            setFormData({
                                ...formData,
                                upperCase: e.target.checked
                            })
                        }} />
                        <label htmlFor="upperCase">Mayusculas</label>
                    </div>
                    <div className="inline-form-option">
                        <input type="checkbox" id="specialChars" checked={formData.specialChars} onChange={(e) => {
                            setFormData({
                                ...formData,
                                specialChars: e.target.checked
                            })
                        }} />
                        <label htmlFor="specialChars">Caracteres especiales</label>
                    </div>
                    <button type="submit" onClick={(e) => {
                        e.preventDefault()
                        generatePassword()
                    }}>Generar</button>
                </form>
            </Container>
            {generatedPassword && (
                <Container>
                    {generatedPassword}
                </Container>
            )}
        </article>
    )
}

export default Generator