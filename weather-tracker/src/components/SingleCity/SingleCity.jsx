import "./SingleCity.scss";

const SingleCity = (props) => {

    const {name, state, country, id, setCityId, getWeather, setCityName} = props;

    const handleCityCardClick = () => { //runs getWeather, clears cityName, and sets cityId upon clicking a city
        getWeather();
        setCityName("");
        setCityId(id);
    };

    return (
        <div onClick={handleCityCardClick}>
            <p className="cities">{name}, {state}, {country}</p>
        </div>
    )
}

export default SingleCity;