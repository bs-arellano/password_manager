import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileMenu from "./mobile_menu"
import AuthMenu from "./auth_menu";

import './navbar.css'
import page_icon from '../../assets/page_icon.svg'
import user_icon from '../../assets/user_icon.svg'
import menu_icon from '../../assets/menu_icon.svg'

const NavBar = ({ sites }) => {
    const navigate = useNavigate();

    const [showMobileMenu, toggleMobileMenu] = useState(false)
    const [showAutheMenu, toggleAuthMenu] = useState(false)
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
                    {windowWidth <= 768 ? (
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
                <AuthMenu show={showAutheMenu} toggle={toggleAuthMenu} /> : null}
            {windowWidth <= 768 ?
                <MobileMenu show={showMobileMenu} toggle={toggleMobileMenu} sites={sites} />
                : null}
        </>
    )
}

export default NavBar