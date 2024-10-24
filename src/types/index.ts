import { z } from 'zod'

/** Auth & Users */
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type UpdateCurrentUserPasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>
export type ConfirmToken = Pick<Auth, 'token'>
export type CheckPasswordForm = Pick<Auth, 'password'>

/** Users */
export const userSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})
export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User, 'name' | 'email'>

/** Notes */
const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    question: z.string(),
    createdAt: z.string()
})
export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>

/** Questions */
export const questionStatusSchema = z.enum(["pending", "completed"])
export type QuestionStatus = z.infer<typeof questionStatusSchema>

export const questionSchema = z.object({
    _id: z.string(),
    ask: z.string(),
    answer: z.string(),
    template: z.string(),
    status: questionStatusSchema,
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchema,
        status: questionStatusSchema
    })),
    notes: z.array(noteSchema.extend({
        createdBy: userSchema
    })),
    createdAt: z.string(),
    updatedAt: z.string()
})

export const questionTemplateSchema = questionSchema.pick({
    _id: true,
    ask: true,
    answer: true,
    status: true
})

export type Question = z.infer<typeof questionSchema>
export type QuestionFormData = Pick<Question, 'ask' | 'answer'>
export type QuestionTemplate = z.infer<typeof questionTemplateSchema>

/** Templates */
export const templateSchema = z.object({
    _id: z.string(),
    title: z.string(),
    userName: z.string(),
    description: z.string(),
    creator: z.string(userSchema.pick({_id: true})),
    questions: z.array(questionTemplateSchema),
    team: z.array(z.string(userSchema.pick({_id: true})))
})

export const dashboardTemplateSchema = z.array(
    templateSchema.pick({
        _id: true,
        title: true,
        userName: true,
        description: true,
        creator: true
    })
)
export const editTemplateSchema = templateSchema.pick({
    title: true,
    userName: true,
    description: true,
})
export type Template = z.infer<typeof templateSchema>
export type TemplateFormData = Pick<Template, 'userName' | 'title' | 'description'>

/** Team */
const teamMemberSchema = userSchema.pick({
    name: true,
    email: true,
    _id: true
})
export const teamMembersSchema = z.array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>