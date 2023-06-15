import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();

    const checkNameExists = () => {
      let isExistingName = false;
      persons.forEach((person) => {
        if (person.name.toLowerCase() === newName.toLowerCase())
          isExistingName = true;
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

  const handleSearchChange = (event) => setSearch(event.target.value);

  const filteredPersons =
    search.length === 0
      ? persons
      : persons.filter((person) => {
          const ANY_UPPER_CASE_REGEX = /^[a-z]*[A-Z]/;
          if (search.match(ANY_UPPER_CASE_REGEX)) {
            const caseSensitiveCheck = person.name.includes(search);
            return caseSensitiveCheck;
          }
          const caseInsensitiveCheck = person.name
            .toLowerCase()
            .includes(search.toLowerCase());
          return caseInsensitiveCheck;
        });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchInputHandler={handleSearchChange}
        searchInputValue={search}
      />
      <h2>add a new</h2>
      <PersonForm
        personFormHandler={addPerson}
        nameInputHandler={handleNameChange}
        nameInputValue={newName}
        numberInputHandler={handleNumberChange}
        numberInputValue={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
