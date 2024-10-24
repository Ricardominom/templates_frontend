import { isAxiosError } from "axios"
import api from "@/lib/axios"
import { Question, QuestionFormData, questionSchema, Template } from "../types"

type QuestionAPI = {
    formData: QuestionFormData
    templateId: Template['_id']
    questionId:  Question['_id']
    status: Question['status']
}

export async function createQuestion({formData, templateId} : Pick<QuestionAPI, 'formData' | 'templateId'>) {
    try {
        const url = `/templates/${templateId}/questions`
        const { data } = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getQuestionById({templateId, questionId} : Pick<QuestionAPI, 'templateId' | 'questionId'>) {
    try {
        const url = `/templates/${templateId}/questions/${questionId}`
        const { data } = await api(url)
        const response = questionSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateQuestion({templateId, questionId, formData}: Pick <QuestionAPI, 'templateId' | 'questionId' | 'formData'>) {
    try {
        const url = `/templates/${templateId}/questions/${questionId}`
        const { data } = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteQuestion({templateId, questionId} : Pick<QuestionAPI, 'templateId' | 'questionId'>) {
    try {
        const url = `/templates/${templateId}/questions/${questionId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateStatus({templateId, questionId, status} : Pick<QuestionAPI, 'templateId' | 'questionId' | 'status'>) {
    try {
        const url = `/templates/${templateId}/questions/${questionId}/status`
        const { data } = await api.post<string>(url, {status})
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}