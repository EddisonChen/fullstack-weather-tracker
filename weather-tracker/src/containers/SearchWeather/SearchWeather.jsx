import {useState, useEffect} from "react";
import cityIdDatas from "../../cityIdData/city.list.json";
import CityList from "../../components/CityList/CityList";
import api_key from '../../config';

const SearchWeather = (props) => {

    const {weather, setWeather} = props;

    const [cityName, setCityName] = useState("");
    const [cityId, setCityId] = useState("");

    const getWeather = () => {
        if (cityId !== "") {
            fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${api_key}`)
        .then((response) => {
            return response.json();
        }) .then((weatherData) => {
            setWeather(weatherData);
        });
        };
    };

    useEffect(getWeather, [cityId]);

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
        <section className="search_func">
            <input type="textbox" 
                placeholder="City Name"
                onInput={handleSearchInput}
                value={cityName}
                className="search_box">
            </input>
            <CityList 
                filteredCities={filteredCities}
                setCityId={setCityId}
                getWeather={getWeather} 
                weather={weather}
                setCityName={setCityName}
                className="city_card"/>
        </section>
    )

}

export default SearchWeather;