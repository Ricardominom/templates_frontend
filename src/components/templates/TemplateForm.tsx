import { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { TemplateFormData } from 'types'

type TemplateFormProps = {
    register: UseFormRegister<TemplateFormData>
    errors: FieldErrors<TemplateFormData>
}

export default function TemplateForm({errors, register} : TemplateFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="title" className="text-sm uppercase font-bold">
                    Title
                </label>
                <input
                    id="title"
                    className="w-full p-3  border border-gray-200 dark:text-black"
                    type="text"
                    placeholder="Template's Title"
                    {...register("title", {
                        required: "Project's title is required",
                    })}
                />

                {errors.title && (
                    <ErrorMessage>{errors.title.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="userName" className="text-sm uppercase font-bold">
                    Creator
                </label>
                <input
                    id="userName"
                    className="w-full p-3  border border-gray-200 dark:text-black"
                    type="text"
                    placeholder="Creator Name"
                    {...register("userName", {
                        required: "Creator Name is required",
                    })}
                />

                {errors.userName && (
                    <ErrorMessage>{errors.userName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Description
                </label>
                <textarea
                    id="description"
                    className="w-full p-3  border border-gray-200 dark:text-black"
                    placeholder="Template's description"
                    {...register("description", {
                        required: "Description is required"
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}