import Contact from "./Contact";

const Persons = ({ persons }) =>
  persons.map((person) => (
    <Contact key={person.name} name={person.name} number={person.number} />
  ));

export default Persons;
