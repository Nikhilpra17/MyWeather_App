import React, { useEffect, useState } from "react";
import { WiHumidity } from "react-icons/wi";
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import "./Weather.css";

const Weather = function () {
  const [city, setCity] = useState("New Delhi");
  const [weather, setWeather] = useState();
  const [error, setError] = useState();

  const API_Key = "25b1fabe4b5d0b464ab87715ac25539f";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_Key}`;

  //   useEffect(() => {
  //     fetchData();
  //   }, [city]);

  async function fetchData() {
    try {
      let ans = await fetch(url);
      let output = await ans.json();
      if (ans.ok) {
        setWeather(output);
        console.log(output);
        setError("");
      } else {
        setError("The Entered city name does not exists");
      }
    } catch (error) {}
  }

  function handleChange(e) {
    setCity(e.target.value);
  }

  return (
    <div className="box">
      <div className="city">
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter City Name"
        />
        <button onClick={() => fetchData()}>
          <FaSearch />
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weather && weather.weather && (
        <div className="content">
          <div className="weather-image">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
            <h3 className="desc">{weather.weather[0].description}</h3>
          </div>

          <div className="weather-temp">
            <h2>
              {weather.main.temp}
              <span>&deg;C</span>
            </h2>
          </div>

          <div className="weather-city">
            <div className="location">
              <MdLocationOn />
            </div>
            <p>
              {weather.name},<span>{weather.sys.country}</span>
            </p>
          </div>

          <div className="weather-stat">
            <div className="wind">
              <div className="wind-icon">
                <FaWind />
              </div>
              <h3 className="wind-speed">
                {weather.wind.speed}
                <span>Km/h</span>
              </h3>
              <h3 className="wind-heading">Wind Speed</h3>
            </div>
            <div className="humidity">
              <div className="humidity-icon">
                <WiHumidity />
              </div>
              <h3 className="humidity-percent">
                {weather.main.humidity}
                <span>%</span>
              </h3>
              <h3 className="humidity-heading">Humidity</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
