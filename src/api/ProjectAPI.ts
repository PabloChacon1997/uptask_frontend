import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardprojectSchema, type Project, type ProjectFormData } from "../types";


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

export async function getProjectById(id: Project['id']) {
  try {
    const { data } = await api(`/projects/${id}`);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      // eslint-disable-next-line preserve-caught-error
      throw new Error(error.response.data.error)
    }
  }
}

type PropjectAPIType = {
  formData: ProjectFormData,
  projectId: Project['id']
}

export async function updateProjectById({formData, projectId}: PropjectAPIType) {
  try {
    const { data } = await api.put(`/projects/${projectId}`, formData);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      // eslint-disable-next-line preserve-caught-error
      throw new Error(error.response.data.error)
    }
  }
}