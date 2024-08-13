import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createTask = useCallback(async () => {
    const response = await fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    const data = await response.json();
    setTasks([...tasks, data]);
  }, [name, description, tasks]);

  const getTasks = useCallback(async () => {
    const response = await fetch("http://localhost:8080/api/tasks");
    const data = await response.json();
    setTasks(data);
  }, []);

  useEffect(() => {
    getTasks().catch(console.error);
  }, [getTasks]);

  return (
    <>
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Hello world
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              createTask();
              setOpen(false);
            },
          }}
        >
          <DialogTitle>New Task</DialogTitle>
          <DialogContent>
            <div
              style={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <TextField
                required
                label="Name"
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                required
                label="Description"
                fullWidth
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default App;
