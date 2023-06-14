import { useState } from "react";
import Name from "./component/Name";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
    };
    setPersons(persons.concat(person));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Name key={person.name} name={person.name} />
      ))}
    </div>
  );
};

export default App;
