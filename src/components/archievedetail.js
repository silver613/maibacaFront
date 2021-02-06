import axios from 'axios';
import {React, useEffect, useState} from 'react';
import Listitem from './listitem';
import Sidebar from "./sidebar";
import Loading from "./loading";
import ReactPaginate from 'react-paginate';

const ArchieveDetail = (props) => {
    const year = props.match.params.year;
    const month = props.match.params.month;
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(0);
    const [totalNum, setTotalNum] = useState(0);
    const [btn, setBtn] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);

    const getPage= async(page)=>{
        setLoading(true)
        await axios.post("/api/page",
        {
            page: page
        }
        ).then((res)=>{
            setBlogs(res.data[0])
            setTotalNum(res.data[1])
            pagenation(res.data[1])
        })
        setLoading(false)
    }

    const pagenation= (t)=>{
        var data = []
        for(var i=0; i< (Math.ceil(t/10)); i++){
            data.push(i)
        }
        setBtn(data)
    }
    const handlePageClick = (data)=>{
        if(keyword){
            search(page, keyword)
        } else {
            getPage(data.selected)
        }
    }

    const search = async(pageNum, keyWord)=>{
        setPage(pageNum)
        setKeyword(keyWord)
        if(!keyWord){
            getPage(page)
            return false
        }
        setLoading(true)
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
        setLoading(false)
    }

    const getArchieveList = async() => {
        await axios.post("/api/archievelist",{
            year  : year,
            month : month
        }).then((res)=>{
            setBlogs(res.data);
        })
    }
    useEffect(()=>{
        getArchieveList();
        setLoading(false);
    },[year, month])

    return(
        <div className="container">
            <Loading
                loading={loading}
            />
            <div className="row">
                
                <div className="col-sm-8">
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
                            previousLabel={'<'}
                            nextLabel={'>'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            previousLinkClassName={'prev-btn'}
                            nextLinkClassName={'next-btn'}
                            pageLinkClassName={'page-btn'}
                            activeLinkClassName={'active-btn'}
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
                        blackKey = {setKeyword}
                    />
                </div>
            </div>
        </div>
    )

}

export default ArchieveDetail;