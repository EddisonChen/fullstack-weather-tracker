import './App.scss';
import {useState, useEffect} from "react";
import SearchWeather from './containers/SearchWeather/SearchWeather';
import ShowWeather from './containers/ShowWeather/ShowWeather';
import api_key from './config'

function App() {

  const [cityId, setCityId] = useState("");
  const [weather, setWeather] = useState();
  const [jsonData, setJsonData] = useState()

  console.log(cityId)

  const getWeather = () => {
    if  (cityId !== "") {
        fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${api_key}`)
      .then((response) => {
        return response.json()
      }) .then((weatherData) => {
        setWeather(weatherData)
      })
    } else {}
  }

  useEffect(getWeather, [cityId])

  console.log(weather)

  return (
    <>
      <h1 className="title">WEATHERPRO</h1>
      <div className="body">
        <div className="search">
          <SearchWeather setCityId={setCityId} getWeather={getWeather} weather={weather}/>
        </div>
        <div className="weather_cards">
          {weather && <ShowWeather weather={weather} cityId={cityId} jsonData={jsonData} setJsonData={setJsonData}/>}
        </div>
      </div>
    </>
    
  );
}

export default App;
