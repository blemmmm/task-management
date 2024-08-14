import TaskCard from '@/components/TaskCard';
import { Task, TaskPayload } from '@/lib/interface/TaskTypes';
import { useTaskService } from '@/lib/services/taskService';
import { Add, ThumbUp } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

type StatusTypes = 'pending' | 'in_progress' | 'completed';

const HomePage = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState<TaskPayload>({
    name: '',
    description: '',
    status: 'pending',
    id: '',
  });

  const { getTasks, createTask, updateTask, deleteTask } = useTaskService();
  const { data: tasksData } = getTasks();
  const { mutateAsync: createTaskMutation } = useMutation(createTask);
  const { mutateAsync: updateTaskMutation } = useMutation(updateTask);
  const { mutateAsync: deleteTaskMutation } = useMutation(deleteTask);

  const handleCreateTask = async (task: TaskPayload) => {
    createTaskMutation(task, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
      onError: (error: unknown) => {
        console.log('error', error);
      },
    });
  };

  const handleUpdateTask = async (task: TaskPayload) => {
    updateTaskMutation(task, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
      onError: (error: unknown) => {
        console.log('error', error);
      },
    });
  };

  const handleDeleteTask = async (id: string) => {
    deleteTaskMutation(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
      },
      onError: (error: unknown) => {
        console.log('error', error);
      },
    });
  };

  const handleEditValues = (task: Task) => {
    setTask(task);
    setIsEditing(true);
    setOpen(true);
  };

  const resetValues = () => {
    setTask({ name: '', description: '', status: 'pending', id: '' });
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="border border-solid border-neutral-200 h-auto rounded-lg my-4 w-full lg:w-[40vw]">
        <div className="py-3 flex items-center justify-between border-0 border-b border-solid border-neutral-200 font-sans px-4 lg:px-8">
          <span className="text-lg font-semibold">Tasks</span>
          <Button
            className="!bg-neutral-100 !px-4 !py-2 !gap-1.5"
            onClick={() => {
              resetValues();
              setOpen(true);
            }}
          >
            <Add fontSize="small" />
            New Task
          </Button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto">
          {tasksData && tasksData.length > 0 ? (
            tasksData.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                handleEditValues={handleEditValues}
                handleDeleteTask={handleDeleteTask}
              />
            ))
          ) : (
            <Card variant="outlined" className="!border-none !bg-neutral-50">
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  className="flex items-center justify-center gap-2"
                  sx={{ fontSize: '1rem' }}
                >
                  <ThumbUp color="info" />
                  <Typography
                    variant="h6"
                    component="div"
                    className="flex items-center gap-2"
                    sx={{ fontSize: '1rem' }}
                  >
                    You have no pending tasks
                  </Typography>
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          PaperProps={{
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              if (isEditing && task) {
                handleUpdateTask({
                  name: task.name,
                  description: task.description,
                  status: task.status as StatusTypes,
                  id: task.id,
                });
              } else {
                handleCreateTask({
                  name: task?.name || '',
                  description: task?.description || '',
                  status: (task?.status as StatusTypes) || 'pending',
                });
              }

              setOpen(false);
            },
          }}
        >
          <DialogTitle>{isEditing ? 'Edit Task' : 'New Task'}</DialogTitle>
          <DialogContent>
            <div
              style={{
                padding: '0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <TextField
                required
                label="Name"
                fullWidth
                value={task?.name || ''}
                onChange={(event) =>
                  setTask({ ...task, name: event.target.value })
                }
                size="small"
              />
              <TextField
                required
                label="Description"
                fullWidth
                value={task?.description || ''}
                onChange={(event) =>
                  setTask({ ...task, description: event.target.value })
                }
                size="small"
              />
              {isEditing && (
                <TextField
                  select
                  value={task?.status || 'pending'}
                  onChange={(e) =>
                    setTask({ ...task, status: e.target.value as StatusTypes })
                  }
                  label="Status"
                  fullWidth
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </TextField>
              )}
            </div>
            <DialogActions>
              <Button
                onClick={() => setOpen(false)}
                sx={{ color: 'text.secondary' }}
              >
                CANCEL
              </Button>
              <Button type="submit" sx={{ color: 'text.secondary' }}>
                SUBMIT
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HomePage;
