import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import MobileMenu from "../mobile_menu/mobile_menu"
import ProfileMenu from "../user_menu/profile_menu";

import './navbar.css'
import page_icon from '../../assets/page_icon.svg'
import user_icon from '../../assets/user_icon.svg'
import menu_icon from '../../assets/menu_icon.svg'

const NavBar = ({ sites }) => {
    //Dependencias
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    //Estados
    const [showMobileMenu, toggleMobileMenu] = useState(false)
    const [showAutheMenu, toggleAuthMenu] = useState(false)
    //Renderiza dependiendo el tamaño de la pantalla
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    return (
        <>
            <nav className="navigationBar">
                <div className="left-elements">
                    <a className="page-icon" onClick={() => {
                        toggleAuthMenu(false)
                        toggleMobileMenu(false)
                        navigate("/")
                    }}>
                        <img src={page_icon} />
                        <h1>Gestor de Credenciales</h1>
                    </a>
                </div>
                <div className="right-elements">
                    {windowWidth <= 768 &&  isAuthenticated? (
                        <>
                            <a className="toggle-mobile-menu" onClick={() => {
                                toggleAuthMenu(false)
                                toggleMobileMenu(!showMobileMenu)
                            }}>
                                <img src={menu_icon} />
                            </a>
                        </>
                    ) : null}
                    <a className="user-icon" onClick={() => {
                        toggleMobileMenu(false)
                        toggleAuthMenu(!showAutheMenu)
                    }}><img src={user_icon} /></a>
                </div>
            </nav>
            {showAutheMenu ?
                <ProfileMenu show={showAutheMenu} toggle={toggleAuthMenu} /> : null}
            {windowWidth <= 768 ?
                <MobileMenu show={showMobileMenu} toggle={toggleMobileMenu} sites={sites} />
                : null}
        </>
    )
}

export default NavBar