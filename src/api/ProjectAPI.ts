import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardprojectSchema, type ProjectFormData } from "../types";


export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post('/projects', formData);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      // eslint-disable-next-line preserve-caught-error
      throw new Error(error.response.data.error)
    }
  }
}

export async function getProjects() {
  try {
    const { data } = await api('/projects');
    const response = dashboardprojectSchema.safeParse(data);
    // console.log(response)
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      // eslint-disable-next-line preserve-caught-error
      throw new Error(error.response.data.error)
    }
  }
}