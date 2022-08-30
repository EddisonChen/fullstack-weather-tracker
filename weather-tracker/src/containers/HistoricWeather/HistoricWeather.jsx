import "./HistoricWeather.scss";
import {useEffect, useState} from "react";

const HistoricWeather = (props) => {

    const {cityId} = props;

    const [previousData, setPreviousData] = useState()

    console.log(cityId)

    const getPreviousResults = () => {
        console.log(cityId)
        fetch(`http://192.168.56.1:3020/weather/${cityId}`)
        .then((response) => {
            return response.json()
        }).then((previousWeatherData) => {
            setPreviousData(previousWeatherData)
            console.log(previousWeatherData)
        })
    }

    useEffect(getPreviousResults, [cityId])
    console.log(previousData)

    return (
        <>
            <h2>Previous Results</h2>
            {/* <button onClick={getPreviousResults}>get previous results</button> */}
            {previousData && <p>{previousData.nameCity}</p>}
        </>
    )
}

export default HistoricWeather;