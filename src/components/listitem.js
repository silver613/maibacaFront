import React, { useState } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Listitem(props) {
    let url = "/detail/" + props.id;
    return (
        <div className="list-box">
            <div className="row">
                <div className="col-md-4">
                    {props.img=="http://localhost:8000/uploads/"?<img className="item-cover" src="/img/banner-1.png" />:<img className="item-cover" src={props.img} />}
                </div>
                <div className="col-md-8">
                    <div className="container">
                        <div className="row">
                            <p className="item-category ml-2 mr-auto">{props.category}</p>
                            <p className="item-date mr-4">{props.date}</p>
                            <i className="fa fa-heart item-vote m-1"></i>
                            <p className="item-voteNum">{props.vote}</p>
                        </div>
                        <Link to={url}>
                            <p className="item-title">{props.title}</p>
                        </Link>

                        <div className="item-content" dangerouslySetInnerHTML={{ __html: props.content }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Listitem;
