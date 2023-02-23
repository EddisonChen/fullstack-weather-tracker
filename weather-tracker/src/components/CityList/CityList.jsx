import SingleCity from "../SingleCity/SingleCity.jsx";

const CityList = (props) => {

    const {filteredCities, setCityId, getWeather, setCityName} = props;

    const mappedFilteredCities = filteredCities.map((filteredCity) => {
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
    });

    return (
        <ul>
            {mappedFilteredCities}
        </ul>
    )
}

export default CityList;