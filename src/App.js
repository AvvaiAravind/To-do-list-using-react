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

  const [taskToEdit, setTaskToEdit] = useState(null);

  // const [newstatus, setNewStatus] = useState(JSON.);

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
    if (taskToEdit) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskToEdit.id
            ? { ...task, taskName, description, priority, status }
            : task
        )
      );

      setTaskToEdit(null);
    } else {
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
    }
  };

  const handleToggle = (id, target, status) => {
    let newStatus;
    if (target === "status") {
      // const filteredItem = tasks.filter((item) => item.id === id);

      switch (status) {
        case "Started":
          newStatus = "Started";
          break;
        case "Ongoing":
          newStatus = "Ongoing";
          break;
        case "Pending":
          newStatus = "Pending";
          break;
        case "Completed":
          newStatus = "Completed";
          break;
        default:
          newStatus = "update Status";
          break;
      }
    }
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return target === "priority"
            ? { ...item, priority: item.priority === "High" ? "Low" : "High" }
            : {
                ...item,
                status: newStatus,
              };
        }
        return item;
      })
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const task = tasks.find((task) => task.id === id);
    setTaskToEdit(task);
  };

  return (
    <>
      <h1>To-Do List</h1>
      <div className="interactive">
        <TaskInput
          handleSave={handleSave}
          taskToEdit={taskToEdit}
          setTaskToEdit={setTaskToEdit}
        />
        <FilterButton filter={filter} setFilter={setFilter} />
      </div>
      <div className="display">
        <TasksItems
          tasks={tasks}
          filter={filter}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </>
  );
}

export default App;
