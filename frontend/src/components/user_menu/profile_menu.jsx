import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import './profile_menu.css'

const ProfileMenu = ({ show, toggle }) => {
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const handleSiteClick = (site) => {
        toggle(false)
        navigate(site);
    };
    if (show) {
        return (
            <div className="auth-menu">

                {isAuthenticated ?
                    <ul>
                        <a onClick={()=>handleSiteClick("/profile")}><li>Perfil</li></a>
                        <a onClick={()=>handleSiteClick("/logout")}><li>Cerrar sesión</li></a>
                    </ul>
                    :
                    <ul>
                        <a onClick={()=>handleSiteClick("/login")}><li>Iniciar sesión</li></a>
                        <a onClick={()=>handleSiteClick("/register")}><li>Registrarse</li></a>
                    </ul>
                }

            </div>
        )
    }
}

export default ProfileMenu