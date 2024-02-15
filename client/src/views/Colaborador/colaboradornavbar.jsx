import React from 'react';
import { Link } from 'react-router-dom';

const ColaboradorNavbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/scan-qr">Scan QR Code</Link>
                </li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default ColaboradorNavbar;