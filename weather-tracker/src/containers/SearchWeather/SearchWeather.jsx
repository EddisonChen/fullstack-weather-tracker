import "./SearchWeather.scss";
import {useState, useEffect} from "react";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import cityIdDatas from "../../cityIdData/city.list.json"
import CityCard from "../../components/CityCard/CityCard";

const SearchWeather = (props) => {

    const {setCityId, getWeather, weather} = props;

    const [cityName, setCityName] = useState("");

    const handleSearchInput = (event) => {
        const cleanInput = event.target.value.toLowerCase()
            setCityName(cleanInput)
    };

    const filteredCities = cityIdDatas.filter((cityIdData) => {
        const cityDataName = cityIdData.name.toLowerCase()
        if (cityName.length > 2) {
            return cityDataName.startsWith(cityName)
        }
    })

    return (
        <>
            <SearchBar handleSearchInput={handleSearchInput} cityName={cityName}/>
            <CityCard 
            filteredCities={filteredCities}
            setCityId={setCityId}
            getWeather={getWeather} 
            weather={weather}
            setCityName={setCityName}/>
        </>
    )

}

export default SearchWeather;

// match city name with city id from json file
// have filter cities on input, show country as well
// setcityid to cityid
// show weatehr based on cityid in showweather