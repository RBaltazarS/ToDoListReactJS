import styles from './contenttask.module.css'
import { TbTrash } from 'react-icons/tb'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { ITask } from '../../App'

interface Props{
  task: ITask
  onDelete: (taskId: string) => void
  onComplete: (taskId: string) => void
}

export default function ContentTask( {task, onDelete, onComplete } : Props ){

  return(
    <div className={styles.contentTask}>
      <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
        {task.isCompleted ? <BsFillCheckCircleFill/> : <div/>}
      </button>

      <p className={task.isCompleted ? styles.textCompleted : ""}>
        {task.title}
      </p>

      <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
        <TbTrash size={20} />
      </button>
    </div>
  )
}