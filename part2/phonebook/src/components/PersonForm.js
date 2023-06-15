const PersonForm = ({
  personFormHandler,
  nameInputHandler,
  nameInputValue,
  numberInputHandler,
  numberInputValue,
}) => (
  <form onSubmit={personFormHandler}>
    <div>
      name: <input onChange={nameInputHandler} value={nameInputValue} />
    </div>
    <div>
      number: <input onChange={numberInputHandler} value={numberInputValue} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
