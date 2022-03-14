import { Button, TextField } from "@mui/material";
import "./TodoHead.css";
import React, { useEffect, useState } from "react";

type Props = {
  addNewTask(task: string): void;
};

const TodoHead: React.FC<Props> = React.memo((props) => {
  const [taskText, setTextTask] = useState<string>("");
  const [button, setButtonAble] = useState<boolean>(true);

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextTask(e.currentTarget.value);
    setButtonAble(false);
  };

  const onClickTaskButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    taskText === "" ? setButtonAble(false) : props.addNewTask(taskText);
    setTextTask("");
    setButtonAble(true);
  };

  return (
    <div className="TodoHead_wrapper">
      <div className="TodoHead">
        <div className="header_top">
          <h1>Todo List</h1>
        </div>
        <div className="body_top">
          <TextField
            value={taskText}
            onChange={onChangeInputValue}
            id="standard-basic"
            label="Type your task here..."
            variant="standard"
            fullWidth
          />
          <Button
            disabled={button}
            onClick={onClickTaskButton}
            variant="contained"
          >
            Add new task
          </Button>
        </div>
      </div>
    </div>
  );
});

export default TodoHead;
