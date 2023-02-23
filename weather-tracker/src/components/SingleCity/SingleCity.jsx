const SingleCity = (props) => {

    const {name, state, country, id, setCityId, getWeather, setCityName} = props;

    const handleCityCardClick = () => {
        getWeather();
        setCityName("");
        setCityId(id);
    };

    return (
        <li onClick={handleCityCardClick}>
            <p className="cities">{name}, {state}, {country}</p>
        </li>
    )
}

export default SingleCity;