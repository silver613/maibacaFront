import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

let b_url = "http://localhost:8000/uploads/";

function Newest() {
    const [title, setTitle] = useState("Anak Muda Yang Luar Biasa");
    const [coverImg, setCoverImg] = useState("");
    const [category, setCategory] = useState("Category_1");
    const [date, setDate] = useState("JANUARY 17, 2021");
    const [content, setContent] = useState("Anak muda yang luar biasa.. ” Tak ada duit nk mkn burger time pkp ni, jangan malu jangan segan mari kedai saya Burger Boy. Makan la sampai kenyang. Anda adalah saham akhirat saya.. Sy ikhlas…");
    const [selfurl, setSelfUrl] = useState(undefined);
    const [cid, setCid] = useState();

    useEffect(async () => {
        await axios.get("/api/latest").then((res) => {
            setTitle(res.data.title);
            if(res.data.cover_img) {setCoverImg(b_url + res.data.cover_img);}
            axios.post("api/get_cat_name", { id: res.data.category }).then((result) => {
                let cat_name = result.data.charAt(0).toUpperCase() + result.data.slice(1);
                setCategory(cat_name);
            });
            const d = new Date(res.data.created_at);
            const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
            const mo = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
            const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
            setDate(mo + " " + da + ", " + ye);
            setContent(res.data.content);
            setSelfUrl("/detail/" + res.data.id);
        });
    }, []);

    return (
        <div className="container">
            <br />
            <div className="row">
                <h1 className="coffee">Newest Article</h1>
            </div>
            <div className="row">
                {coverImg==""?<img src="/img/banner-1.png" className="newest-cover" />:<img src={coverImg} className="newest-cover" />}
            </div>
            <div className="row">
                <Link to={selfurl}>
                    <h4 className="pt-3 coffee newest-title">{title}</h4>
                </Link>
                <h5 className="pt-3 coffee ml-auto">{category}</h5>
                <p className="pt-3 ml-2">{date}</p>
            </div>
            <div className="row box-1" dangerouslySetInnerHTML={{ __html: content }}></div>
            {/* <div className="row">
                <button className="btn bg-coffee milk my-hover">Read More</button>
            </div> */}
            
        </div>
    );
}
export default Newest;
