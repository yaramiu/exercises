import { useState, useEffect } from "react";
import axios from "axios";

import Countries from "./components/Countries";

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

  return (
    <div>
      <div>
        find countries <input onChange={handleCountryChange} />
      </div>
      <Countries countries={searchedCountries} />
    </div>
  );
};

export default App;
