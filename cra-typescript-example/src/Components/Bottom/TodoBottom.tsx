import "./TodoBottom.css";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, TextField } from "@mui/material";
import HandymanIcon from "@mui/icons-material/Handyman";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { pink, orange } from "@mui/material/colors";
import { newTask } from "../../App";

type Props = {
  tasks: Array<newTask>;
  toggleTaskStatus(id: number): void;
  removeTask(id: number): void;
  changeTaskText(newText: string, id: number): void;
  toggleChangeText(id: number): void;
  onClickDeleteDoneTasks(): void;
};

const TodoBottom: React.FC<Props> = React.memo((props) => {
  if (props.tasks.length === 0) {
    return <div className="TodoBottom_wrapper">Лист заданий пуст...</div>;
  } else
    return (
      <>
        <div className="TodoBottom_wrapper">
          {props.tasks.map((task) => {
            const classes = ["TodoBottom"];
            if (task.isDone) classes.push("done");
            if (!task.visibility) classes.push("invisible");

            return (
              <div key={task.id} className={classes.join(" ")}>
                {!task.isChanging ? (
                  <h3 onDoubleClick={() => props.toggleChangeText(task.id)}>
                    {task.taskText}
                  </h3>
                ) : (
                  <TextField
                    hiddenLabel
                    id="standard-basic"
                    defaultValue={task.taskText}
                    variant="standard"
                    autoFocus
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      props.changeTaskText(e.currentTarget.value, task.id)
                    }
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                      task.taskText !== ""
                        ? props.toggleChangeText(task.id)
                        : (e.currentTarget.placeholder =
                            "Добавьте текст задания")
                    }
                  />
                )}
                <div className="Todo_control">
                  <Checkbox
                    onChange={props.toggleTaskStatus.bind(null, task.id)}
                    checked={task.isDone}
                    color="success"
                  />
                  {!task.isChanging ? (
                    <HandymanOutlinedIcon
                      onClick={() => props.toggleChangeText(task.id)}
                      sx={{ color: orange[500] }}
                    />
                  ) : (
                    <HandymanIcon
                      onClick={() =>
                        task.taskText !== ""
                          ? props.toggleChangeText(task.id)
                          : null
                      }
                      sx={{ color: orange[500] }}
                    />
                  )}
                  <DeleteIcon
                    className="deleteIcon"
                    onClick={() => props.removeTask(task.id)}
                    sx={{ color: pink[500] }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="deleteDoneTasksButton">
          <Button
            disabled={
              props.tasks.some((task) => task.isDone) &&
              props.tasks
                .map((task) => {
                  if (task.isDone && task.visibility) return true;
                })
                .some((bool) => bool)
                ? false
                : true
            }
            onClick={() => props.onClickDeleteDoneTasks()}
            variant="outlined"
            startIcon={<DeleteIcon />}
            sx={{ color: pink[500] }}
            color="error"
          >
            Delete all done tasks
          </Button>
        </div>
      </>
    );
});

export default TodoBottom;
