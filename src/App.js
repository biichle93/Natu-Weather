import React from "react";
import  "./App.css";
import Weather from "./app_component/weather.component";
import "bootstrap/dist/css/bootstrap.min.css";
import 'weather-icons/css/weather-icons.css';

const API_key = "9901355e3cbcaddcb47be49d46ad038e";


//api calls api.openweathermap.org/data/2.5/weather?q=London,uk&appid={APIKEY}
class App extends React.Component {
    constructor(){
      super()
      this.state = {
        city: undefined,
        country: undefined,
        temp: undefined,
        maxtemp: undefined,
        mintemp: undefined,
        general: undefined,

      };
      this.getWeather()
    }

    getWeather = async() =>{
      const APIcall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`);
      const response = await APIcall.json();
      console.log(response);
      const kelvinToFahrenheit = require('kelvin-to-fahrenheit');
      this.setState({
        city: response.name, 
        country: response.sys.country, 
        temp: kelvinToFahrenheit(response.main.temp).toFixed(1),
        mintemp: kelvinToFahrenheit(response.main.temp_min).toFixed(1),
        maxtemp: kelvinToFahrenheit(response.main.temp_max).toFixed(1),
        general: response.weather[0].description,
      })
    };

    render() {
    return (
      <div className="App">
      <Weather 
      city ={this.state.city}
      country={this.state.country}
      temp ={this.state.temp} 
      mintemp ={this.state.mintemp}
      maxtemp ={this.state.maxtemp} 
      general = {this.state.general}
      />
      </div>
    );
  }
}

export default App;