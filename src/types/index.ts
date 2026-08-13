import z from "zod";

// Auth & User

export const authSchema = z.object({
  name: z.string(),
  email: z.email(),
  current_password: z.string(),
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
export type UpdateCurrentUserPasswordForm = Pick<Auth, 'current_password' |'password' | 'password_confirmation'>
export type CheckPasswordForm = Pick<Auth, 'password' >

export type ConfirmToken = Pick<Auth, 'token'>

// Users

export const userSchema = authSchema.pick({
  name: true,
  email: true
}).extend({
  id: z.string()
})

export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, 'name' | 'email'>;

// Notes

export const noteSchema = z.object({
  id: z.string(),
  content: z.string(),
  creator: userSchema,
  taskId: z.string(),
  created_at: z.string(),
})

export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>;

// Task
export const taskStatusSchema = z.enum(["PENDING","ON_HOLD","IN_PROGRESS","UNDER_REVIEW","COMPLETED"])
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  projectId: z.string(),
  status: taskStatusSchema,
  user: userSchema.or(z.null()),
  notes: z.array(noteSchema.extend({
    creator: userSchema
  })),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name'|'description'>


// Projects
export const projectSchema = z.object({
  id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  managerId: z.union([
    z.string(),
    userSchema.pick({ id: true })
  ]),
});

export const dashboardprojectSchema = z.array(
  projectSchema.pick({
    id: true,
    projectName: true,
    clientName: true,
    description: true,
    managerId: true
  })
);

export const editProjectShchema = projectSchema.pick({
  projectName: true,
  clientName: true,
  description: true
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>

// Team
export const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  id: true,
});

export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;