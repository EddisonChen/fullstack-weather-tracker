import { useState, useEffect} from "react";
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather";
import UnitToggle from "../../components/UnitToggle/UnitToggle";

const ShowWeather = (props) => {

    const {weather, windDirectionConverter} = props;

    const [unitType, setUnitType] = useState(false);
    const [previousData, setPreviousData] = useState();
    const [weatherObject, setWeatherObject] = useState({
        tempMain: weather.main.temp,
        tempFeelsLike: weather.main.feels_like,
        tempHigh: weather.main.temp_max,
        tempLow: weather.main.temp_min,
        visibility: weather.visibility,
        windSpeed: weather.wind.speed,
        windDirection: windDirectionConverter(weather.wind.deg)
    });
    
    const getPreviousResults = () => { // only fetches weather from local DB once weather has a value
        fetch(`http://192.168.56.1:3020/weather/${weather.id}`)
        .then((response) => {
            return response.json();
        }).then((historicWeatherData) => {
            setPreviousData(historicWeatherData)
        }).catch(() => {
            setPreviousData()
        })
    };
    
    useEffect(getPreviousResults, [weather.id]);

        return (
            <div>
                <div className="toggle">
                    <UnitToggle 
                        setUnitType={setUnitType} 
                        unitType={unitType}/>
                </div>
                <section>
                    <CurrentWeather
                        weather = {weather}
                        unitType = {unitType}
                        setUnitType = {setUnitType}
                        weatherObject = {weatherObject}
                        setWeatherObject = {setWeatherObject}
                        previousData = {previousData}
                    />
                </section>
            </div>
        )
};

export default ShowWeather;