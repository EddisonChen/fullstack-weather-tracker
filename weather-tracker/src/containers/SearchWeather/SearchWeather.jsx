import "./SearchWeather.scss";
import {useState} from "react";
import cityIdDatas from "../../cityIdData/city.list.json";
import CityCard from "../../components/CityCard/CityCard";

const SearchWeather = (props) => {

    const {setCityId, getWeather, weather} = props;

    const [cityName, setCityName] = useState("");

    const handleSearchInput = (event) => { // sets cityName to typed user input
        const cleanInput = event.target.value.toLowerCase();
        setCityName(cleanInput);
    };

    const filteredCities = cityIdDatas.filter((cityIdData) => { //filters and displays list of cities that include typed input
        const cityDataName = cityIdData.name.toLowerCase();
        if (cityName.length > 2) {
            return cityDataName.includes(cityName);
        };
    });

    return (
        <div className="search_func">
            <div className="search_Bar">
                <input type="textbox"
                    placeholder="City Name"
                    onInput={handleSearchInput}
                    value={cityName}
                    className="search_box">
                </input>
            </div>
            <CityCard 
                filteredCities={filteredCities}
                setCityId={setCityId}
                getWeather={getWeather} 
                weather={weather}
                setCityName={setCityName}
                className="city_card"/>
        </div>
    )

}

export default SearchWeather;