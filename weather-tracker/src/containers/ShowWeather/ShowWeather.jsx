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
    const [windGust, setWindGust] = useState(weather.wind.gust)

    const unitConverter = () => {
        if (unitType == true) { // fahrenheit
            setMainTemp(((weather.main.temp - 273.15)*9/5+32).toFixed() + "°F");
            setFeelsLikeTemp(((weather.main.feels_like - 273.15)*9/5+32).toFixed() + "°F");
            setHighTemp(((weather.main.temp_max - 273.15)*9/5+32).toFixed() + "°F");
            setLowTemp(((weather.main.temp_min - 273.15)*9/5+32).toFixed() + "°F");
            setVisibility((weather.visibility)*3.281 + " feet")
            setWindSpeed(((weather.wind.speed)*2.237).toFixed() + "MPH")
            setWindGust(((weather.wind.gust)*2.237).toFixed() + "MPH")
        } else if (unitType == false) { // celsius
            setMainTemp((weather.main.temp - 273.15).toFixed() + "°C");
            setFeelsLikeTemp((weather.main.feels_like - 273.15).toFixed() + "°C");
            setHighTemp((weather.main.temp_max - 273.15).toFixed() + "°C");
            setLowTemp((weather.main.temp_min - 273.15).toFixed() + "°C");
            setVisibility((weather.visibility) + " meters")
            setWindSpeed((weather.wind.speed).toFixed() + "m/s")
            setWindGust(((weather.wind.gust)).toFixed() + "m/s")
        }
    }

    useEffect(unitConverter)

    const windDIrectionConverter = () => {
        if (weather.wind.deg > 337.5 || weather.wind.deg < 22.5) {
            setWindDirection("North")
        } else if (weather.wind.deg > 22.5 && weather.wind.deg < 67.5) {
            setWindDirection("Northeast")
        } else if (weather.wind.deg > 67.5 && weather.wind.deg < 112.5) {
            setWindDirection("East") 
        } else if (weather.wind.deg > 112.5 && weather.wind.deg < 157.5) {
            setWindDirection("Southeast") 
        } else if (weather.wind.deg > 157.5 && weather.wind.deg < 202.5) {
            setWindDirection("South") 
        } else if (weather.wind.deg > 202.5 && weather.wind.deg < 247.5) {
            setWindDirection("Southwest") 
        } else if (weather.wind.deg > 247.5 && weather.wind.deg < 292.5) {
            setWindDirection("West") 
        } else if (weather.wind.deg > 292.5 && weather.wind.deg < 337.5) {
            setWindDirection("Northwest") 
        }
    }

    useEffect(windDIrectionConverter)

        return (
            <div>
                <UnitToggle setUnitType={setUnitType} unitType={unitType} unitConverter={unitConverter}/>
                <div>
                    <h1>{weather.name}, {weather.sys.country}</h1>
                    <h3>{weather.weather[0].main}, {weather.weather[0].description}</h3>
                    <p>{mainTemp}, feels like {feelsLikeTemp}</p>
                    <p>Temperature Range: {highTemp} - {lowTemp}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Visibility: {visibility}</p>
                    <p>Wind: Direction: {windDirection} Speed: {windSpeed} Gusts: {windGust || "No gusts!"}</p>
                </div>
            </div>
        )

}

export default ShowWeather;