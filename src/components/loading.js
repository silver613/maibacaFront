import React, { useState, useEffect } from "react";
import FadeLoader from "react-spinners/FadeLoader";

function Loading(props) {
    const [page, setPage] = useState(0);
    const loading = props.loading;
    return (
       <div>
            {
                loading?<div className="loading-screen">
                        <FadeLoader color="#996633"></FadeLoader>
                        </div>:null
            }
       </div>
        
    )
}
export default Loading;