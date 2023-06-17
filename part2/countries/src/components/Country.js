import { Fragment } from "react";

const Country = ({ name, country }) => {
  if (!country) return <div>{name}</div>;

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Country;
