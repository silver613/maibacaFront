import {React, useState, useEffect} from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Archieve = () => {
    
    const [lists, setLists] = useState([]);

    useEffect(async() => {
        await getList();
    }, []);

    const getList = () => {
        axios.post("/api/getarchieve").then((res)=>{
            setLists(res.data);
        })
    }

    return(
        <div>
            {
                lists.map((list, index)=>{
                    return [
                        <Link to={"/archieve/"+list.year+"/"+list.month}>
                            <p className="recent-title">{list.month+list.year}</p>
                        </Link>
                    ]
                })
            } 
        </div>
    )
}

export default Archieve;