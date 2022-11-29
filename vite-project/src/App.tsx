
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Task from "./components/Task";

//Const A Onde Vai Ficar Guardado O Historico Das Tarefas Offline No PC LOCAL.
const LOCAL_STORAGE_KEY  = "todo:savedTasks"

export interface ITask{
  id: string
  title: string
  isCompleted: boolean
}

export default function App(){

  
  const [tasks, setTasks] = useState <ITask[]>([])


  //Funcao Para Buscar Tudo Que Ficou Salvo No LOCAL STORAGE
  function loadSavedTasks(){
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved){
      setTasks(JSON.parse(saved))
    }
  }

  //Chamando Um Unica Vez, Para Mostrar Dados Salvos No Pc Local.
  useEffect(() => {
    loadSavedTasks()
  }, [])


  //Funcao Para Salvar No Seu Pc
  function setTasksAndSave(newTasks: ITask[]){
    setTasks(newTasks)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
  }


  // Funcao Para Add Novas Tasks/Tarefas No ToDoList
  function addTask(taskTitle: string){
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(), //Novo Comando Para Add ID, Direto Do Browsed
        title: taskTitle,
        isCompleted: false,
      }
    ])
  }


  //Funcao Para Deletar Tarefas
  function deleteTaskById(taskId: string){
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasksAndSave(newTasks)
  }


  //Funcao Para Marcar As Tarefas Conlcuidas
  function toggleTaskCompleteByIid(taskId: string){
    const newTasks = tasks.map(task =>{
      if(task.id === taskId){
        return{
          ...task,
          isCompleted: !task.isCompleted
        }
      }
      return task
    })
    setTasksAndSave(newTasks)
  }


  return(
    <>
      <Header onAddTask={addTask} />
      <Task tasks={tasks} onDelete={deleteTaskById} onComplete={toggleTaskCompleteByIid}/>
      
    </>
  )
}