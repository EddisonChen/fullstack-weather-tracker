import "./CityCard.scss";
import SingleCity from "../SingleCity/SingleCity.jsx";

const CityCard = (props) => {

    const {filteredCities, setCityId, getWeather, setCityName} = props;

    const mappedFilteredCities = filteredCities.map((filteredCity) => { //maps out the cities that pass the filter
        return (
            <SingleCity 
                name={filteredCity.name.slice(0, 30)}
                state={filteredCity.state}
                country={filteredCity.country}
                id={filteredCity.id}
                setCityId={setCityId}
                getWeather={getWeather}
                setCityName={setCityName}
                />
        )
    })

    return (
        <div>
            {mappedFilteredCities}
        </div>
    )
}

export default CityCard;