import { useForm } from "react-hook-form"
import { useLocation, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import type { NoteFormData } from "../../types";
import ErrorMessage from "../ErrorMessage";
import { createNote } from "../../api/NoteAPI";

export default function AddNoteForm() {

  const params = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const projectId = params.projectId!
  const taskId = queryParams.get('viewTask')!

  const initialValues: NoteFormData = {
    content: ''
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({defaultValues: initialValues});
  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      reset();
    },
  })

  const handleAddNote = (formData: NoteFormData) => {
    const data = {
      projectId,
      formData,
      taskId
    }
    mutate(data);
  }

  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="space-y-3"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label className="font-bold" htmlFor="content">Crear Nota</label>
        <input 
          type="text"
          id="content"
          placeholder="Contenido de la nota"
          className="w-full p-3 border border-gray-300"
          {...register('content', {
            required: 'El contenido de la nota es obligatorio'
          })}
        />
        {errors.content && (<ErrorMessage>{errors.content.message}</ErrorMessage>)}
      </div>
      <input 
        type="submit"
        value={'Crear Nota'}
        className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full text-white font-black cursor-pointer"
      />
    </form>
  )
}
