import { useNavigate } from "react-router-dom";

import './mobile_menu.css'

const MobileMenu = ({ show, toggle, sites }) => {
    const navigate = useNavigate()
    const handleSiteClick = (site) => {
        toggle(false)
        navigate(sites[site]);
    };
    if (show) {
        return (
            <div className="mobile-menu">
                <ul>
                    {Object.entries(sites).map(([site]) => (
                        <a key={site} onClick={() => handleSiteClick(site)}>
                            <li>{site}</li>
                        </a>
                    ))}
                </ul>
            </div>
        )
    }
}

export default MobileMenu