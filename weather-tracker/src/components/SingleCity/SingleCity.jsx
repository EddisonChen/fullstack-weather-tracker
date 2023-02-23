import "./SingleCity.scss";

const SingleCity = (props) => {

    const {name, state, country, id, setCityId, getWeather, setCityName} = props;

    const handleCityCardClick = () => {
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