import api from "@/lib/axios";
import { dashboardTemplateSchema, editTemplateSchema, Template, TemplateFormData, templateSchema } from "../types";
import { isAxiosError } from "axios";

export async function createTemplate(formData: TemplateFormData) {
    try {
        const {data} = await api.post('/templates', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTemplates() {
    try {
        const { data } = await api('/templates')
        const response = dashboardTemplateSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTemplateById(id: Template['_id']) {
    try {
        const { data } = await api(`/templates/${id}`)
        const response = editTemplateSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getFullTemplate(id: Template['_id']) {
    try {
        const { data } = await api(`/templates/${id}`)
        const response = templateSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

type TemplateAPIType = {
    formData: TemplateFormData
    templateId: Template['_id']
}

export async function updateTemplate({formData, templateId} : TemplateAPIType) {
    try {
        const { data } = await api.put<string>(`/templates/${templateId}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteTemplate(id: Template['_id']) {
    try {
        const url = `/templates/${id}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}