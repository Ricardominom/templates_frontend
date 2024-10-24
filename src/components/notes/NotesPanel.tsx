import { Question } from "@/types/index"
import AddNoteForm from "./AddNoteForm"
import NoteDetail from "./NoteDetail"

type NotesPanelProps = {
    notes: Question['notes']
    canEdit: boolean
}

export default function NotesPanel({notes, canEdit} : NotesPanelProps) {
  return (
    <>
        {canEdit ? (null) : (
            <AddNoteForm />
        )}

        <div className="divide-y divide-gray-100 mt-10">
            {notes.length ? (
                <>
                    <p className="font-bold text-2xl text-slate-600 dark:text-white my-5">Answers:</p>
                    {notes.map(note => <NoteDetail key={note._id} note={note} />)}
                </>
            ) : <p className="text-gray-500 text-center pt-3">There aren't notes</p>}
        </div>
    </>
  )
}
