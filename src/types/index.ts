import z from "zod";

// Auth & User

export const authSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
})

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email'|'password'>
export type UserRegistrationForm = Pick<Auth, 'name'|'email'|'password'|'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>

export type ConfirmToken = Pick<Auth, 'token'>

// Users

export const userSchema = authSchema.pick({
  name: true,
  email: true
}).extend({
  id: z.string()
})

export type User = z.infer<typeof userSchema>;

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