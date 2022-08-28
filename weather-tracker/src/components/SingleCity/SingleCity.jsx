import "./SingleCity.scss";

const SingleCity = (props) => {

    const {name, state, country, id, setCityId, getWeather} = props;

    const handleCityCardClick = () => {
        setCityId(id)
        console.log(id)
        getWeather()
    }

    return (
        <div onClick={handleCityCardClick}>
            <p>{name}</p>
            <p>{state}</p>
            <p>{country}</p>
            <p>{id}</p>
        </div>
    )
}

export default SingleCity;