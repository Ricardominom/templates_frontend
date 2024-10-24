import { isAxiosError } from "axios";
import { Note, NoteFormData, Question, Template } from "../types";
import api from "@/lib/axios";

type NoteAPIType = {
    formData: NoteFormData
    templateId: Template['_id']
    questionId: Question['_id']
    noteId: Note['_id']
}

export async function createNote({templateId, questionId, formData} : Pick<NoteAPIType, 'templateId' | 'questionId' | 'formData'>) {
    try {
       const url = `/templates/${templateId}/questions/${questionId}/notes`
       const { data } = await api.post<string>(url, formData)
       return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteNote({templateId, questionId, noteId} : Pick<NoteAPIType, 'templateId' | 'questionId' | 'noteId'>) {
    try {
        const url = `/templates/${templateId}/questions/${questionId}/notes/${noteId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}