import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { statusTranslations } from "../../locales/es"
import type { Project, TaskProject, TaskStatus } from "../../types"
import DropTask from "./DropTask"
import TaskCard from "./TaskCard"
import { updateStatus } from "../../api/TaskAPI"

type TaskListrops = {
  tasks: TaskProject[]
  candEdit: boolean
}


type GroupedTasks = {
  [key: string]: TaskProject[]
}
const initialStatusGroups: GroupedTasks = {
  PENDING: [],
  ON_HOLD: [],
  IN_PROGRESS: [],
  UNDER_REVIEW: [],
  COMPLETED: [],
}



const statusStyles: { [key: string]: string} = {
  PENDING: 'border-t-slate-500',
  ON_HOLD: 'border-t-red-500',
  IN_PROGRESS: 'border-t-blue-500',
  UNDER_REVIEW: 'border-t-amber-500',
  COMPLETED: 'border-t-emerald-500',
}


export default function TaskList({ tasks, candEdit }: TaskListrops) {

  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient()
  ;
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Tarea actualizada')
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
    },
  })

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task]
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event
    if (over && over.id) {
      const taskId = active.id.toString();
      const status = over.id as TaskStatus;
      mutate({projectId, taskId, status})

      queryClient.setQueryData(['project', projectId], (oldData: Project) => {
        const updatedTasks = oldData.tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              status
            }
          }
          return task
        })

        return {
          ...oldData,
          tasks: updatedTasks
        }
      })
    }
  }

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
              <h3 
                className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}
              >{statusTranslations[status]}</h3>
              <DropTask status={status}/>
              <ul className='mt-5 space-y-5'>
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                ) : (
                  tasks.map(task => <TaskCard key={task.id} task={task} candEdit={candEdit} />)
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  )
}
