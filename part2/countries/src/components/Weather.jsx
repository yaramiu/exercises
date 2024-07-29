const Weather = ({ weather, country }) => {
  if (!weather) return <div></div>;

  const degreesCelsius = weather.main.temp - 273.15;
  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <p>temperature {degreesCelsius.toFixed(2)} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={`${weather.weather[0].description}`}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
