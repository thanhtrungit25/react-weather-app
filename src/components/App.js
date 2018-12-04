import React, { Component } from "react";
import "../styles/default-styles.css";
import "../styles/App.css";
import WeatherCard from "./WeatherCard";
import ConvertTempButton from "./ConvertTempButton";
import { apiKey } from "../private";

class App extends Component {
  state = {
    forecast: {},
    current: {},
    location: {},
    isLoaded: false,
    error: null,
    tempUnit: "F"
  };

  componentDidMount() {
    this.getWeather();
  }

  getWeather = () => {
    fetch(
      `http://api.wunderground.com/api/${apiKey}/forecast/geolookup/conditions/q/IN/Bremen.json`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            forecast: result.forecast,
            current: result.current_observation,
            location: result.location,
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
    const { forecast, isLoaded } = this.state;
    console.log("forecast", forecast);
    const forecasts = forecast.simpleforecast;

    return (
      <div className="App">
        <h1 className="title">4-Day Forecast</h1>
        <h3 className="location">{this.state.location.city}</h3>
        {!isLoaded && <h3 className="loading">Loading...</h3>}
        {isLoaded && (
          <div className="weather-cards">
            {forecasts.forecastday.map(data => (
              <section key={data.period}>
                <WeatherCard
                  className="weather-card"
                  tempUnit={this.state.tempUnit}
                  isLoaded={this.state.isLoaded}
                  icon={data.icon_url}
                  high={data.high}
                  low={data.low}
                  day={data.date.weekday_short}
                />
              </section>
            ))}
          </div>
        )}

        <ConvertTempButton
          farhenheitUnits={this.farhenheitUnits}
          celciusUnits={this.celciusUnits}
          units={this.state.tempUnit}
          isLoaded={this.state.isLoaded}
        />
      </div>
    );
  }
}

export default App;
