import "./ShowWeather.scss";
import { useState, useEffect} from "react";
import WeatherDisplayFunctions from "../../components/WeatherDisplayFunctions/WeatherDisplayFunctions"

const ShowWeather = (props) => {

    const {weather} = props;

    const [unitType, setUnitType] = useState(false)
    const [weatherObject, setWeatherObject] = useState({
        "mainTemp": weather.main.temp,
        "feelsLikeTemp": weather.main.feels_like,
        "highTemp": weather.main.temp_max,
        "lowTemp": weather.main.temp_min,
        "visibility": weather.visibility,
        "windSpeed": weather.wind.speed,
        "windDirection": weather.wind.deg,
        "windGust": weather.wind.gust
    })

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

    useEffect(addNewWeather, [weather])

        return (
            <div className="both_cards">
                <WeatherDisplayFunctions
                    weather = {weather}
                    unitType = {unitType}
                    setUnitType = {setUnitType}
                    weatherObject = {weatherObject}
                    setWeatherObject = {setWeatherObject}
                    />
            </div>
        )

}

export default ShowWeather;