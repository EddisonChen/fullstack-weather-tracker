import "./HistoricWeatherCard.scss";
import UnitToggle from "../UnitToggle/UnitToggle";
import {useState, useEffect} from "react";

const HistoricWeatherCard = (props) => {

    const {previousData} = props;

    const [unitType, setUnitType] = useState(false)

    const [mainTemp, setMainTemp] = useState(previousData.tempMain);
    const [feelsLikeTemp, setFeelsLikeTemp] = useState(previousData.tempFeelsLike);
    const [highTemp, setHighTemp] = useState(previousData.tempHigh);
    const [lowTemp, setLowTemp] = useState(previousData.tempLow);
    const [visibility, setVisibility] = useState(previousData.visibility);
    const [windSpeed, setWindSpeed] = useState(previousData.windSpeed);
    const [windDirection, setWindDirection] = useState(previousData.windDirection);
    const [windGust, setWindGust] = useState(previousData.windGustSpeed);

    const unitConverter = () => {
        if (unitType == true) { // fahrenheit
            setMainTemp(((previousData.tempMain - 273.15)*9/5+32).toFixed() + "°F");
            setFeelsLikeTemp(((previousData.tempFeelsLike - 273.15)*9/5+32).toFixed() + "°F");
            setHighTemp(((previousData.tempHigh - 273.15)*9/5+32).toFixed() + "°F");
            setLowTemp(((previousData.tempLow - 273.15)*9/5+32).toFixed() + "°F");
            setVisibility(((previousData.visibility)*3.281).toFixed() + " feet");
            setWindSpeed(((previousData.windSpeed)*2.237).toFixed() + "MPH");
            setWindGust(((previousData.windGustSpeed)*2.237).toFixed() + "MPH");
        } else if (unitType == false) { // celsius
            setMainTemp((previousData.tempMain - 273.15).toFixed() + "°C");
            setFeelsLikeTemp((previousData.tempFeelsLike - 273.15).toFixed() + "°C");
            setHighTemp((previousData.tempHigh - 273.15).toFixed() + "°C");
            setLowTemp((previousData.tempLow - 273.15).toFixed() + "°C");
            setVisibility((previousData.visibility).toFixed() + " meters");
            setWindSpeed((previousData.windSpeed).toFixed() + "m/s");
            setWindGust(previousData.windGustSpeed + "m/s");
        }
    }

    useEffect(unitConverter)

    const windDirectionConverter = () => {
        if (previousData.windDirection > 337.5 || previousData.windDirection < 22.5) {
            setWindDirection("North");
        } else if (previousData.windDirection > 22.5 && previousData.windDirection < 67.5) {
            setWindDirection("Northeast");
        } else if (previousData.windDirection > 67.5 && previousData.windDirection < 112.5) {
            setWindDirection("East");
        } else if (previousData.windDirection > 112.5 && previousData.windDirection < 157.5) {
            setWindDirection("Southeast");
        } else if (previousData.windDirection > 157.5 && previousData.windDirection < 202.5) {
            setWindDirection("South");
        } else if (previousData.windDirection > 202.5 && previousData.windDirection < 247.5) {
            setWindDirection("Southwest"); 
        } else if (previousData.windDirection > 247.5 && previousData.windDirection < 292.5) {
            setWindDirection("West"); 
        } else if (previousData.windDirection > 292.5 && previousData.windDirection < 337.5) {
            setWindDirection("Northwest"); 
        }
    }

    useEffect(windDirectionConverter)

    return (
        <div>
            <UnitToggle setUnitType={setUnitType} unitType={unitType} unitConverter={unitConverter} />
            <div>
                <h2>Previous Result</h2>
                <h2>From {previousData.createdAt.slice(0,10)}</h2>
                <p>{previousData.nameCity}, {previousData.nameCountry}</p>
                <p>{previousData.weatherMain}, {previousData.weatherDescription}</p>
                <p>Temperature: {mainTemp}, feels like {feelsLikeTemp}</p>
                <p>Temperature Range: {highTemp} - {lowTemp}</p>
                <p>Humidity: {previousData.humidity}%</p>
                <p>Visibility: {visibility}</p>
                <p>Wind Direction: {windDirection} Wind Speed: {windSpeed}</p>
                {previousData.windGustSpeed && <p>Wind Gusts: {windGust}</p>}
            </div>
        </div>
    )

}

export default HistoricWeatherCard;