import React, { useState, useEffect } from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Listitem from "./listitem";
import Sidebar from "./sidebar";
import Loading from "./loading";
import axios from "axios";
import ReactPaginate from "react-paginate";

function Hot() {
    const [page, setPage] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const [totalNum, setTotalNum] = useState(0);
    const [btn, setBtn] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(async () => {
        await getPage(page);
    }, []);
    const getPage = async (page) => {
        setLoading(true);
        await axios.post("/api/hot").then((res) => {
            setBlogs(res.data);
        });
        setLoading(false);
    };


    //main return
    return (
        <div className="container">
            <Loading loading={loading} />
            <div className="row">
                <div className="col-sm-8">
                    <br/>
                    <br/>
                    {blogs.map((blog, index) => {
                        let cat_name = blog.cat_name.charAt(0).toUpperCase() + blog.cat_name.slice(1); // to uppercase
                        const d = new Date(blog.created_at);
                        const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
                        const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
                        const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

                        return [
                            
                            <Listitem id={blog.id} img={"http://localhost:8000/uploads/" + blog.cover_img} category={cat_name} date={`${mo}-${da}-${ye}`} vote={blog.votes} title={blog.title} content={blog.content} />,
                            <div className="line bg-coffee"></div>
                        ];
                    })}
                </div>

                <div className="col-sm-4">
                    <Sidebar isDetail={true} />
                </div>
            </div>
        </div>
    );
}

export default Hot;
