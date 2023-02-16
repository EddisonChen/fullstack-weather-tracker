import {useEffect, useState} from 'react';
import UnitToggle from '../UnitToggle/UnitToggle';

const WeatherDisplayFunctions = (props) => {

    const {weather, 
        unitType, 
        setUnitType, 
        weatherObject, 
        setWeatherObject,
        previousData} = props;
    
        const [previousWeatherDataObject, setPreviousWeatherDataObject] = useState({
            "tempMain": null,
            "tempFeelsLike": null,
            "tempHigh": null,
            "tempLow": null,
            "visibility": null,
            "windSpeed": null,
            "windDirection": null,
            "windGustSpeed": null,
            "nameCity": null,
            "nameCountry": null,
            "weatherMain": null,
            "weatherDescription": null,
            "createdAt": null
        });

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
                "tempMain": kelvinToFahrenheit(weather.main.temp),
                "tempFeelsLike": kelvinToFahrenheit(weather.main.feels_like),
                "tempHigh": kelvinToFahrenheit(weather.main.temp_max),
                "tempLow": kelvinToFahrenheit(weather.main.temp_min),
                "visibility": metersToFeet(weather.visibility),
                "windSpeed": msToMPH(weather.wind.speed),
                "windGustSpeed": msToMPH(weather.wind.gust)
            });
            setPreviousWeatherDataObject({
                ...previousWeatherDataObject,
                "tempMain": kelvinToFahrenheit(previousData["tempMain"]),
                "tempFeelsLike": kelvinToFahrenheit(previousData["tempFeelsLike"]),
                "tempHigh": kelvinToFahrenheit(previousData["tempHigh"]),
                "tempLow": kelvinToFahrenheit(previousData["tempLow"]),
                "visibility": metersToFeet(previousData["visibility"]),
                "windSpeed": msToMPH(previousData["windSpeed"]),
                "windGustSpeed": msToMPH(previousData["windGust"])
            })
        } else if (unitType === false) { // celsius
            setWeatherObject({
                ...weatherObject,
                "tempMain": kelvinToCelsius(weather.main.temp),
                "tempFeelsLike": kelvinToCelsius(weather.main.feels_like),
                "tempHigh": kelvinToCelsius(weather.main.temp_max),
                "tempLow": kelvinToCelsius(weather.main.temp_min),
                "visibility": (weather.visibility) + " meters",
                "windSpeed": (weather.wind.speed).toFixed() + "m/s",
                "windGust": weather.wind.gust + "m/s"
            });
            setPreviousWeatherDataObject({
                ...previousWeatherDataObject,
                "tempMain": kelvinToCelsius(previousData["tempMain"]),
                "tempFeelsLike": kelvinToCelsius(previousData["tempFeelsLike"]),
                "tempHigh": kelvinToCelsius(previousData["tempHigh"]),
                "tempLow": kelvinToCelsius(previousData["tempLow"]),
                "visibility": previousData["visibility"] + " meters",
                "windSpeed": previousData["windSpeed"] + "m/s",
                "windGust": previousData["windGust"] + "m/s"
            })
        }
    };

    useEffect(unitConverter, [unitType, previousData]);

    const windDirectionConverter = () => {
        if (weather.wind.deg > 337.5 || weather.wind.deg < 22.5) {
          setWeatherObject({
            ...weatherObject,
            "windDirection": "North",
          });
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            "windDirection": "North"
          });
        } else if (weather.wind.deg > 22.5 && weather.wind.deg < 67.5) {
          setWeatherObject({
            ...weatherObject,
            "windDirection": "Northeast",
          });
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            "windDirection": "Northeast"
          });
        } else if (weather.wind.deg > 67.5 && weather.wind.deg < 112.5) {
          setWeatherObject({
            ...weatherObject,
            "windDirection": "East",
          });
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            "windDirection": "East"
          });
        } else if (weather.wind.deg > 112.5 && weather.wind.deg < 157.5) {
          setWeatherObject({
            ...weatherObject,
            "windDirection": "Southeast",
          });
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            "windDirection": "Southeast"
          });
        } else if (weather.wind.deg > 157.5 && weather.wind.deg < 202.5) {
          setWeatherObject({
            ...weatherObject,
            "windDirection": "South",
          });
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            "windDirection": "South"
          });
        } else if (weather.wind.deg > 202.5 && weather.wind.deg < 247.5) {
          setWeatherObject({
            ...weatherObject,
            "windDirection": "Southwest",
          });
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            "windDirection": "Southwest"
          });
        } else if (weather.wind.deg > 247.5 && weather.wind.deg < 292.5) {
          setWeatherObject({
            ...weatherObject,
            "windDirection": "West",
          });
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            "windDirection": "West"
          });
        } else if (weather.wind.deg > 292.5 && weather.wind.deg < 337.5) {
          setWeatherObject({
            ...weatherObject,
            "windDirection": "Northwest",
          });
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            "windDirection": "Northwest"
          });
        } else {
          setWeatherObject({
            ...weatherObject,
            "windDirection": weatherObject["windDirection"],
          });
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            "windDirection": null
          });
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
                <p>{weatherObject["tempMain"]}, feels like {weatherObject["tempFeelsLike"]} | Range: {weatherObject["tempHigh"]} - {weatherObject["tempLow"]}</p>
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Visibility: {weatherObject["visibility"]}</p>
                <p>Wind: Direction: {weatherObject["windDirection"]} | Speed: {weatherObject["windSpeed"]}</p>
                {weather.wind.gust && <p>Wind Gusts: {weatherObject["windGust"]}</p>}
            </div>
            {previousData && <div className="cards">
                <h2>Previous result from {previousData["createdAt"]}</h2>
                <h2>{previousData["nameCity"]}, {previousData["nameCountry"]}</h2>
                <h3>{previousData["weatherMain"]}, {previousData["weatherDescription"]}</h3>
                <p>{previousWeatherDataObject["tempMain"]}, feels like {previousWeatherDataObject["tempFeelsLike"]} | Range: {previousWeatherDataObject["tempHigh"]} - {previousWeatherDataObject["tempLow"]}</p>
                <p>Humidity: {previousData["humidity"]}%</p>
                <p>Visibility: {previousWeatherDataObject["visibility"]}</p>
                <p>Wind Direction: {previousWeatherDataObject["windDirection"]} | Wind Speed: {previousWeatherDataObject["windSpeed"]}</p>
            </div>}
        </div>
    )
}

export default WeatherDisplayFunctions;