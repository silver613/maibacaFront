import { React, useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./sidebar";
import { FacebookShareButton } from "react-share";
import Loading from "./loading";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8000";

function Detail(props) {
    const imgBase = "http://localhost:8000/uploads/";
    const ids = props.match.params.id;
    const [title, setTitle] = useState();
    const [coverUrl, setCoverUrl] = useState();
    const [author, setAuthor] = useState();
    const [date, setDate] = useState();
    const [vote, setVote] = useState();
    const [read, setRead] = useState();
    const [content, setContent] = useState();
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [id, setId] = useState();
    const [prev, setPrev] = useState();
    const [next, setNext] = useState();

    useEffect(async () => {
        await getContent(ids);
        visited(ids);
        getPrev(ids);
        getNext(ids);
        
    }, [ids]);

    const getPrev = (id) => {
        axios.post("/api/previous",{
            id: id
        }).then((res)=>{
            setPrev(res.data);
        })
    }
    const getNext = (id) => {
        axios.post("/api/next",{
            id: id
        }).then((res)=>{
            setNext(res.data);
        })
    }
    const getContent = async (id) => {
        setLoading(true);
        await axios
            .post("/api/get_article", {
                id: id,
            })
            .then((res) => {
                setId(res.data[0].id);
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

    const visited = (id) => {
        axios.post("/api/read", {
            id : id
        })
    }

    const like = (e) => {
        e.preventDefault(); 
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(regexEmail)){ 
            alert("Please provide a correct Email.");
        } else {
            axios.post("/api/vote",{
                email : email,
                id    : id
            }).then((res)=>{
                console.log(res)
                if(res.data) {
                    setVote(parseInt(vote)+1);
                } else {
                    
                }
            })
        }
    }

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
                        <a className="like-this" data-toggle="modal" data-target="#myModal"><i className="fa fa-thumbs-o-up detail-read ml-4"></i> I like this.</a>
                        	
                    </div>
                    <img src={coverUrl} alt="coverImage" className={coverUrl=="http://localhost:8000/uploads/"?"hide":"detail-cover-img"} />

                    <div className="box-3">
                        <p className="detail-author">Posted By: {author}</p>
                        <p className="detail-date">{date}</p>
                    </div>
                    <div className="detail-content" dangerouslySetInnerHTML={{ __html: content }}></div>
                    <div className={"row"}>
                        <Link to ={"/detail/"+prev}><button className="btn bg-coffee milk my-hover prev-next">Previous</button></Link>
                        <Link to ={"/detail/"+next}><button className="btn bg-coffee milk my-hover prev-next">Next</button></Link>
                    </div>
                </div>
                <div className="col-md-4">
                    <Sidebar 
                        isDetail={true}
                    />
                </div>
                <div className="modal fade" id="myModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Please Provide your email Address.</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">

                            <form>
                                <input type="email" className="form-control" onChange={(e)=> setEmail(e.target.value)} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"/>
                                <input type="submit" className="btn btn-success mt-2 sub-btn" value="OK" onClick={(e) => like(e)} />
                            </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default Detail;
