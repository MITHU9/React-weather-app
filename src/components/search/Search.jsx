/* eslint-disable react/prop-types */
const Search = ({ search, setSearch, handleSearch }) => {
  return (
    <div className="search-engine">
      <input
        type="text"
        name="search"
        value={search}
        placeholder="Enter city name...."
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search Weather</button>
    </div>
  );
};

export default Search;
