import {useEffect} from 'react';
import UnitToggle from '../UnitToggle/UnitToggle';
import HistoricWeather from '../HistoricWeather/HistoricWeather'

const WeatherDisplayFunctions = (props) => {

    const {weather, 
        unitType, 
        setUnitType, 
        weatherObject, 
        setWeatherObject,
        previousData,
        setPreviousData} = props;

    const kelvinToFahrenheit = (temp) => {
        return ((temp - 273.15)*9/5+32).toFixed() + "°F"
    };
    const kelvinToCelsius = (temp) => {
        return (temp - 273.15).toFixed() + "°C"
    };
    const metersToFeet = (distance) => {
        return (distance * 3.281).toFixed() + " feet"
    };
    const msToMPH = (speed) => {
        return (speed * 2.237).toFixed() + " MPH"
    };

    const unitConverter = () => {
        if (unitType === true) { // imperial
            setWeatherObject({
                ...weatherObject,
                tempMain: kelvinToFahrenheit(weather.main.temp),
                tempFeelsLike: kelvinToFahrenheit(weather.main.feels_like),
                tempHigh: kelvinToFahrenheit(weather.main.temp_max),
                tempLow: kelvinToFahrenheit(weather.main.temp_min),
                visibility: metersToFeet(weather.visibility),
                windSpeed: msToMPH(weather.wind.speed)
            });
        } else { // metric
            setWeatherObject({
                ...weatherObject,
                tempMain: kelvinToCelsius(weather.main.temp),
                tempFeelsLike: kelvinToCelsius(weather.main.feels_like),
                tempHigh: kelvinToCelsius(weather.main.temp_max),
                tempLow: kelvinToCelsius(weather.main.temp_min),
                visibility: (weather.visibility) + " meters",
                windSpeed: (weather.wind.speed).toFixed() + "m/s"
            });
        }
    };

    useEffect(unitConverter, [unitType, weather]);

    return (
        <div className="toggle_card">
            <div className="toggle">
                <UnitToggle 
                    setUnitType={setUnitType} unitType={unitType}/>
            </div>
            <div className="cards">
                <h2>{weather.name}, {weather.sys.country}</h2>
                <h3>{weather.weather[0].main}, {weather.weather[0].description}</h3>
                <p>{weatherObject.tempMain}, feels like {weatherObject.tempFeelsLike} | Range: {weatherObject.tempHigh} - {weatherObject.tempLow}</p>
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Visibility: {weatherObject.visibility}</p>
                <p>Wind: Direction: {weatherObject.windDirection} | Wind Speed: {weatherObject.windSpeed}</p>
            </div>
            {previousData && <HistoricWeather
                previousData={previousData}
                kelvinToCelsius={kelvinToCelsius}
                kelvinToFahrenheit={kelvinToFahrenheit}
                msToMPH={msToMPH}
                metersToFeet={metersToFeet}
                unitType={unitType}
                setPreviousData={setPreviousData}
                weather = {weather}/>}
        </div>
    )
}

export default WeatherDisplayFunctions;