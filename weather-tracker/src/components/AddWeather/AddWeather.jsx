import { useEffect } from "react";

const AddWeather = (props) => {

    const {weather, windDirectionConverter} = props;

    const addNewWeather = () => { // only posts weather into local DB once weather has a value
        fetch("http://192.168.56.1:3020/weather/newweather",{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
                console.log(err)
        })
    };

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
        windDirection: windDirectionConverter(weather.wind.deg),
        windSpeed: weather.wind.speed
    };

    useEffect(addNewWeather, [weather.id]);
}

export default AddWeather;