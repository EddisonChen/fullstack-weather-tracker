import "./SingleCity.scss";
import { useEffect } from "react";

const SingleCity = (props) => {

    const {name, state, country, id, setCityId, getWeather, addNewCityWeather} = props;

    const handleCityCardClick = () => {
        getWeather()
    }
    const handleCityCardMouseEnter = () => {
        setCityId(id)
    }
    const handleCityCardMouseLeave = () => {
        setCityId()
    }

    return (
        <div onMouseEnter={handleCityCardMouseEnter} 
            onMouseLeave={handleCityCardMouseLeave} 
            onClick={handleCityCardClick}>
            <p>{name}, {state}, {country}</p>
        </div>
    )
}

export default SingleCity;