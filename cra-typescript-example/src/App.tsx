import React, { useEffect, useState } from "react";
import "./App.css";
import TodoBody from "./Components/Body/TodoBody";
import TodoBottom from "./Components/Bottom/TodoBottom";
import TodoHead from "./Components/Head/TodoHead";

type Props = {};

export type newTask = {
  taskText: string;
  id: number;
  isDone: boolean;
  isChanging: boolean;
  visibility: boolean;
};

const App: React.FC<Props> = React.memo((props) => {
  const [tasks, setTask] = useState<Array<newTask>>([]);

  useEffect(() => {
    const savedTasksInStorage: newTask[] = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );
    setTask(savedTasksInStorage);
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addNewTask = (newTaskText: string) => {
    const newTask: newTask = {
      taskText: newTaskText,
      id: Date.now(),
      isDone: false,
      isChanging: false,
      visibility: true,
    };
    setTask([newTask, ...tasks]);
  };

  const toggleTaskStatus = (id: number) => {
    setTask(
      tasks.map((task) => {
        if (id === task.id) task.isDone = !task.isDone;
        return task;
      })
    );
  };

  const removeTask = (id: number) => {
    setTask(
      tasks.filter((task) => {
        if (id !== task.id) return task;
      })
    );
  };

  const changeTaskText = (newText: string, id: number) => {
    setTask(
      tasks.map((task) => {
        if (id === task.id) task.taskText = newText;
        return task;
      })
    );
  };

  const toggleChangeText = (id: number) => {
    setTask(
      tasks.map((task) => {
        if (id === task.id) task.isChanging = !task.isChanging;
        return task;
      })
    );
  };

  const setTasks = (type: string) => {
    if (type === "All") {
      setTask(
        tasks.map((task) => {
          task.visibility = true;
          return task;
        })
      );
    } else if (type === "Done") {
      setTask(
        tasks.map((task) => {
          if (task.isDone) task.visibility = true;
          else task.visibility = false;
          return task;
        })
      );
    } else {
      setTask(
        tasks.map((task) => {
          if (!task.isDone) task.visibility = true;
          else task.visibility = false;
          return task;
        })
      );
    }
  };

  const onClickDeleteDoneTasks = () => {
    setTask(tasks.filter((task) => !task.isDone));
  };

  return (
    <div className="Todo_wrapper">
      <TodoHead addNewTask={addNewTask} />
      <TodoBody setTasks={setTasks} />
      <TodoBottom
        tasks={tasks}
        toggleTaskStatus={toggleTaskStatus}
        removeTask={removeTask}
        changeTaskText={changeTaskText}
        toggleChangeText={toggleChangeText}
        onClickDeleteDoneTasks={onClickDeleteDoneTasks}
      />
    </div>
  );
});

export default App;
