import { useState, useEffect, Fragment } from "react";
import axios from "axios";

import Countries from "./components/Countries";
import Search from "./components/Search";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function getCountries() {
      try {
        const response = await axios.get(
          "https://studies.cs.helsinki.fi/restcountries/api/all"
        );
        setCountries(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getCountries();
  }, []);

  useEffect(() => {
    async function getWeatherData(countryName) {
      try {
        const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${API_KEY}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (searchedCountries.length === 1) {
      const countryName = searchedCountries[0].name.common;
      getWeatherData(countryName);
    }
  }, [searchedCountries]);

  const handleCountryChange = (event) => {
    if (event.target.value === "") {
      setSearchedCountries([]);
      return;
    }

    const filteredCountries = countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setSearchedCountries(filteredCountries);
  };

  const showCountryView = (countryName) => {
    setSearchedCountries(countryName);
  };

  return (
    <Fragment>
      <Search handleSearchInput={handleCountryChange} />
      <Countries
        countries={searchedCountries}
        handleCountryButton={showCountryView}
        weather={weather}
      />
    </Fragment>
  );
};

export default App;
