import React, { Component } from "react";
import "../styles/default-styles.css";
import "../styles/App.css";
import WeatherCard from "./WeatherCard";
import ConvertTemp from "./ConvertTemp";
import { apiKey } from "../private";

class App extends Component {
  state = {
    weather: {},
    forecasts: {},
    isLoaded: false,
    error: null,
    tempUnit: "F"
  };

  componentDidMount() {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=London&mode=json&APPID=${apiKey}`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            weather: result,
            forecasts: result.list,
            isLoaded: true
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  convertTempF = temp => {
    const f = (temp - 273.15) * 1.8 + 32;
    return Math.round(f);
  };

  convertTempC = temp => {
    const c = temp - 273.15;
    return Math.round(c);
  };

  farhenheitUnits = () => {
    const unit = this.state.tempUnit === "F" ? "F" : "F";
    this.setState({ tempUnit: unit });
  };

  celciusUnits = () => {
    const unit = this.state.tempUnit === "C" ? "C" : "C";
    this.setState({ tempUnit: unit });
  };

  render() {
    return (
      <div className="App">
        <h1 className="title">5-Day Forecast</h1>
        <section className="weather-cards">
          {Object.keys(this.state.forecasts).map(key => (
            <WeatherCard
              key={key}
              id={key}
              forecasts={this.state.forecasts[key]}
              convertTempF={this.convertTempF}
              convertTempC={this.convertTempC}
              className="weather-card"
              tempUnit={this.state.tempUnit}
            />
          ))}
        </section>
        <ConvertTemp
          farhenheitUnits={this.farhenheitUnits}
          celciusUnits={this.celciusUnits}
        />
      </div>
    );
  }
}

export default App;
