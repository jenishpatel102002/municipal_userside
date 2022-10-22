import NaviBar from "./NavBar"
import React from "react"
import "../index.css"
import videoBg from "../img/12.mp4"
import Footer from "./Footer"

export const Home=()=>{
    return(
        <div>
        <div className='main'>
            <NaviBar/>
        <div className="overlay"></div>
        <video src={videoBg} autoPlay loop muted />
        <div className="content">
            <h1 className="fontSize1">Welcome</h1>
            <p className="fontSize2">Our Bilimora Municipal</p>
        </div>
    </div>
    <Footer/>
    </div>
    )
}