import { useState } from "react";
import Contact from "./component/Contact";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();

    const checkNameExists = () => {
      let isExistingName = false;
      persons.forEach((person) => {
        if (person.name.toLowerCase() === newName.toLowerCase()) {
          isExistingName = true;
        }
      });
      return isExistingName;
    };

    const isExistingName = checkNameExists();
    if (isExistingName) {
      alert(`${newName} is already added to phonebook`);
      resetInputFields();
      return;
    }

    const person = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(person));

    resetInputFields();
  };

  const resetInputFields = () => {
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Contact key={person.name} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

export default App;
