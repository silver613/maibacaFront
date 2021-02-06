import React, {useState} from 'react';
import Archieve from './archieve';
import Recent from './recent';

function Sidebar(props) {
    const [keyWord, setKeyWord] = useState("");
    const keyHandle=(e)=>{
        if(e.key == "Enter"){
            props.seachFunc(0, keyWord)
        }
        if(!keyWord){
            props.blackKey("")
        }
    }
    return(
        <div>
            <div className={props.isDetail?"hide":"search-box mt-5"}>
                <label className="search-label" htmlFor="search-box">
                    Search</label>
                <input className="search-form" id="search-box" onChange={(e)=>{setKeyWord(e.target.value)}} onKeyDown={(e)=>keyHandle(e)}></input>    
            </div>
            <Recent />
            <h4 className="side-title">HUBUNGI KAMI</h4>
            <div className="line bg-coffee side-line"></div>
            <p>Facebook<a href="#" className="fb-link">Layan Video</a></p>
            <p>Sewa Untuk Iklan Boleh Contact admin</p>

            <h4 className="side-title">MENGENAI KAMI</h4>
            <div className="line bg-coffee side-line"></div>
            <p className="t-c">
                Artikel di dalam blog ini hanyalah perkongsian dari pelbagai website dan blog yang bertujuan untuk berkongsi maklumat dengan masyarakat umum. Sekiranya perkongsian artikel yang dipaparkan disalah-ertikan, kami tidak akan bertanggungjawab. JIKA ANDA SUKAKAN SALAH SATU ARTIKEL, JANGAN LUPA SHARE! Terima Kasih – Admin maibaca.co
            </p>
            <h4 className="side-title">ARCHIEVE</h4>
            <div className="line bg-coffee side-line"></div>
            <Archieve />
        </div>
    )
}

export default Sidebar;