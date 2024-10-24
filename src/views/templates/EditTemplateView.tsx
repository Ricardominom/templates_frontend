import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getTemplateById } from "@/api/TemplateAPI"
import EditTemplateForm from "@/components/templates/EditTemplateForm"

export default function EditTemplateView() {
    const params = useParams()
    const templateId = params.templateId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editTemplate', templateId],
        queryFn: () => getTemplateById(templateId),
        retry: false
    })

    if(isLoading) return 'Loading...'
    if(isError) return <Navigate to='/404' />
    if(data) return <EditTemplateForm data={data} templateId={templateId} />

}
