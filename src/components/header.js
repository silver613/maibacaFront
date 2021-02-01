import React from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Header() {
    return (
        <header id="header">
            <div className="container d-flex align-items-center">
                {/* <h1 className="logo mr-auto"><a href="index.html">Bikin</a></h1> */}
                <div className="logo mr-auto">
                    <img src="img/logo.png"/>
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