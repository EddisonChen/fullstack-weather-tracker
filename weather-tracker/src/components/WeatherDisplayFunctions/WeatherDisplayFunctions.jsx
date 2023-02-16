import {useEffect, useState} from 'react';
import UnitToggle from '../UnitToggle/UnitToggle';

const WeatherDisplayFunctions = (props) => {

    const {weather, 
        unitType, 
        setUnitType, 
        weatherObject, 
        setWeatherObject} = props;
    
    const [previousWeatherDataObject, setPreviousWeatherDataObject] = useState(null);
    
    const getPreviousResults = () => { // fetches historic weather data from API and local database
        fetch(`http://192.168.56.1:3020/weather/${weather.id}`)
        .then((response) => {
            return response.json();
        }).then((previousWeatherData) => {
            setPreviousWeatherDataObject({
                "mainTemp": previousWeatherData["tempMain"],
                "feelsLikeTemp": previousWeatherData["tempFeelsLike"],
                "highTemp": previousWeatherData["tempHigh"],
                "lowTemp": previousWeatherData["tempLow"],
                "visibility": previousWeatherData["visibility"],
                "windSpeed": previousWeatherData["windSpeed"],
                "windDirection": previousWeatherData["windDirection"],
                "windGust": previousWeatherData["windGustSpeed"]
            });
            console.log(previousWeatherData)
        });
        };
    
    useEffect(getPreviousResults, [weather]);

    const kelvinToFahrenheit = (temp) => {
        return ((temp - 273.15)*9/5+32).toFixed() + "°F"
    }
    const kelvinToCelsius = (temp) => {
        return (temp - 273.15).toFixed() + "°C"
    }
    const metersToFeet = (distance) => {
        return distance * 3.281 + " feet"
    }
    const msToMPH = (speed) => {
        return (speed * 2.237).toFixed() + " MPH"
    };

    const unitConverter = () => {
        if (unitType === true) { // fahrenheit
            setWeatherObject({
                ...weatherObject,
                "mainTemp": kelvinToFahrenheit(weather.main.temp),
                "feelsLikeTemp": kelvinToFahrenheit(weather.main.feels_like),
                "highTemp": kelvinToFahrenheit(weather.main.temp_max),
                "lowTemp": kelvinToFahrenheit(weather.main.temp_min),
                "visibility": metersToFeet(weather.visibility),
                "windSpeed": msToMPH(weather.wind.speed),
                "windGust": msToMPH(weather.wind.gust)
            });
        } else if (unitType === false) { // celsius
            setWeatherObject({
                ...weatherObject,
                "mainTemp": kelvinToCelsius(weather.main.temp),
                "feelsLikeTemp": kelvinToCelsius(weather.main.feels_like),
                "highTemp": kelvinToCelsius(weather.main.temp_max),
                "lowTemp": kelvinToCelsius(weather.main.temp_min),
                "visibility": (weather.visibility) + " meters",
                "windSpeed": (weather.wind.speed).toFixed() + "m/s",
                "windGust": weather.wind.gust + "m/s"
            });
        }
    };

    useEffect(unitConverter, [unitType]);

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
    };

    useEffect(windDirectionConverter, [weather]);

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
                    {/* {previousData !== null ? <div className="cards">
                        <h2>Previous result from {previousData.createdAt.slice(0,10)}</h2>
                        <h2>{previousData.nameCity}, {previousData.nameCountry}</h2>
                        <h3>{previousData.weatherMain}, {previousData.weatherDescription}</h3>
                        <p>{mainTemp}, feels like {feelsLikeTemp} | Range: {highTemp} - {lowTemp}</p>
                        <p>Humidity: {previousData.humidity}%</p>
                        <p>Visibility: {visibility}</p>
                        <p>Wind Direction: {windDirection} | Wind Speed: {windSpeed}</p>
                        {previousData.windGustSpeed && <p>Wind Gusts: {windGust}</p>}
                    </div> : ''} */}
                </div>
    )
}

export default WeatherDisplayFunctions;