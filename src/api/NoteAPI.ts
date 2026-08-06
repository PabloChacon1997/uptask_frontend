import { isAxiosError } from "axios";

import api from "../lib/axios";
import type { Note, NoteFormData, Project, Task } from "../types";

type NoteAPIType = {
  formData: NoteFormData,
  projectId: Project['id']
  taskId: Task['id']
  noteId: Note['id']
}


export async function createNote({projectId, formData, taskId}: Pick<NoteAPIType, 'formData'| 'projectId'|'taskId'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/notes`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // eslint-disable-next-line preserve-caught-error
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteNote({projectId, taskId, noteId}: Pick<NoteAPIType, 'projectId'| 'noteId'|'taskId'>) {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // eslint-disable-next-line preserve-caught-error
      throw new Error(error.response.data.error);
    }
  }
}