import Contact from "./Contact";

const Persons = ({ persons, contactButtonHandler }) =>
  persons.map((person) => (
    <Contact
      key={person.name}
      name={person.name}
      number={person.number}
      buttonHandler={contactButtonHandler}
      id={person.id}
    />
  ));

export default Persons;
