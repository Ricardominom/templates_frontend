import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { CheckPasswordForm } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkPassword } from '@/api/AuthAPI';
import { toast } from 'react-toastify';
import { deleteTemplate } from '@/api/TemplateAPI';

export default function DeleteTemplateModal() {
    const initialValues : CheckPasswordForm = {
        password: ''
    }
    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search);
    const deleteTemplateId = queryParams.get('deleteTemplate')!;
    const show = deleteTemplateId ? true : false

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient()
    const checkUserPAsswordMutation = useMutation({
        mutationFn: checkPassword,
        onError: (error) => toast.error(error.message)
    })

    const deleteTemplateMutation = useMutation({
        mutationFn: deleteTemplate,
        onError: (error) => {
          toast.error(error.message);
        },
        onSuccess: (data) => {
          toast.success(data);
          queryClient.invalidateQueries({ queryKey: ["templates"] })
          navigate(location.pathname, { replace: true })
        }
      });

    const handleForm = async (formData: CheckPasswordForm) => {
        await checkUserPAsswordMutation.mutateAsync(formData)
        await deleteTemplateMutation.mutateAsync(deleteTemplateId)
    }


    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
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
                                >Delete Template </Dialog.Title>

                                <p className="text-xl font-bold">Confirm delete of template {''}
                                    <span className="text-fuchsia-600">puting your password</span>
                                </p>

                                <form
                                    className="mt-10 space-y-5"
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                >

                                    <div className="flex flex-col gap-3">
                                        <label
                                            className="font-normal text-2xl"
                                            htmlFor="password"
                                        >Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Password Log In"
                                            className="w-full p-3  border-gray-300 dark:text-black border"
                                            {...register("password", {
                                                required: "Password is required",
                                            })}
                                        />
                                        {errors.password && (
                                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                                        )}
                                    </div>

                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                        value='Delete Template'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}