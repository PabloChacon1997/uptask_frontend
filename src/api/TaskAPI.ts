import { isAxiosError } from "axios";

import api from "../lib/axios";
import type { Project, TaskFormData } from "../types";

type TaskAPI = {
  formData: TaskFormData,
  projectId: Project['id']
}

export async function createTask({formData, projectId}: TaskAPI) {
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