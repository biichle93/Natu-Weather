import React from "react";

const Weather = (props)=>{
    return(
        <div className="container">
            <div className="cards">
                <h1>{props.city},{props.country}</h1>
                <h5 className="py-2">
                    <i className="wi wi-day-sunny display-1"></i>
                </h5>
                <h1 className="py-1">{props.temp}&deg;</h1>
                {minMaxTemp(12, 45)}
                <h4 className="py-1">Sunny</h4>
            </div>
        </div>
    )
}

function minMaxTemp(min, max){
    return(
        <h3>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
        </h3>
    )
}

export default Weather;