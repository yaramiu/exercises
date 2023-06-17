const Country = ({ country, handleCountryButton }) => {
  if (handleCountryButton)
    return (
      <div>
        {country.name.common}{" "}
        <button
          onClick={() => {
            handleCountryButton([country]);
          }}
        >
          show
        </button>
      </div>
    );

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>
            <p>{language}</p>
          </li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

export default Country;
