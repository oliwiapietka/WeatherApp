import './App.css';
import { useState } from 'react';

const API = {
  key: process.env.REACT_APP_API_KEY,
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetch(`${API.base}weather?q=${city}&units=metric&appid=${API.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setCity('');
          console.log(result);
        });
      }
    }
  
  const getDate = (d) => {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    
    return `${day}, ${date} ${month}`
  }
  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 15) ? 'App warm' : 'App cold') : 'App' }>
      <main>
        <div className="searchbox">
          <input
            className="searchbar" 
            type="text" 
            placeholder="Search a place.." 
            onChange={event => setCity(event.target.value)}
            value={city}
            onKeyPress={searchLocation}
          />
        </div>
        <div className="locationbox">
            <div className="date">{getDate(new Date())}</div>
            <div className="location">
            {weather.name ? <p>{weather.name}, {weather.sys.country}</p> : null} </div>
        </div>
        <div className="weatherbox">
            <div className="temperature">
            {weather.main ? <p>{Math.round(weather.main.temp)}°C</p> : null} </div>
            <div className="weather">
            {weather.weather ? <p>{weather.weather[0].main}</p> : null} </div>
            <div className="wind">
            {weather.wind ? <p>Wind: {weather.wind.speed} m/sec </p> : null} </div>
        </div>
      </main>
    </div>
  );
}

export default App;
