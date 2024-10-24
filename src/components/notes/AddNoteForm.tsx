import { NoteFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/api/NoteAPI'
import { toast } from 'react-toastify'
import { useLocation, useParams } from 'react-router-dom'


export default function AddNoteForm() {

    const params = useParams()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)

    const templateId = params.templateId! 
    const questionId = queryParams.get('viewQuestion')!

    const initialValues : NoteFormData = {
        content: ''
    }

    const { register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ["question", questionId]})
        }
    })

    const handleAddNote = (formData: NoteFormData) => {
        mutate({templateId, questionId, formData})
        reset()
    }

  return (
    <form
        onSubmit={handleSubmit(handleAddNote)}
        className="space-y-3"
        noValidate
    >
        <div className="flex flex-col gap-2">
            <label className="font-bold text-center" htmlFor="content">Answer Question</label>
            <input 
                id="content"
                type="text" 
                placeholder="Your Answer"
                className="w-full p-3 border border-gray-300 dark:text-black"
                {...register('content', {
                    required: 'The content of note is required'
                })}
            />
            {errors.content && (
                <ErrorMessage>{errors.content.message}</ErrorMessage>
            )}
        </div>

        <input 
            type="submit"
            value='Answer'
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black cursor-pointer"
            />
        
    </form>
  )
}
