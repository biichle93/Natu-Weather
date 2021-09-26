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

      this.icon = {
        Thunderstorm: "wi-thunderstorm",
        Drizzle: "wi-sleet",
        Rain: "wi-storm-showers",
        Snow: "wi-snow",
        Atmosphere: "wi-fog",
        Clear: "wi-day-sunny",
        Clouds: "wi-day-fog",
      }
    }

    get_Icon(icons, weatherId){
      switch(true){
        case weatherId >= 200 && weatherId <= 232:
          this.setState({icon: this.icon.Thunderstorm})
          break
        case weatherId >= 300 && weatherId <= 321:
          this.setState({icon: this.icon.Drizzle})
          break
        case weatherId >= 500 && weatherId <= 531:
          this.setState({icon: this.icon.Rain})
          break
        case weatherId >= 600 && weatherId <= 622:
          this.setState({icon: this.icon.Snow})
          break
        case weatherId >= 701 && weatherId <= 781:
          this.setState({icon: this.icon.Atmosphere})
          break
        case weatherId === 800:
          this.setState({icon: this.icon.Clear})
          break
        case weatherId >= 801 && weatherId <= 804:
          this.setState({icon: this.icon.Clouds})
          break
        default:this.setState({icon: this.icon.Clouds})

      }
    }

    getWeather = async() =>{
      const APIcall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Raleigh,NC,USA&appid=${API_key}`);
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
        icon: this.icon.Thunderstorm,
      })

      this.get_Icon(this.icon, response.weather[0].id);
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
      icon = {this.state.icon}
      />
      </div>
    );
  }
}

export default App;