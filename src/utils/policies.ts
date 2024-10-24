import { TeamMember, Template } from "../types"

export const isCreator = (creatorId: Template['creator'], userId: TeamMember['_id']) => creatorId === userId