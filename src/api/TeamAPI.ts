import { isAxiosError } from "axios";
import api from "@/lib/axios"
import { TeamMember, TeamMemberForm, teamMembersSchema, Template } from "../types";

export async function findUserByEmail({templateId, formData} : {templateId: Template['_id'], formData: TeamMemberForm}) {
    try {
        const url = `/templates/${templateId}/team/find`
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function addUserToTemplate({templateId, id} : {templateId: Template['_id'], id: TeamMember['_id']}) {
    try {
        const url = `/templates/${templateId}/team`
        const { data } = await api.post<string>(url, {id})
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function removeUserFromTemplate({templateId, userId} : {templateId: Template['_id'], userId: TeamMember['_id']}) {
    try {
        const url = `/templates/${templateId}/team/${userId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTemplateTeam(templateId: Template['_id']) {
    try {
        const url = `/templates/${templateId}/team`
        const { data } = await api(url)
        const response = teamMembersSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}