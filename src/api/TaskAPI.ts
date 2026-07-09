import { isAxiosError } from "axios";

import api from "../lib/axios";
import { taskSchema, type Project, type Task, type TaskFormData } from "../types";

type TaskAPI = {
  formData: TaskFormData,
  projectId: Project['id'],
  taskId: Task['id'],
  status: Task['status']
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
    const response = taskSchema.safeParse(data);
    if (response.success) {
      return response.data
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // eslint-disable-next-line preserve-caught-error
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateTaskById({projectId, taskId, formData, status}: Pick<TaskAPI, 'projectId'|'taskId'|'formData'|'status'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const putData = {
      ...formData,
      status
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

export async function updateStatus({projectId, taskId, status}: Pick<TaskAPI, 'projectId'|'taskId'| 'status'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/status`;
    const { data } = await api.post(url, { status });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // eslint-disable-next-line preserve-caught-error
      throw new Error(error.response.data.error);
    }
  }
}