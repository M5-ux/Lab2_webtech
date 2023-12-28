import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = "3F9SZHLAM22VE7UTK7WX3CHV7"; // Replace with your actual API key
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json&langu`;

    axios.get(url)
      .then(response => {
        setWeatherData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Fetching error:", error);
        setError(error);
        setLoading(false);
      });

    // This cleanup function is optional, used for aborting the request if the component unmounts
    return () => {
      axios.CancelToken.source().cancel();
    };
  }, [city]); // Dependency array: this effect runs when 'city' changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading weather data</p>;
  if (!weatherData) return <p>No data available</p>;

  // Example of accessing weather data - adjust based on actual data structure
  const temperature = weatherData.currentConditions.temp;
  const humidity = weatherData.currentConditions.humidity;
  const windspeed = weatherData.currentConditions.windspeed;
  const description = weatherData.description;

  return (
    <div className="text-center p-5 rounded-lg bg-gray-100 shadow-md">
  <h2 className="text-2xl font-bold">Météo à {city}</h2>
  <div>
    <p className="text-xl font-semibold">Temperature: {temperature}°C</p>
    <p>Humidity: {humidity}%</p>
    <p>Wind: {windspeed} km/h</p>
    <p>{description}</p>
  </div>
      {!weatherData.currentConditions && <p>Loading or no data available...</p>}
    </div>
  );
  
}

export default Weather;
