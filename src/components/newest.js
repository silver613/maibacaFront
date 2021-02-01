import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

// axios.defaults.baseURL = 'https://localhost:8000';


// const request = axios.create({
//     baseURL: 'https://localhost:8000',
// });


function Newest() {
    
    
    const [title, setTitle] = useState(
        'Anak Muda Yang Luar Biasa'
    );
    const [coverImg, setCoverImg] = useState(
      "img/banner-1.png"  
    );
    const [category, setCategory] = useState(
        "Category_1"  
    );
    const [date, setDate] = useState(
        "JANUARY 17, 2021"  
    );
    const [content, setContent] = useState(
        "Anak muda yang luar biasa.. ” Tak ada duit nk mkn burger time pkp ni, jangan malu jangan segan mari kedai saya Burger Boy. Makan la sampai kenyang. Anda adalah saham akhirat saya.. Sy ikhlas…"  
    );
    const [selfurl, setSelfUrl] = useState(
        "#"  
    );

    useEffect(async()=>{
        await axios.get("https://localhost:8000/api/test").then((res)=>{
            console.log(res);
            // console.log(res.data.content);
            // setTitle(res.data.title);
            // setCoverImg("http://localhost:8000/uploads/comma.jpg");
            // console.log(coverImg);
        })
    },[])
    
    return (
        <div className="container">
            <br/>
            <div className="row">
                <h1 className="coffee">Newest Article</h1>
            </div>
            <div className="row">
                <img src={coverImg} className="newest-cover"/>
            </div>
            <div className="row">
                <Link to = {selfurl}><h4 className="pt-3 coffee">{title}</h4></Link>
                <h5 className="pt-3 coffee ml-auto">{category}</h5>
                <p className="pt-3 ml-2">{date}</p>
            </div>
            <div className="row">
                <p className="newest-content">{content}</p>
            </div>
            <div className="row">
                <button className="btn bg-coffee milk my-hover">Read More</button>
            </div>
        </div>
    );
}
export default Newest;