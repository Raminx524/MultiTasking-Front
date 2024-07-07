import React, { useEffect, useState } from "react";
import api from "../services/api.service";
import { Link } from "react-router-dom";

function TasksPage() {
  const [tasks, setTasks] = useState(null);
  useEffect(() => {
    async function getTasks() {
      try {
        const res = await api.get("/task/");
        setTasks(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    getTasks();
  }, []);
  if (!tasks) return <p>Loading...</p>;
  return (
    <main>
      <h1>My Tasks:</h1>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task._id}>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <Link to={task._id}>More..</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default TasksPage;
