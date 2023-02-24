import './App.scss';
import {useState} from "react";
import SearchWeather from './containers/SearchWeather/SearchWeather';
import ShowWeather from './containers/ShowWeather/ShowWeather';
import AddWeather from './components/AddWeather/AddWeather';

function App() {

  const [weather, setWeather] = useState();

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
    <div>
      <h1 className="title">WEATHERPRO</h1>
      <main className="body">
        <section className="search">
          <SearchWeather 
            weather={weather}
            setWeather = {setWeather}/>
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
    </div>
    
  );
}

export default App;
