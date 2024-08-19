import { useEffect, useState } from "react";
import Search from "../search/Search";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (param) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=dfd63828b463cff9c3f951c9512623af`
      );
      const data = await response.json();
      console.log(data);

      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (search === "") {
      fetchWeatherData("dhaka");
    }
    fetchWeatherData(search);
    setSearch("");
  };

  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    fetchWeatherData("dhaka");
    setSearch("");
  }, []);

  //   console.log(weatherData);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name},<span> {weatherData?.sys?.country} </span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp">
            {" "}
            Temperature: {weatherData?.main?.temp}, <br />
            <span>Feels Like: {weatherData?.main?.feels_like}</span>{" "}
          </div>
          <p className="description">
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].description
              : ""}
          </p>

          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{weatherData?.wind?.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                <p>humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
