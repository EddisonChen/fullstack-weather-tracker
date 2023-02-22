import {useState, useEffect} from 'react';

const HistoricWeather = (props) => {

    const {previousData,
        kelvinToCelsius, 
        kelvinToFahrenheit, 
        msToMPH, 
        metersToFeet, 
        unitType, 
        weather} = props;

    const [previousWeatherDataObject, setPreviousWeatherDataObject] = useState({
        tempMain: previousData.tempMain,
        tempFeelsLike: previousData.tempFeelsLike,
        tempHigh: previousData.tempHigh,
        tempLow: previousData.tempLow,
        visibility: previousData.visibility,
        windSpeed: previousData.windSpeed,
        windDirection: previousData.windDirection,
        nameCity: previousData.nameCity,
        nameCountry: previousData.nameCountry,
        weatherMain: previousData.weatherMain,
        weatherDescription: previousData.weatherDescription,
        createdAt: previousData.createdAt
    });

    const historicUnitConverter = () => {
        if (unitType === true) {
            setPreviousWeatherDataObject({
                ...previousWeatherDataObject,
                tempMain: kelvinToFahrenheit(previousData.tempMain),
                tempFeelsLike: kelvinToFahrenheit(previousData.tempFeelsLike),
                tempHigh: kelvinToFahrenheit(previousData.tempHigh),
                tempLow: kelvinToFahrenheit(previousData.tempLow),
                visibility: metersToFeet(previousData.visibility),
                windSpeed: msToMPH(previousData.windSpeed)
            })
        } else {
            setPreviousWeatherDataObject({
                ...previousWeatherDataObject,
                tempMain: kelvinToCelsius(previousData.tempMain),
                tempFeelsLike: kelvinToCelsius(previousData.tempFeelsLike),
                tempHigh: kelvinToCelsius(previousData.tempHigh),
                tempLow: kelvinToCelsius(previousData.tempLow),
                visibility: previousData.visibility + " meters",
                windSpeed: (previousData.windSpeed).toFixed() + "m/s"
            })
        }
    };

    useEffect(historicUnitConverter, [unitType, weather]);

    return (
        <div className="cards">
            <h2>Previous result from {previousData.createdAt.slice(0, 10)}</h2>
            <h2>{previousData.nameCity}, {previousData.nameCountry}</h2>
            <h3>{previousData.weatherMain}, {previousData.weatherDescription}</h3>
            <p>{previousWeatherDataObject.tempMain}, feels like {previousWeatherDataObject.tempFeelsLike} | Range: {previousWeatherDataObject.tempHigh} - {previousWeatherDataObject.tempLow}</p>
            <p>Humidity: {previousData.humidity}%</p>
            <p>Visibility: {previousWeatherDataObject.visibility}</p>
            <p>Wind Direction: {previousWeatherDataObject.windDirection} | Wind Speed: {previousWeatherDataObject.windSpeed}</p>
        </div>
    )
}

export default HistoricWeather;