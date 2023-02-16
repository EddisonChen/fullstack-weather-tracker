import './App.scss';
import {useState, useEffect} from "react";
import SearchWeather from './containers/SearchWeather/SearchWeather';
import ShowWeather from './containers/ShowWeather/ShowWeather';
import api_key from './config';

function App() {

  const [cityId, setCityId] = useState("");
  const [weather, setWeather] = useState();

  const getWeather = () => { // fetch request to get weather data from 3rd party API
    if  (cityId !== "") {
        fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${api_key}`)
      .then((response) => {
        return response.json();
      }) .then((weatherData) => {
        setWeather(weatherData);
      });
    };
  };

  useEffect(getWeather, [cityId]); // runs getWeather when cityID is updated

  return (
    <>
      <h1 className="title">WEATHERPRO</h1>
      <div className="body">
        <div className="search">
          <SearchWeather 
            setCityId={setCityId} 
            getWeather={getWeather} 
            weather={weather}/>
        </div>
        <div className="weather_cards">
          {weather && <ShowWeather 
            weather={weather}
            />}
        </div>
      </div>
    </>
    
  );
}

export default App;
