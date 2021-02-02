import { React, useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./sidebar";

axios.defaults.baseURL = "http://localhost:8000";

function Detail(props) {
    const imgBase = "http://localhost:8000/uploads/";

    const [title, setTitle] = useState();
    const [coverUrl, setCoverUrl] = useState();
    const [author, setAuthor] = useState();
    const [date, setDate] = useState();
    const [content, setContent] = useState();

    useEffect(async () => {
        await getContent(props.match.params.id);
    }, []);

    const getContent = (id) => {
        axios
            .post("/api/get_article", {
                id: id,
            })
            .then((res) => {
                console.log(res.data[0].content);
                setTitle(res.data[0].title);
                setCoverUrl(imgBase + res.data[0].cover_img);
                setAuthor(res.data[0].name);
                setContent(res.data[0].content);

                const d = new Date(res.data[0].created_at);
                const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
                const mo = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
                const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
                setDate(mo + " " + da + ", " + ye);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <h2 className="detail-title">{title}</h2>
                    <img src={coverUrl} alt="coverImage" className="detail-cover-img" />
                    <div className="box-3">
                        <p className="detail-author">Posted By: {author}</p>
                        <p className="detail-date">{date}</p>
                    </div>
                    <div className="detail-content" dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
                <div className="col-md-4">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}

export default Detail;
