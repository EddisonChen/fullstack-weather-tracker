import "./cityWeatherCard.scss";

const cityWeatherCard = (props) => {

    const {cityName,
        countryName,
        feelsLike,
        humidity,
        temp,
        maxTemp,
        minTemp,
        rain,
        mainWeather,
        wind} = props;

    return (
        <div>
            <p>{cityName}</p>
            <p>{feelsLike}</p>
            <p>{humidity}</p>
            <p>{temp}</p>
            <p>{maxTemp}</p>
            <p>{minTemp}</p>
            <p>{rain}</p>
            <p>{mainWeather}</p>
            <p>{wind}</p>
        </div>
    )
}

export default cityWeatherCard;