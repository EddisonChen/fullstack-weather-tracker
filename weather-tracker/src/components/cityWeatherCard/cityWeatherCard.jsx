import "./CityWeatherCard.scss";

const CityWeatherCard = (props) => {

    const {cityName,
        countryName,
        feelsLike,
        humidity,
        temp,
        maxTemp,
        minTemp,
        rain,
        mainWeather,
        wind,
        weather} = props;

    return (
        <div>
            <p>{cityName}</p>
            {/* <p>{countryName}</p>
            <p>{feelsLike}</p>
            <p>{humidity}</p>
            <p>{temp}</p>
            <p>{maxTemp}</p>
            <p>{minTemp}</p>
            <p>{rain}</p>
            <p>{mainWeather}</p>
            <p>{wind}</p> */}
        </div>
    )
}

export default CityWeatherCard;