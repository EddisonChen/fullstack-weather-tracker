import './App.scss';
import {useState, useEffect} from "react";
import SearchWeather from './containers/SearchWeather/SearchWeather';
import ShowWeather from './containers/ShowWeather/ShowWeather';

function App() {

  const [cityId, setCityId] = useState();
  const [weather, setWeather] = useState();

  const getWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=964f31dcf4f3ff4c455a61f30fa14d19`)
    .then((response) => {
      return response.json()
    }) .then((weatherData) => {
      setWeather(weatherData)
    })
  }

  // useEffect(getWeather, cityId)

  // console.log(weather)

  console.log(cityId)

  return (
    <>
      <h1>WEATHER CHECKER!!!!
      </h1>
      <SearchWeather setCityId={setCityId}/>
      <ShowWeather weather={weather}/>
    </>
    
  );
}

export default App;
