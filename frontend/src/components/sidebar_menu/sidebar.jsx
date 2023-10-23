import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import './sidebar.css'

const SideBar = ({ sites }) => {
    //Dependencias
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    //Determina si se puede mostrar correctamente en la pantalla
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

    const handleSiteClick = (site) => {
        navigate(sites[site]);
    };

    if (windowWidth > 768 && isAuthenticated) {
        return (
            <aside className='sidebar'>
                <ul>
                    {Object.entries(sites).map(([site]) => (
                        <a key={site} onClick={() => handleSiteClick(site)}>
                            <li>{site}</li>
                        </a>
                    ))}
                </ul>
            </aside>
        )
    }
}

export default SideBar