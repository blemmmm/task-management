export interface TaskPayload {
  name: string;
  description: string;
  status: 'in_progress' | 'completed' | 'pending';
  id?: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: 'in_progress' | 'completed' | 'pending';
  created_at: string;
}

export type TaskResponse = Task[];
