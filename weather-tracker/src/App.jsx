import './App.scss';
import {useState, useEffect} from "react";
import SearchWeather from './containers/SearchWeather/SearchWeather';
import ShowWeather from './containers/ShowWeather/ShowWeather';
import AddWeather from './components/AddWeather/AddWeather';
import api_key from './config';

function App() {

  const [cityId, setCityId] = useState("");
  const [weather, setWeather] = useState();

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

  const windDirectionConverter = (windDegree) => {
    if (windDegree > 337.5 || windDegree < 22.5) {
      return "North";
    } else if (windDegree > 22.5 && windDegree < 67.5) {
        return "Northeast";
    } else if (windDegree > 67.5 && windDegree < 112.5) {
        return "East";
    } else if (windDegree > 112.5 && windDegree < 157.5) {
        return "Southeast";
    } else if (windDegree > 157.5 && windDegree < 202.5) {
      return "South";
    } else if (windDegree > 202.5 && windDegree < 247.5) {
        return "Southwest";
    } else if (windDegree > 247.5 && windDegree < 292.5) {
        return "West";
    } else if (windDegree > 292.5 && windDegree < 337.5) {
        return "Northwest";
    } 
};

  return (
    <body>
      <h1 className="title">WEATHERPRO</h1>
      <main className="body">
        <section className="search">
          <SearchWeather 
            setCityId={setCityId} 
            getWeather={getWeather} 
            weather={weather}/>
        </section>
        {weather && <AddWeather
          weather = {weather}
          windDirectionConverter = {windDirectionConverter}/>}
        <section className="weather_cards">
          {weather && <ShowWeather 
            weather={weather}
            windDirectionConverter = {windDirectionConverter}/>}
        </section>
      </main>
    </body>
    
  );
}

export default App;
