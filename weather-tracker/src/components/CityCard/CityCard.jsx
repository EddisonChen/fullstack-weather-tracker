import "./CityCard.scss";
import SingleCity from "../SingleCity/SingleCity.jsx";

const CityCard = (props) => {

    const {filteredCities, setCityId, getWeather} = props;

    const mappedFilteredCities = filteredCities.map((filteredCity) => {
        return (
            <SingleCity name={filteredCity.name}
                        state={filteredCity.state}
                        country={filteredCity.country}
                        id={filteredCity.id}
                        setCityId={setCityId}
                        getWeather={getWeather}/>
        )
    })

    return (
        <div>
            {mappedFilteredCities}
        </div>
    )
}

export default CityCard;