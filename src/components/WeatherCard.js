import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/WeatherCard.css";

class WeatherCard extends Component {
  render() {
    const { day, high, low, icon, isLoaded, tempUnit } = this.props;

    const tempHigh = tempUnit === "F" ? high.fahrenheit : high.celsius;
    const tempLow = tempUnit === "F" ? low.fahrenheit : low.celsius;

    return (
      <div>
        {isLoaded && (
          <div className="weather-card">
            <Link to={`/forecast/${day}`}>
              <p className="weather-card__day">{day}</p>
              <img
                src={icon}
                alt="weather icon"
                className="weather-card__icon"
              />
              <section className="weather-card__temp">
                <p className="weather-card__temp-high">${tempHigh}&deg;</p>
                <p className="weather-card__temp-low">${tempLow}&deg;</p>
              </section>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default WeatherCard;
