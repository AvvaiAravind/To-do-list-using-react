export function TasksItems({
  filter,
  tasks,
  handleToggle,
  handleDelete,
  handleEdit,
}) {
  console.log(filter, tasks);
  // const [status, setStatus] = useState("Update Status");

  if (filter === "Select All" && tasks.length) {
    return (
      <>
        {tasks.map((item) => (
          <div className="card" key={item.id}>
            <p>Task Name: {item.taskName}</p>
            <p>Description: {item.description}</p>
            <p>
              Priority:{" "}
              <button onClick={() => handleToggle(item.id, "priority")}>
                {item.priority}
              </button>
            </p>
            <p>
              Status:{" "}
              {/* <button onClick={() => handleToggle(item.id, "status")}>
                {item.status}
              </button> */}
              <select
                name="status"
                id="status"
                required
                onChange={(e) => {
                  const newStatus = e.target.value;

                  handleToggle(item.id, "status", newStatus);
                }}
                value={item.status}
              >
                <option value="Started">Started</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </p>
            <div className="btn-container">
              <button type="button" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
              <button type="button" onClick={() => handleEdit(item.id)}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </>
    );
  } else {
    const filtereditems = tasks.filter(
      (item) => item.priority === filter || item.status === filter
    );
    return (
      <>
        {filtereditems.map((item) => (
          <div className="card" key={item.id}>
            <p>Task Name: {item.taskName}</p>
            <p>Description: {item.description}</p>
            <p>
              Priority:{" "}
              <button onClick={() => handleToggle(item.id, "priority")}>
                {item.priority}
              </button>
            </p>
            <p>
              Status:{" "}
              {/* <button onClick={(() => handleToggle(item.id), "status")}>
                {item.status}
              </button> */}
              <select
                name="status"
                id="status"
                required
                onChange={(e) => {
                  const newStatus = e.target.value;

                  handleToggle(item.id, "status", newStatus);
                }}
              >
                <option value="Started">Started</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Compledted</option>
              </select>
            </p>
            <div className="btn-container">
              <button type="button" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
              <button type="button" onClick={() => handleEdit(item.id)}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }
}
