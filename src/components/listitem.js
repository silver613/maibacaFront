import React, { useState } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Listitem() {
    const [imgUrl, setImgUrl] = useState(
        'img/blog-1.jpg'
    );
    const [category, setCategory] = useState(
        'ARTIST'
    );
    const [date, setDate] = useState(
        'JANUARY 17, 2021'
    );
    const [vote, setVote] = useState(
        '201'
    );
    const [title, setTitle] = useState(
        '“Tenangnya tengok…” – Video Dikongsi Neelofa Raih 1 Juta Views Dan 3 Ribu Komen'
    );
    const [content, setContent] = useState(
        'Rasanya selebriti dan usahawan terkenal, Noor Neelofa Mohd Noor atau lebih mesra dengan panggilan Neelofa ini tidak as1ng buat orang ramai'
    );
    return (
        <div className="list-box">
            <img className="item-cover" src={imgUrl} />
            <div className="container">
                <div className="row">
                    <p className="item-category ml-2 mr-auto">{category}</p>
                    <p className="item-date mr-4">{date}</p>
                    <i className="fa fa-heart itme-vote m-1"></i>
                    <p className="item-voteNum">{vote}</p>
                </div>
                <p className="item-title">{title}</p>
                <p className="item-content">{content}</p>
            </div>
        </div>
    )
}
export default Listitem;