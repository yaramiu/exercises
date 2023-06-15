const Filter = ({ searchInputHandler, searchInputValue }) => (
  <div>
    filter shown with
    <input onChange={searchInputHandler} value={searchInputValue} />
  </div>
);

export default Filter;
