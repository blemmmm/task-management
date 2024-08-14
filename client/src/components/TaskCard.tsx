import { Task } from '@/lib/interface/TaskTypes';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { Button, Card, CardContent, Chip, Typography } from '@mui/material';

interface TaskCardProps {
  task: Task;
  handleEditValues: (task: Task) => void;
  handleDeleteTask: (id: string) => void;
}

const TaskCard = ({
  task,
  handleEditValues,
  handleDeleteTask,
}: TaskCardProps) => {
  const { name, description } = task;
  return (
    <Card variant="outlined" className="!border-none !bg-neutral-50">
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start justify-center">
            <Typography
              variant="h6"
              component="div"
              className="flex items-center gap-2"
              sx={{ fontSize: '1rem' }}
            >
              {name}
            </Typography>
            <Typography
              variant="caption"
              component={'p'}
              sx={{ fontSize: '0.75rem', color: 'text.secondary' }}
            >
              {description}
            </Typography>
            <Chip
              label={
                task.status
                  ? task.status.replace('_', ' ').toUpperCase()
                  : 'PENDING'
              }
              size="small"
              sx={{
                fontWeight: 500,
                fontSize: '0.7rem',
                padding: '0.25rem 0.2rem',
                marginTop: '0.5rem',
              }}
              variant="filled"
              color={
                task.status === 'completed'
                  ? 'success'
                  : task.status === 'in_progress'
                    ? 'info'
                    : 'default'
              }
            />
          </div>
          <div className="flex items-center justify-end gap-1">
            <Button
              variant="text"
              sx={{ color: 'text.secondary', padding: 2 }}
              onClick={() => handleEditValues(task)}
            >
              <EditOutlined />
            </Button>
            <Button
              variant="text"
              sx={{ color: 'text.secondary', padding: 2 }}
              onClick={() => handleDeleteTask(task.id)}
            >
              <DeleteOutline />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
