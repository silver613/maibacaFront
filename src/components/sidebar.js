import React, {useState} from 'react';

function Sidebar(props) {
    const [keyWord, setKeyWord] = useState("");
    const keyHandle=(e)=>{
        if(e.key == "Enter"){
            props.seachFunc(0, keyWord)
        }
    }
    return(
        <div>
            <div className="search-box mt-5">
                <button className="search-btn btn">Search</button>
                <input className="search-form" onChange={(e)=>{setKeyWord(e.target.value)}} onKeyDown={(e)=>keyHandle(e)}></input>
            </div>
        </div>
    )
}

export default Sidebar;