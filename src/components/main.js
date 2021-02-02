import React, { useState, useEffect } from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Listitem from "./listitem";
import Newest from "./newest";
import Sidebar from "./sidebar";
import axios from "axios";
import ReactPaginate from 'react-paginate';

axios.defaults.baseURL = 'http://localhost:8000';
function Main() {
    const [page, setPage] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const [totalNum, setTotalNum] = useState(0);
    const [btn, setBtn] = useState([]);

    useEffect(async()=>{
        await
        getPage(page);
    }, []);
    const getPage= async(page)=>{
        await axios.post("/api/page",
        {
            page: page
        }
        ).then((res)=>{
            setBlogs(res.data[0])
            setTotalNum(res.data[1])
            pagenation(res.data[1])
        })
    }

    const pageget = (p)=>{
        console.log(p, "page get")
    }
    const pagenation= (t)=>{
        var data = []
        for(var i=0; i< (Math.ceil(t/10)); i++){
            data.push(i)
        }
        setBtn(data)
        console.log(data)
    }
    const handlePageClick = (data)=>{
        getPage(data.selected)
    }

    const search = async(pageNum, keyWord)=>{
        setPage(pageNum)
        await axios.post("/api/search",
        {
            page: pageNum,
            keyword: keyWord
        }
        ).then((res)=>{
            setBlogs(res.data[0])
            setTotalNum(res.data[1])
            pagenation(res.data[1])
        })
    }
    //main return
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                    <Newest />
                    {
                        blogs.map((blog, index)=>{
                            let cat_name = blog.cat_name.charAt(0).toUpperCase() + blog.cat_name.slice(1); // to uppercase
                            const d = new Date(blog.created_at)
                            const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
                            const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
                            const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

                            return [
                                <div className="line bg-coffee"></div>,
                                <Listitem 
                                    id       = {blog.id}
                                    img      = {"http://localhost:8000/uploads/"+blog.cover_img}
                                    category = {cat_name}
                                    date     = {`${mo}-${da}-${ye}`}
                                    vote     = {blog.votes}
                                    title    = {blog.title}
                                    content  = {blog.content}
                                />
                            ]
                        })
                    }
                    <div>
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={Math.ceil(totalNum/10)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={(c)=>handlePageClick(c)}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>
                
                <div className="col-sm-4">
                    <Sidebar 
                        seachFunc = {search}
                    />
                </div>
            </div>
        </div>
    )
}
export default Main;