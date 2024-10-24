import { Link, useNavigate } from "react-router-dom"
import TemplateForm from "./TemplateForm"
import { Template, TemplateFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTemplate } from "@/api/TemplateAPI"
import { toast } from "react-toastify"

type EditTemplateFormProps = {
    data: TemplateFormData
    templateId: Template['_id']
}

export default function EditTemplateForm({data, templateId} : EditTemplateFormProps) {

    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        title: data.title,
        userName: data.userName,
        description: data.description
    }})

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateTemplate,
        onError: (error) => {
          toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['templates']})
            queryClient.invalidateQueries({queryKey: ['editTemplate', templateId]})
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: TemplateFormData) => {
        const data = {
            formData,
            templateId
        }
        mutate(data)
    }

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Edit Template</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Fill out the following form to edit the template
        </p>

        <nav className="my-5">
          <Link
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to="/"
          >
            Back to Templates
          </Link>
        </nav>

        <form
          className="mt-10 bg-white dark:bg-slate-700 shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <TemplateForm register={register} errors={errors} />

          <input
            type="submit"
            value="Save"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  )
}
