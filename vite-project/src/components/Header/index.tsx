import styles from './header.module.css'
import todologo from  '../../assets/todolist.jpg'

import { AiOutlinePlusCircle } from 'react-icons/ai'
import { ChangeEvent, FormEvent, useState } from 'react'


interface Props{
  onAddTask: (taskTitle: string) => void //Void Retorna Vazio.
}


export default function Header( { onAddTask } : Props ){

  //Criando Estado Para Chamar O Titulo Atual
  const [title, setTitle] = useState("")

  //Para Criar/Chamar O Formulario
  function handleSubmit(event: FormEvent){
    event.preventDefault()

    onAddTask(title)

    setTitle("")
  }

  //Chamando Novos Titulos De Tarefas / Definido Pela Chamada Do ONCHANGETITLE
  function onChangeTitle(event: ChangeEvent<HTMLInputElement>){
    setTitle(event.target.value)
  }

  return(
    <header className={styles.header}>
      <img src={todologo} alt="Logo" />

      <form className={styles.newTaskForm} onSubmit={handleSubmit}>
        <input 
          placeholder='Adicione Nova Tarefa'
          onChange={onChangeTitle}
          value={title} 
        />
        <button>
          Criar
          <AiOutlinePlusCircle size={20}/>
        </button>
      </form>
    </header>
  )
}