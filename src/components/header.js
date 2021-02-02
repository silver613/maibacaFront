import React from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'

function Header() {
    return (
        <header id="header">
            <div className="container d-flex align-items-center">
                {/* <h1 className="logo mr-auto"><a href="index.html">Bikin</a></h1> */}
                <div className="logo mr-auto">
                    <img src="img/logo.png"/>
                </div>
                <div className = "mMenu">
                    <Menu
                        isOpen={ true }
                        className="mMenu"
                    >
                        <a id="home" className="menu-item" href="/">Home</a>
                        <a id="about" className="menu-item" href="/about">About</a>
                        <a id="contact" className="menu-item" href="/contact">Contact</a>
                        <a className="menu-item--small" href="">Settings</a>
                    </Menu>
                </div>
                <nav className="nav-menu d-none d-lg-block">
                    <ul>
                        <li><Link to = "/category_1">Category_1</Link></li>
                        <li><Link to = "/category_2">Category_2</Link></li>
                        <li><Link to = "/category_3">Category_3</Link></li>
                        <li><Link to = "/category_4">Category_4</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
export default Header;