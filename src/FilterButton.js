import { FaFilter } from "react-icons/fa";

export function FilterButton({ filter, setFilter }) {
  const handleChange = (e) => {
    const value = e.target.value;
    setFilter(value);
  };
  return (
    <label htmlFor="filter" className="filter-label">
      <FaFilter className="icon" />
      <select
        name="filter"
        id="filter"
        onChange={(e) => handleChange(e)}
        className="filter"
        value={filter}
      >
        <option value="Select All">Select All</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
        <option value="High">High</option>
        <option value="Low">Low</option>
      </select>
    </label>
  );
}
