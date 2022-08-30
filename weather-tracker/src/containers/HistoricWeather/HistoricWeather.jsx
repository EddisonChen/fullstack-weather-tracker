import "./HistoricWeather.scss";
import {useEffect, useState} from "react";
import HistoricWeatherCard from "../../components/HistoricWeatherCard/HistoricWeatherCard";

const HistoricWeather = (props) => {

    const {weather} = props;

    const [previousData, setPreviousData] = useState()

    const getPreviousResults = () => {
        fetch(`http://192.168.56.1:3020/weather/${weather.id}`)
        .then((response) => {
            return response.json()
        }).then((previousWeatherData) => {
            setPreviousData(previousWeatherData)
            console.log(previousWeatherData)
        })
    }

    useEffect(getPreviousResults, [weather])

    return (
        <div>
            {previousData && <HistoricWeatherCard previousData={previousData}/>}
        </div>
    )
}

export default HistoricWeather;