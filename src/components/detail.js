import { React, useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./sidebar";
import { FacebookShareButton } from "react-share";
import Loading from "./loading";
axios.defaults.baseURL = "http://localhost:8000";

function Detail(props) {
    const imgBase = "http://localhost:8000/uploads/";

    const [title, setTitle] = useState();
    const [coverUrl, setCoverUrl] = useState();
    const [author, setAuthor] = useState();
    const [date, setDate] = useState();
    const [vote, setVote] = useState();
    const [read, setRead] = useState();
    const [content, setContent] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(async () => {
        await getContent(props.match.params.id);
    }, []);

    const getContent = async (id) => {
        setLoading(true);
        await axios
            .post("/api/get_article", {
                id: id,
            })
            .then((res) => {
                console.log(res.data[0].content);
                setTitle(res.data[0].title);
                setCoverUrl(imgBase + res.data[0].cover_img);
                setAuthor(res.data[0].name);
                setContent(res.data[0].content);
                setVote(res.data[0].votes);
                setRead(res.data[0].reads);

                const d = new Date(res.data[0].created_at);
                const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
                const mo = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
                const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
                setDate(mo + " " + da + ", " + ye);
            });
        setLoading(false);
    };


    return (
        <div className="container">
            <Loading loading={loading} />
            <div className="row">
                <div className="col-md-8">
                    <h2 className="detail-title">{title}</h2>
                    <div className="kit">
                        <FacebookShareButton url={"localhost/"}>FaceBook</FacebookShareButton>
                        <i className="fa fa-heart detail-vote ml-auto"></i>
                        <p className="detail-vote-num">{vote}</p>
                        <i className="fa fa-eye detail-read ml-2"></i>
                        <p className="detail-read-num ml-2">{read}</p>
                        <a className="like-this"><i className="fa fa-thumbs-o-up detail-read ml-4"></i> I like this.</a>
                        	
                    </div>
                    <img src={coverUrl} alt="coverImage" className="detail-cover-img" />

                    <div className="box-3">
                        <p className="detail-author">Posted By: {author}</p>
                        <p className="detail-date">{date}</p>
                    </div>
                    <div className="detail-content" dangerouslySetInnerHTML={{ __html: content }}></div>
                    <div className={"row"}>
                        <button className="btn bg-coffee milk my-hover">Previous</button>
                        <button className="btn bg-coffee milk my-hover">Next</button>
                    </div>
                </div>
                <div className="col-md-4">
                    <Sidebar 

                    />
                </div>
            </div>
        </div>
    );
}

export default Detail;
