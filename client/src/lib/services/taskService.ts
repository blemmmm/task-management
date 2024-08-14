/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from 'react-query';
import { config } from '../config';
import { TaskPayload, TaskResponse } from '../interface/TaskTypes';

export const useTaskService = () => {
  const fetchTasks = async (params = {}) => {
    const endpoint = new URL(`${config.apiUrl}/api/tasks`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          endpoint.searchParams.set(key, value?.toString());
        }
      });
    }
    const response = await fetch(endpoint);
    const data = await response.json();

    return data;
  };

  const getTasks = (params = {}) => {
    return useQuery<TaskResponse, Error>(['tasks'], () => fetchTasks(params), {
      staleTime: Infinity,
      cacheTime: Infinity,
    });
  };

  const createTask = async (task: TaskPayload) => {
    const response = await fetch(`${config.apiUrl}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();

    return data;
  };

  const updateTask = async (task: TaskPayload) => {
    const response = await fetch(`${config.apiUrl}/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();

    return data;
  };

  const deleteTask = async (id: string) => {
    const response = await fetch(`${config.apiUrl}/api/tasks/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    return data;
  };

  return {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};
