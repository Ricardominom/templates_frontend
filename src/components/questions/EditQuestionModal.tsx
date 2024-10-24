import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Question, QuestionFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import QuestionForm from './QuestionForm';
import { updateQuestion } from '@/api/QuestionAPI';
import { toast } from 'react-toastify';

type EditQuestionModalProps = {
    data: Question
    questionId: Question['_id']
}

export default function EditQuestionModal({data, questionId} : EditQuestionModalProps) {
    const navigate = useNavigate()

    /** Get TemplateId */
    const params = useParams()
    const templateId = params.templateId!

    const { register, handleSubmit, reset, formState: {errors} } = useForm<QuestionFormData>({defaultValues: {
        ask: data.ask,
        answer: data.answer
    }})

    const queryClient = useQueryClient()
    const { mutate } =useMutation({
        mutationFn: updateQuestion,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['Template', templateId]})
            queryClient.invalidateQueries({queryKey: ['question', questionId]})
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true})
        }
    })

    const handleEditQuestion = (formData: QuestionFormData) => {
        const data = { templateId, questionId, formData }
        mutate(data)
    }
    
    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true}) }>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16 dark:bg-slate-700">
                                <Dialog.Title
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Edit Ask
                                </Dialog.Title>

                                <p className="text-xl font-bold">Make changes to {''}
                                    <span className="text-fuchsia-600">this Form</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    onSubmit={handleSubmit(handleEditQuestion)}
                                    noValidate
                                >
                                    <QuestionForm 
                                        register={register}
                                        errors={errors}
                                    />

                    
                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                        value='Save Ask'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}