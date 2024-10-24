import { Navigate, useLocation, useParams } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getQuestionById } from "@/api/QuestionAPI"
import EditQuestionModal from "./EditQuestionModal"

export default function EditQuestionData() {
    const params = useParams()
    const templateId = params.templateId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const questionId = queryParams.get('editQuestion')!
    
    const { data, isError } =useQuery({
        queryKey: ['question', questionId],
        queryFn: () => getQuestionById({templateId, questionId}),
        enabled: !!questionId
    })

    if(isError) return <Navigate to={'/404'} />

    if(data) return <EditQuestionModal data={data} questionId={questionId} />
}
