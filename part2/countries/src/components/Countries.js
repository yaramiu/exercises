import Country from "./Country";

const Countries = ({ countries }) => {
  if (countries.length === 0) {
    return <div></div>;
  }

  if (countries.length > 10)
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  else if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        {countries.map((country) => (
          <Country key={country.name.common} name={country.name.common} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <Country country={countries[0]} />
      </div>
    );
  }
};

export default Countries;
