import z from "zod";


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