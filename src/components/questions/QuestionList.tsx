import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { QuestionStatus, QuestionTemplate, Template } from "@/types/index"
import QuestionCard from "./QuestionCard"
import { statusTranslations } from "@/locales/es"
import DropQuestion from "./DropQuestion"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateStatus } from "@/api/QuestionAPI"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

type QuestionListProps = {
  questions: QuestionTemplate[]
  canEdit: boolean
}

type GroupedQuestions = {
  [key: string]: QuestionTemplate[]
}

const initialStatusGroups: GroupedQuestions = {
  pending: [],
  completed: []
}

const statusStyles : {[key: string] : string} = {
    pending: 'border-t-red-500',
    completed: 'border-t-emerald-500',
}


export default function QuestionList({ questions, canEdit }: QuestionListProps) {
  
  const params = useParams()
  const templateId = params.templateId! 
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["template", templateId] })
    }
  })

  const groupedQuestions = questions.reduce((acc, question) => {
    let currentGroup = acc[question.status] ? [...acc[question.status]] : []
    currentGroup = [...currentGroup, question]
    return { ...acc, [question.status]: currentGroup }
  }, initialStatusGroups)

  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e

    if (over && over.id) {
      const questionId = active.id.toString()
      const status = over.id as QuestionStatus
      mutate({templateId, questionId, status})

      queryClient.setQueryData(['template', templateId], (prevData: Template) => {
        const updatedQuestions = prevData.questions.map((question) => {
          if (question._id === questionId) {
            return {
              ...question,
              status
            }
          }
          return question
        })

        return {
          ...prevData,
          questions: updatedQuestions
        }
      })
    }
  }

  return (
    <>
      <h2 className="text-5xl font-black my-10">Questions</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext onDragEnd={handleDragEnd}>
        {Object.entries(groupedQuestions).map(([status, questions]) => (
          <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
            <h3 
                className={`capitalize text-xl font-light border border-slate-300 bg- dark:bg-sky-950 p-3 border-t-8 ${statusStyles[status]}`}
            >{statusTranslations[status]}</h3>

            <DropQuestion status={status} />

            <ul className="mt-5 space-y-5">
              {questions.length === 0 ? (
                <li className="text-gray-500 text-center pt-3">
                  There aren't Questions
                </li>
              ) : (
                questions.map((question) => <QuestionCard key={question._id} question={question} canEdit={canEdit} />)
              )}
            </ul>
          </div>
        ))}
        </DndContext>
      </div>
    </>
  )
}
