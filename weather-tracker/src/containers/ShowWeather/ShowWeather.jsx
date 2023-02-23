import "./ShowWeather.scss";
import { useState, useEffect} from "react";
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather"

const ShowWeather = (props) => {

    const {weather} = props;

    const [unitType, setUnitType] = useState(false);
    const [previousData, setPreviousData] = useState();

    const windDirectionConverter = (windDegree) => { // converts degrees to directions to post into local DB and to display on screen
        if (windDegree > 337.5 || windDegree < 22.5) {
          return "North";
        } else if (windDegree > 22.5 && windDegree < 67.5) {
            return "Northeast";
        } else if (windDegree > 67.5 && windDegree < 112.5) {
            return "East";
        } else if (windDegree > 112.5 && windDegree < 157.5) {
            return "Southeast";
        } else if (windDegree > 157.5 && windDegree < 202.5) {
          return "South";
        } else if (windDegree > 202.5 && windDegree < 247.5) {
            return "Southwest";
        } else if (windDegree > 247.5 && windDegree < 292.5) {
            return "West";
        } else if (windDegree > 292.5 && windDegree < 337.5) {
            return "Northwest";
        } 
    };

    const [weatherObject, setWeatherObject] = useState({
        tempMain: weather.main.temp,
        tempFeelsLike: weather.main.feels_like,
        tempHigh: weather.main.temp_max,
        tempLow: weather.main.temp_min,
        visibility: weather.visibility,
        windSpeed: weather.wind.speed,
        windDirection: windDirectionConverter(weather.wind.deg)
    });
    
    const getPreviousResults = () => { // only fetches weather from local DB once weather has a value
        fetch(`http://192.168.56.1:3020/weather/${weather.id}`)
        .then((response) => {
            return response.json();
        }).then((historicWeatherData) => {
            setPreviousData(historicWeatherData)
        }).catch(() => {
            setPreviousData()
        })
    };
    
    useEffect(getPreviousResults, [weather.id]);

    const addNewWeather = () => { // only posts weather into local DB once weather has a value
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

        return (
            <div className="both_cards">
                <CurrentWeather
                    weather = {weather}
                    unitType = {unitType}
                    setUnitType = {setUnitType}
                    weatherObject = {weatherObject}
                    setWeatherObject = {setWeatherObject}
                    previousData = {previousData}
                />
            </div>
        )

};

export default ShowWeather;