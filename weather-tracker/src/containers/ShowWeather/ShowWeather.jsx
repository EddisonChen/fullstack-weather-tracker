import "./ShowWeather.scss";
import { useState, useEffect } from "react";
import UnitToggle from "../../components/UnitToggle/UnitToggle";

const ShowWeather = (props) => {

    const {weather} = props;

    const [unitType, setUnitType] = useState(false)
    
    const [mainTemp, setMainTemp] = useState(weather.main.temp);
    const [feelsLikeTemp, setFeelsLikeTemp] = useState(weather.main.feels_like);
    const [highTemp, setHighTemp] = useState(weather.main.temp_max);
    const [lowTemp, setLowTemp] = useState(weather.main.temp_min);
    const [visibility, setVisibility] = useState(weather.visibility);
    const [windSpeed, setWindSpeed] = useState(weather.wind.speed)
    const [windDirection, setWindDirection] = useState(weather.wind.deg)

    const unitConverter = () => {
        if (unitType == true) { // fahrenheit
            setMainTemp(((weather.main.temp - 273.15)*9/5+32).toFixed() + "°F");
            setFeelsLikeTemp(((weather.main.feels_like - 273.15)*9/5+32).toFixed() + "°F");
            setHighTemp(((weather.main.temp_max - 273.15)*9/5+32).toFixed() + "°F");
            setLowTemp(((weather.main.temp_min - 273.15)*9/5+32).toFixed() + "°F");
            setVisibility((weather.visibility)*3.281 + " Feet")
            setWindSpeed((weather.wind.speed)*2.237 + "MPH")
        } else if (unitType == false) { // celsius
            setMainTemp((weather.main.temp - 273.15).toFixed() + "°C");
            setFeelsLikeTemp((weather.main.feels_like - 273.15).toFixed() + "°C");
            setHighTemp((weather.main.temp_max - 273.15).toFixed() + "°C");
            setLowTemp((weather.main.temp_min - 273.15).toFixed() + "°C");
            setVisibility((weather.visibility) + "M")
            setWindSpeed((weather.wind.speed) + "m/s")
        }
    }

    useEffect(unitConverter)

    const windDIrectionConverter = () => {
        if (weather.wind.deg > 337.5 || weather.wind.deg < 22.5) {
            setWindDirection("N")
        } else if (weather.wind.deg > 22.5 && weather.wind.deg < 67.5) {
            setWindDirection("NE")
        } else if (weather.wind.deg > 67.5 && weather.wind.deg < 112.5) {
            setWindDirection("E") 
        } else if (weather.wind.deg > 112.5 && weather.wind.deg < 157.5) {
            setWindDirection("SE") 
        } else if (weather.wind.deg > 157.5 && weather.wind.deg < 202.5) {
            setWindDirection("S") 
        } else if (weather.wind.deg > 202.5 && weather.wind.deg < 247.5) {
            setWindDirection("SW") 
        } else if (weather.wind.deg > 247.5 && weather.wind.deg < 292.5) {
            setWindDirection("W") 
        } else if (weather.wind.deg > 292.5 && weather.wind.deg < 337.5) {
            setWindDirection("NW") 
        }
    }

    useEffect(windDIrectionConverter)

        return (
            <div>
                <UnitToggle setUnitType={setUnitType} unitType={unitType} unitConverter={unitConverter}/>
                <div>
                    <h1>{weather.name}</h1>
                    <h2>{weather.sys.country}</h2>
                    <h3>{weather.weather[0].main}, {weather.weather[0].description}</h3>
                    <p>{mainTemp}, feels like {feelsLikeTemp}</p>
                    <p>Temperature Range: {highTemp} - {lowTemp}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Visibility: {visibility}</p>
                    <p>Wind: Direction: {windDirection} Speed: {windSpeed}</p>
                </div>
            </div>
        )

}

export default ShowWeather;