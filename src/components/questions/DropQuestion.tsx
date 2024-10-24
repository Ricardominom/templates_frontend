import { useDroppable } from "@dnd-kit/core"

type DropQuestionProps = {
    status: string
}

export default function DropQuestion({status} : DropQuestionProps) {

    const { isOver, setNodeRef } = useDroppable({
        id: status
    })

    const style = {
        opacity: isOver ? 0.4 : undefined
    }

  return (
    <div 
    style={style}
        ref={setNodeRef}
        className="text-xs font-semibold uppercase p-2 border border-dashed border-slate-500 mt-5 grid place-content-center text-slate-500">
        Drop question here
    </div>
  )
}
