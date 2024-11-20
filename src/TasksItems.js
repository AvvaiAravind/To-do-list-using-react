export function TasksItems({ filter, tasks, handleToggle, handleDelete }) {
  console.log(filter, tasks);

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
              <button onClick={() => handleToggle(item.id, "status")}>
                {item.status}
              </button>
            </p>
            <button type="button" onClick={() => handleDelete(item.id)}>
              Delete
            </button>
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
              Priority:
              <button onClick={() => handleToggle(item.id, "priority")}>
                {item.priority}
              </button>
            </p>
            <p>
              Status:
              <button onClick={() => handleToggle(item.id)}>
                {item.status}
              </button>
            </p>
            <button type="button" onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </>
    );
  }
}
