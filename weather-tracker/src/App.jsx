import './App.scss';
import {useState, useEffect} from "react";
import SearchWeather from './containers/SearchWeather/SearchWeather';
import ShowWeather from './containers/ShowWeather/ShowWeather';

function App() {

  const [cityId, setCityId] = useState();
  const [weather, setWeather] = useState();

  console.log(cityId)

  const getWeather = () => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=964f31dcf4f3ff4c455a61f30fa14d19`)
    .then((response) => {
      return response.json()
    }) .then((weatherData) => {
      setWeather(weatherData)
    })
  }

  return (
    <>
      <h1 className="title">WEATHERPRO</h1>
      <div className="body">
        <div className="search">
          <SearchWeather setCityId={setCityId} getWeather={getWeather} weather={weather}/>
        </div>
        <div className="weather_cards">
          {weather && <ShowWeather weather={weather}/>}
        </div>
      </div>
    </>
    
  );
}

export default App;
