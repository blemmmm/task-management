import { Task, TaskPayload } from '@/lib/interface/TaskTypes';
import { useTaskService } from '@/lib/services/taskService';
import { Add } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useMutation } from 'react-query';

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { getTasks, createTask } = useTaskService();
  const { data } = getTasks();
  const { mutateAsync: createTaskMutation } = useMutation(createTask);

  const handleCreateTask = async (task: TaskPayload) => {
    createTaskMutation(task, {
      onSuccess: (data: Task) => {
        console.log('success', data);
      },
      onError: (error: unknown) => {
        console.log('error', error);
      },
    });
  };

  console.log({ data });

  return (
    <div className="border border-solid border-neutral-200 h-[calc(100vh-140px)] rounded-lg my-4 mx-8">
      <div className="py-3 flex items-center justify-between border-0 border-b border-solid border-neutral-200 font-sans px-8">
        <span className="text-lg font-semibold">Tasks</span>
        <Button
          className="!bg-neutral-100 !px-4 !py-2 !gap-1.5"
          onClick={() => setOpen(true)}
        >
          <Add fontSize="small" />
          New Task
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleCreateTask({ name, description, status: 'pending' });
            setOpen(false);
          },
        }}
      >
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <div
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
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
  );
};

export default HomePage;
