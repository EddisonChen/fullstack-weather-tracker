import {useState, useEffect} from 'react';

const HistoricWeather = (props) => {

    const {previousData, kelvinToCelsius, kelvinToFahrenheit, msToMPH, metersToFeet, unitType} = props;

    const [previousWeatherDataObject, setPreviousWeatherDataObject] = useState({
        tempMain: previousData.tempMain,
        tempFeelsLike: previousData.tempFeelsLike,
        tempHigh: previousData.tempHigh,
        tempLow: previousData.tempLow,
        visibility: previousData.visibility,
        windSpeed: previousData.windSpeed,
        windDirection: previousData.windDirection,
        windGustSpeed: previousData.windGustSpeed,
        nameCity: previousData.nameCity,
        nameCountry: previousData.nameCountry,
        weatherMain: previousData.weatherMain,
        weatherDescription: previousData.weatherDescription,
        createdAt: previousData.createdAt
    });

    const unitConverter = () => {
        if (unitType == true) {
            setPreviousWeatherDataObject({
                ...previousWeatherDataObject,
                tempMain: kelvinToFahrenheit(previousData.tempMain),
                tempFeelsLike: kelvinToFahrenheit(previousData.tempFeelsLike),
                tempHigh: kelvinToFahrenheit(previousData.tempHigh),
                tempLow: kelvinToFahrenheit(previousData.tempLow),
                visibility: metersToFeet(previousData.visibility),
                windSpeed: msToMPH(previousData.windSpeed),
                windGustSpeed: msToMPH(previousData.windGust)
            })
        } else {
            setPreviousWeatherDataObject({
                ...previousWeatherDataObject,
                tempMain: kelvinToCelsius(previousData.tempMain),
                tempFeelsLike: kelvinToCelsius(previousData.tempFeelsLike),
                tempHigh: kelvinToCelsius(previousData.tempHigh),
                tempLow: kelvinToCelsius(previousData.tempLow),
                visibility: previousData.visibility + " meters",
                windSpeed: previousData.windSpeed + "m/s",
                windGust: previousData.windGust + "m/s"
            })
        }
    }

    useEffect(unitConverter, [unitType, previousData])

    const windDirectionConverter = () => {
        if (previousData.windDirection > 337.5 || previousData.windDirection < 22.5) {
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            windDirection: "North"
          });
        } else if (previousData.windDirection > 22.5 && previousData.windDirection < 67.5) {
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            windDirection: "Northeast"
          });
        } else if (previousData.windDirection > 67.5 && previousData.windDirection < 112.5) {
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            windDirection: "East"
          });
        } else if (previousData.windDirection > 112.5 && previousData.windDirection < 157.5) {
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            windDirection: "Southeast"
          });
        } else if (previousData.windDirection > 157.5 && previousData.windDirection < 202.5) {
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            windDirection: "South"
          });
        } else if (previousData.windDirection > 202.5 && previousData.windDirection < 247.5) {
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            windDirection: "Southwest"
          });
        } else if (previousData.windDirection > 247.5 && previousData.windDirection < 292.5) {
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            windDirection: "West"
          });
        } else if (previousData.windDirection > 292.5 && previousData.windDirection < 337.5) {
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            windDirection: "Northwest"
          });
        } else {
          setPreviousWeatherDataObject({
            ...previousWeatherDataObject,
            windDirection: null
          });
        }
      };

    useEffect(windDirectionConverter, [previousData]);

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