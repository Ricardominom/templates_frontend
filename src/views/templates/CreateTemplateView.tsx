import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import TemplateForm from "@/components/templates/TemplateForm"
import { TemplateFormData } from "@/types/index"
import { createTemplate } from "@/api/TemplateAPI"

export default function CreateTemplateView() {

    const navigate = useNavigate()
    const initialValues : TemplateFormData = {
        title: "",
        userName: "",
        description: ""
    }
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: createTemplate,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData : TemplateFormData) => mutate(formData)

  return (
    <>
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black">Create Template</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Fill out the following form to create the template</p>

            <nav className="my-5">
                <Link
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    to='/'
                >Back to Templates</Link>
            </nav>

            <form 
                className="mt-10 bg-white dark:bg-slate-600 shadow-lg p-10 rounded-lg"
                onSubmit={handleSubmit(handleForm)}
                noValidate
                >

                    <TemplateForm 
                        register={register}
                        errors={errors}
                    />
                    
                    <input 
                        type="submit"
                        value='Create Template'
                        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                    />
            </form>
        </div>
    </>
  )
}
