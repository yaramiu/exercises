import { useEffect, useState } from "react";

import "./index.css";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function getServerData() {
      try {
        const savedPersons = await personService.getAll();
        setPersons(savedPersons);
      } catch (error) {
        console.error(error);
      }
    }
    getServerData();
  }, []);

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const addPerson = async (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
    };

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
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const existingPerson = persons.find(
          (person) => person.name === newName
        );
        const id = existingPerson.id;

        try {
          const updatedPerson = await personService.update(person, id);
          setPersons(
            persons.map((person) =>
              person.name !== newName ? person : updatedPerson
            )
          );
          updateMessage(
            `Updated ${updatedPerson.name}'s number to ${updatedPerson.number}`
          );
        } catch (error) {
          console.error(error);
        }
        resetInputFields();
        return;
      }
    }

    try {
      const createdPerson = await personService.create(person);
      setPersons(persons.concat(createdPerson));
      updateMessage(`Added ${createdPerson.name}`);
    } catch (error) {
      console.error(error);
    }

    resetInputFields();
  };

  const updateMessage = (message) => {
    setMessage(message);
    setTimeout(() => setMessage(null), 5000);
  };

  const resetInputFields = () => {
    setNewName("");
    setNewNumber("");
  };

  const handleSearchChange = (event) => setSearch(event.target.value);

  const deletePerson = async (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      try {
        await personService.remove(id);
        setPersons(persons.filter((person) => person.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

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
      <Notification message={message} />
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
      <Persons persons={filteredPersons} contactButtonHandler={deletePerson} />
    </div>
  );
};

export default App;
