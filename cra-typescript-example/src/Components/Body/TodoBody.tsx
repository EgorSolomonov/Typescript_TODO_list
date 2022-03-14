import "./TodoBody.css";
import React from "react";
import { Button } from "@mui/material";

type Props = {
  setTasks(type: string): void;
};

const TodoBody: React.FC<Props> = React.memo((props) => {
  return (
    <div className="TodoBody_wrapper">
      <div className="TodoBody">
        <h2>Task's status</h2>
        <div className="taskButtons">
          <Button
            onClick={() => props.setTasks("All")}
            id="/All"
            variant="outlined"
          >
            All
          </Button>
          <Button
            onClick={() => props.setTasks("Done")}
            id="/Done"
            variant="outlined"
          >
            Done
          </Button>
          <Button
            onClick={() => props.setTasks("in Process")}
            id="/InProcess"
            variant="outlined"
          >
            In Process
          </Button>
        </div>
      </div>
    </div>
  );
});

export default TodoBody;
