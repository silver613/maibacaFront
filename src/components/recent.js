import { React, useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
axios.defaults.baseURL = 'http://localhost:8000';


function Recent () {
    const [lists, setLists] = useState([]);
    useEffect(async()=> {
        await axios.get("/api/get_recent").then((res)=> {
            setLists(res.data);
        })

    },[])

    return (
        <div>
            <h4 className="side-title">Recent Posts</h4>
            <div className="line bg-coffee side-line"></div>
            {
                lists.map((list, index)=>{
                    let url = "/detail/" + list.id;
                    return [
                        <Link to ={url}><p className="recent-title">{list.title}</p></Link>
                    ]
                })
            }
        </div>
    )
}

export default Recent;