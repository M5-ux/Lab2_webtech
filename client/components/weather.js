import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json&langu`;

    axios
      .get(url)
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Fetching error:', error);
        setError(error);
        setLoading(false);
      });

    return () => {
      axios.CancelToken.source().cancel();
    };
  }, [city]); //Exécuté lorsque le nom de ville est modifié

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading weather data</p>;
  if (!weatherData) return <p>No data available</p>;

  //Données météo
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
