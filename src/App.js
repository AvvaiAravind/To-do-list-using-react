import "./App.css";
import { useState, useEffect } from "react";
import { TaskInput } from "./TaskInput";
import { FilterButton } from "./FilterButton";
// import { ImOpt } from "react-icons/im";
import { TasksItems } from "./TasksItems";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [filter, setFilter] = useState("Select All");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSave = (taskName, description, priority, status, e, form) => {
    e.preventDefault();
    const formElements = form.current.elements;
    const prioritySelect = formElements["priority"];
    const statusSelect = formElements["status"];
    console.log(prioritySelect.value, statusSelect.value);
    if (
      (prioritySelect.value === "Default" ||
        statusSelect.value === "Default") &&
      form.current
    ) {
      alert("Both priority and status is must");
      return;
    }
    setTasks((prev) => {
      return [
        ...prev,
        {
          id: Date.now(),
          taskName: taskName,
          description: description,
          priority: priority,
          status: status,
        },
      ];
    });
  };

  const handleToggle = (id, target) => {
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return target === "priority"
            ? { ...item, priority: item.priority === "High" ? "Low" : "High" }
            : {
                ...item,
                status: item.status === "Pending" ? "Completed" : "Pending",
              };
        }
        return item;
      })
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <h1>To-Do List</h1>
      <div className="interactive">
        <TaskInput handleSave={handleSave} />
        <FilterButton filter={filter} setFilter={setFilter} />
      </div>
      <div className="display">
        <TasksItems
          tasks={tasks}
          filter={filter}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default App;
