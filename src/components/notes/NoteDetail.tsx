import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useAuth } from "../../hooks/useAuth"
import type { Note } from "../../types"
import { formatDate } from "../../utils/utils"
import { deleteNote } from "../../api/NoteAPI"

type NoteDetailProps = {
  note: Note
}

export default function NoteDetail({ note }: NoteDetailProps) {
  const { data, isLoading } = useAuth();
  const canDelete = useMemo(() => data?.id === note.creator.id ,[data])
  const params = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('viewTask')!;

  const projectId = params.projectId!;

  const queryClient = useQueryClient();

  const {mutate }= useMutation({
    mutationFn: deleteNote,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
    }
  })
  if(isLoading) return 'Cargando...';
  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
          {note.content} por: <span className="font-bold">{note.creator.name}</span>
        </p>
        <p className="text-xs text-slate-500">
          {formatDate(note.created_at)}
        </p>
      </div>
      {
        canDelete && (
          <button
            type='button'
            className="bg-red-400 hover:bg-red-500 p-2 text-white font-bold cursor-pointer transition-colors"
            onClick={() => mutate({projectId, taskId, noteId: note.id})}
          >Eliminar</button>
        )
      }
    </div>
  )
}
