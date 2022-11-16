import "./SingleCity.scss";
import { useEffect } from "react";

const SingleCity = (props) => {

    const {name, state, country, id, setCityId, getWeather, addNewCityWeather, setCityName} = props;

    const handleCityCardClick = () => {
        getWeather()
        setCityName("")
        setCityId(id)
    }

    return (
        <div onClick={handleCityCardClick}>
            <p className="cities">{name}, {state}, {country}</p>
        </div>
    )
}

export default SingleCity;