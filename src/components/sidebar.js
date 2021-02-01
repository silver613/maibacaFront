import React, {useState} from 'react';

function Sidebar() {
    return(
        <div>
            <div className="search-box mt-5">
                <button className="search-btn btn">Search</button>
                <input className="search-form"></input>
            </div>
        </div>
    )
}

export default Sidebar;