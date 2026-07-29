import type { Project, TeamMember } from "../types";

export const isManger = (managerId: Project['managerId'], userId: TeamMember['id']) => managerId === userId;