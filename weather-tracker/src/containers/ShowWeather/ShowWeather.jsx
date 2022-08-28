import "./ShowWeather.scss";
import cityWeatherCard from "../../components/cityWeatherCard/cityWeatherCard";

const ShowWeather = (props) => {

    const {weather} = props;

        return (
            <cityWeatherCard
                cityName={weather.name}
                countryName={weather.sys.country}
                feelsLike={weather.main.feels_like}
                humidity={weather.main.humidity}
                temp={weather.main.temp}
                maxTemp={weather.main.temp_max}
                minTemp={weather.main.temp_min}
                rain={weather.weather[0].description}
                mainWeather={weather.weather[0].main}
                wind={weather.wind.speed}
                 />
        )

}

export default ShowWeather;