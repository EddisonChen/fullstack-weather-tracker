import {useEffect, useState} from 'react';
import UnitToggle from '../UnitToggle/UnitToggle';

const WeatherDisplayFunctions = (props) => {

    const {weather, unitType, setUnitType, previousData, weatherObject, setWeatherObject} = props;

    const unitConverter = () => {
        if (unitType === true) { // fahrenheit
            setWeatherObject({
                ...weatherObject,
                "mainTemp": ((weather.main.temp - 273.15)*9/5+32).toFixed() + "°F",
                "feelsLikeTemp": ((weather.main.feels_like - 273.15)*9/5+32).toFixed() + "°F",
                "highTemp": ((weather.main.temp_max - 273.15)*9/5+32).toFixed() + "°F",
                "lowTemp": ((weather.main.temp_min - 273.15)*9/5+32).toFixed() + "°F",
                "visibility": (weather.visibility)*3.281 + " feet",
                "windSpeed": ((weather.wind.speed)*2.237).toFixed() + "MPH",
                "windGust": ((weather.wind.gust)*2.237).toFixed() + "MPH"
            })
        } else if (unitType === false) { // celsius
            setWeatherObject({
                ...weatherObject,
                "mainTemp": (weather.main.temp - 273.15).toFixed() + "°C",
                "feelsLikeTemp": (weather.main.feels_like - 273.15).toFixed() + "°C",
                "highTemp": (weather.main.temp_max - 273.15).toFixed() + "°C",
                "lowTemp": (weather.main.temp_min - 273.15).toFixed() + "°C",
                "visibility": (weather.visibility) + " meters",
                "windSpeed": (weather.wind.speed).toFixed() + "m/s",
                "windGust": weather.wind.gust + "m/s"
            })
        }
    }

    useEffect(unitConverter, [unitType])

    const windDirectionConverter = () => {
        switch (weather.wind.deg) {
            case weather.wind.deg > 337.5 || weather.wind.deg < 22.5:
                setWeatherObject({
                    ...weatherObject,
                    "windDirection": "North",
                })
                break;
            case weather.wind.deg > 22.5 && weather.wind.deg < 67.5:
                setWeatherObject({
                    ...weatherObject,
                    "windDirection": "Northeast",
                })
                break;
            case weather.wind.deg > 67.5 && weather.wind.deg < 112.5:
                setWeatherObject({
                    ...weatherObject,
                    "windDirection": "East",
                })
                break;
            case weather.wind.deg > 112.5 && weather.wind.deg < 157.5:
                setWeatherObject({
                    ...weatherObject,
                    "windDirection": "Southeast",
                })
                break;
            case weather.wind.deg > 157.5 && weather.wind.deg < 202.5:
                setWeatherObject({
                    ...weatherObject,
                    "windDirection": "South",
                })
                break;
            case weather.wind.deg > 202.5 && weather.wind.deg < 247.5:
                setWeatherObject({
                    ...weatherObject,
                    "windDirection": "Southwest",
                })
                break;
            case weather.wind.deg > 247.5 && weather.wind.deg < 292.5:
                setWeatherObject({
                    ...weatherObject,
                    "windDirection": "West",
                })
                break;
            case weather.wind.deg > 292.5 && weather.wind.deg < 337.5:
                setWeatherObject({
                    ...weatherObject,
                    "windDirection": "Northwest",
                })
                break;
            default:
                setWeatherObject({
                    ...weatherObject,
                    "windDirection": weatherObject["windDirection"],
                })
        }
    }

    useEffect(windDirectionConverter)

    const addNewWeather = () => {
        fetch("http://192.168.56.1:3020/weather/newweather",{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        }) .then((res) => {
            console.log(res)
        }) .catch((err) => {
                console.log(err)
        })
    }

    const jsonData = {
            cityId: weather.id,
            nameCity: weather.name,
            nameCountry: weather.sys.country,
            weatherMain: weather.weather[0].main,
            weatherDescription: weather.weather[0].description,
            tempMain: weather.main.temp,
            tempHigh: weather.main.temp_max,
            tempLow: weather.main.temp_min,
            tempFeelsLike: weather.main.feels_like,
            humidity: weather.main.humidity,
            visibility: weather.visibility,
            windDirection: weather.wind.deg,
            windSpeed: weather.wind.speed,
            windGustSpeed: weather.wind.gust
        }

    useEffect(addNewWeather, [jsonData])

    return (
        <div className="toggle_card">
                    <div className="toggle">
                        <UnitToggle 
                            setUnitType={setUnitType} unitType={unitType} unitConverter={unitConverter}/>
                    </div>
                    <div className="cards">
                        <h2>{weather.name}, {weather.sys.country}</h2>
                        <h3>{weather.weather[0].main}, {weather.weather[0].description}</h3>
                        <p>{weatherObject["mainTemp"]}, feels like {weatherObject["feelsLikeTemp"]} | Range: {weatherObject["highTemp"]} - {weatherObject["lowTemp"]}</p>
                        <p>Humidity: {weather.main.humidity}%</p>
                        <p>Visibility: {weatherObject["visibility"]}</p>
                        <p>Wind: Direction: {weatherObject["windDirection"]} | Speed: {weatherObject["windSpeed"]}</p>
                        {weather.wind.gust && <p>Wind Gusts: {weatherObject["windGust"]}</p>}
                    </div>
                </div>
    )
}

export default WeatherDisplayFunctions;