import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../assets/sidebar.css';
import logo from '../assets/images/logo2.png'
import { useLocation } from 'react-router-dom/dist';

function Sidebar() {

    const location = useLocation();
    const [menuChoice, setMenuChoice] = useState("")

    useEffect(() => {
        if(location == "/"){
            setMenuChoice("Home")
        } else if (location == "/predict"){
            setMenuChoice("Predict")
        }
    }, [location]);

    return (
        <div className='sidebar'>
            <div className='sidebar_image_section'>
                <img className='logo' src={logo} />
            </div>
            <div className='sidebar_menu'>
                <ul className="menu-items">
                    <Link className='menu-link' to="/"><li className="menu-item" activeClassName="selected">
                        <span className='sidebar_option_text'>Home</span>
                    </li></Link>
                    <Link className='menu-link' to="/predict"><li className="menu-item">
                        <span className='sidebar_option_text'>Análise</span>
                    </li></Link>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;