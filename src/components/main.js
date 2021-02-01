import React from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Listitem from "./listitem";
import Newest from "./newest";
import Sidebar from "./sidebar";

function Main() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                    <Newest />
                    <div className="line bg-coffee"></div>
                    <Listitem />
                    <div className="line bg-coffee"></div>
                    <Listitem />
                    <div className="line bg-coffee"></div>
                    <Listitem />
                    <div className="line bg-coffee"></div>
                    <Listitem />
                    <div className="line bg-coffee"></div>
                    <Listitem />
                    <div className="line bg-coffee"></div>
                    <Listitem />
                    <div className="line bg-coffee"></div>
                    <Listitem />
                    <div className="line bg-coffee"></div>
                    <Listitem />
                    <div className="line bg-coffee"></div>
                </div>
                    
                <div className="col-sm-4">
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}
export default Main;