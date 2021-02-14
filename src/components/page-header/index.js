/**
 * Component to render the application header
 * Provisions links to switch between bootstrap and material grids
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

export default function PageHeader() {
    const [activeGridStyle, setActiveGridStyle] = useState('bootstrap');

    /**
     * Handles the event when the style link (bootstrap grid or material ui grid) is clicked
     * Sets the active style selected to the state variable
     * @param {*} style : Style selected by the user
     */
    const handleGridStyleLikeClick = (style) => {
        setActiveGridStyle(style);
    }

    return (
        <nav className='navbar navbar-dark bg-dark fixed-top'>
            <div className="container-fluid">
                <span className='navbar-brand mb-0 h1'>GitHub Public Repositories</span>
                <span className='styling-selection'>
                    <Link to={'/bootstrap-grid'} title='Switch to Bootstrap Design' onClick={() => handleGridStyleLikeClick('bootstrap')}>
                        <span className={`styling-link ${activeGridStyle === 'bootstrap' ? 'active-grid-link' : ''}`}>Bootstrap Grid</span>
                    </Link>
                    <Link to={'/material-grid'} title='Switch to Material Design' onClick={() => handleGridStyleLikeClick('material')}>
                        <span className={`styling-link ${activeGridStyle === 'material' ? 'active-grid-link' : ''}`}>Material UI Grid</span>
                    </Link>
                </span>
            </div>
        </nav>
    )
}