import { CalendarToday, Person, Tag } from '@mui/icons-material';

const TaskCard = () => {
  return (
    <div className="p-4  font-sans">
      <div className="bg-neutral-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-neutral-950 rounded-full w-2 h-2" />
            <h4 className="text-sm font-medium my-1">Design new website</h4>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarToday className="w-4 h-4" />
            <span>Due: May 15</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Person className="w-4 h-4" />
            <span>Assigned to: John Doe</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Tag className="w-4 h-4" />
            <span>Design</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
