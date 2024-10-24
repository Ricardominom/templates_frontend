import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import QuestionForm from './QuestionForm';
import { QuestionFormData } from '@/types/index';
import { createQuestion } from '@/api/QuestionAPI';
import { toast } from 'react-toastify';

export default function AddQuestionModal() {
    const navigate = useNavigate()

    /** Read if modal exist */
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalQuestion = queryParams.get('newQuestion')
    const show = modalQuestion ? true : false

    /** Get TemplateId */
    const params = useParams()
    const templateId = params.templateId!

    const initialValues : QuestionFormData = {
        ask: '',
        answer: '',
    }
    const { register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createQuestion,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['template', templateId]})
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true})
        }
    })

    const handleCreateQuestion = (formData: QuestionFormData) => {
        const data = {
            formData,
            templateId
        }
        mutate(data)
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
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
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-slate-700 text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        New Question
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Fill out the form and create a  {''}
                                        <span className="text-fuchsia-600">new question</span>
                                    </p>

                                    <form
                                        className='mt-10 space-y-3'
                                        onSubmit={handleSubmit(handleCreateQuestion)}
                                        noValidate
                                    >
                                        <QuestionForm
                                            register={register}
                                            errors={errors}
                                        />

                                    <input
                                        type="submit"
                                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                                        value="Save Question"
                                    />
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}