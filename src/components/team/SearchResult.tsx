import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TeamMember } from "@/types/index"
import { addUserToTemplate } from "@/api/TeamAPI"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"

type SearchResultProps = {
    user: TeamMember
    reset: () => void
}
export default function SearchResult({user, reset} : SearchResultProps) {

    const navigate = useNavigate()
    const params = useParams()
    const templateId = params.templateId!

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: addUserToTemplate,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate(location.pathname, {replace: true})
            queryClient.invalidateQueries({queryKey: ['templateTeam', templateId]})
        }
    })

    const handleAddUserToTemplate = () => {
        const data = {
            templateId,
            id: user._id
        }
        mutate(data)
    }

  return (
    <>
        <p className="mt-10 text-center font-bold">Result:</p>
        <div className="flex justify-between items-center">
            <p>{user.name}</p>
            <button
                className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
                onClick={handleAddUserToTemplate}
            >Add to Template</button>
        </div>
    </>
  )
}
