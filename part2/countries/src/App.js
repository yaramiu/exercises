import { useState, useEffect, Fragment } from "react";
import axios from "axios";

import Countries from "./components/Countries";
import Search from "./components/Search";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);

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

  const showCountryView = (country) => {
    setSearchedCountries(country);
  };

  return (
    <Fragment>
      <Search handleSearchInput={handleCountryChange} />
      <Countries
        countries={searchedCountries}
        handleCountryButton={showCountryView}
      />
    </Fragment>
  );
};

export default App;
