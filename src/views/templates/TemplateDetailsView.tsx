import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getFullTemplate } from "@/api/TemplateAPI"
import AddQuestionModal from "@/components/questions/AddQuestionsModal"
import QuestionList from "@/components/questions/QuestionList"
import EditQuestionData from "@/components/questions/EditQuestionData"
import QuestionModalDetails from "@/components/questions/QuestionModalDetails"
import { useAuth } from "@/hooks/useAuth"
import { isCreator } from "@/utils/policies"
import { useMemo } from "react"

export default function TemplateDetailsView() {

    const { data: user, isLoading: authLoading } = useAuth();
    const navigate = useNavigate()

    const params = useParams()
    const templateId = params.templateId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['template', templateId],
        queryFn: () => getFullTemplate(templateId),
        retry: false
    })
    const canEdit = useMemo(() => data?.creator === user?._id, [data,user])
    console.log(canEdit)

    if(isLoading && authLoading) return 'Loading...'
    if(isError) return <Navigate to='/404' />
    if(data && user) return (
        <>
            <h1 className="text-5xl font-black">{data.title}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            {isCreator(data.creator, user._id) && (
                <nav className="my-5 flex gap-3">
                    <button
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        onClick={() => navigate(location.pathname + '?newQuestion=true')}
                    >Add Question</button>

                    <Link
                        to={'team'}
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    >Respondents</Link>
                </nav>
            )}
            
            <QuestionList 
                questions={data.questions}
                canEdit={canEdit}
            />
            <AddQuestionModal />
            <EditQuestionData />
            <QuestionModalDetails
                canEdit={canEdit}
            />
        </>
    )

}
