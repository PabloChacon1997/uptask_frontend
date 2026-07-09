import z from "zod";


// Task


export const taskStatusSchema = z.enum(["PENDING","ON_HOLD","IN_PROGRESS","UNDER_REVIEW","COMPLETED"])
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  projectId: z.string(),
  status: taskStatusSchema,
});

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name'|'description'>


// Projects
export const projectSchema = z.object({
  id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

export const dashboardprojectSchema = z.array(
  projectSchema.pick({
    id: true,
    projectName: true,
    clientName: true,
    description: true,
  })
);


export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>