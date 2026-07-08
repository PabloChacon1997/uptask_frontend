import { isAxiosError } from "axios";

import api from "../lib/axios";
import type { Project, Task, TaskFormData } from "../types";

type TaskAPI = {
  formData: TaskFormData,
  projectId: Project['id'],
  taskId: Task['id'],
}

export async function createTask({formData, projectId}: Pick<TaskAPI, 'formData'|'projectId'>) {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // eslint-disable-next-line preserve-caught-error
      throw new Error(error.response.data.error);
    }
  }
}

export async function getTaskById({projectId, taskId}: Pick<TaskAPI, 'projectId'|'taskId'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // eslint-disable-next-line preserve-caught-error
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateTaskById({projectId, taskId, formData}: Pick<TaskAPI, 'projectId'|'taskId'|'formData'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const putData = {
      ...formData,
      status: 'PENDING'
    }
    const { data } = await api.put(url, putData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // eslint-disable-next-line preserve-caught-error
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteById({projectId, taskId}: Pick<TaskAPI, 'projectId'|'taskId'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.delete(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // eslint-disable-next-line preserve-caught-error
      throw new Error(error.response.data.error);
    }
  }
}