import React from "react";
import "../styles/ConvertTemp.css";
class ConvertTempButton extends React.Component {
  render() {
    const { farhenheitUnits, celciusUnits, units, isLoaded } = this.props;
    const fUnits = units === "F" ? "f active" : "f";
    const cUnits = units === "C" ? "c active" : "c";

    return (
      <div>
        {isLoaded && (
          <div className="convert">
            <button onClick={farhenheitUnits} className={fUnits}>
              &deg;F
            </button>
            <button onClick={celciusUnits} className={cUnits}>
              &deg;C
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default ConvertTempButton;
