import React from 'react'
import { api } from "~/utils/api";
import { useUser, UserButton } from "@clerk/nextjs";
import { useState } from "react";

export default function Todo() {
const {user} = useUser();
const utils = api.useContext();

const {data} = api.todo.getAll.useQuery();

const [input, setInput] = useState("")
const {mutate} = api.todo.createTodo.useMutation();


const currentUserId = user?.id;
const todo = {
  id: ""
}

const editTodo = api.todo.editTodo.useMutation({
  async onMutate({id, data}) {
    await utils.todo.getAll.cancel();
    const allTodos = utils.todo.getAll.getData();
    if(!allTodos) {
      return;
    }
    utils.todo.getAll.setData(
      undefined,
      allTodos.map((todo) => 
      todo.id === id ? {...todo, ...data} : todo,)
    )
  }
})

const deleteTodo = api.todo.deleteTodo.useMutation({
  async onMutate() {
    await utils.todo.getAll.cancel();
    const allTodos = utils.todo.getAll.getData();
    if(!allTodos){
      return
    }
    utils.todo.getAll.setData(
      undefined,
      allTodos.filter((t) => t.id != todo.id)
    )
  }
})

const currentUserTodos = data?.map((todo) => {
  todo.id = todo.id
  if(todo?.userId === currentUserId){
    return(
      <li className="flex justify-between mt-4" key={todo.id}>
        {todo.text}
        <div>
          <button className="bg-amber-300 ml-2 w-9 h-8 rounded-sm font-bold hover:text-white hover:bg-amber-400" onClick={() => editTodo.mutate({id: todo.id, data: {text: input}})}>Edit</button>
          <button className="bg-red-600 ml-2 w-14 h-8 rounded-sm font-bold hover:text-white hover:bg-red-700" onClick={() => deleteTodo.mutate({id: todo.id})}>Delete</button>
        </div>
        </li>
    )
  }
})
  return (
    <div className="m-4">
        <UserButton afterSignOutUrl="/"/>
        <form className="flex justify-center">
          <input
          className="border-b-2"
           type="text" 
           placeholder="Type your todos here"
           value={input}
           onChange={(e) => setInput(e.target.value)} 
           />
           <button className="ml-4 bg-green-400 w-9 h-8 rounded-sm font-bold hover:text-white hover:bg-green-500" onClick={() => mutate({text: input})}>Add</button>
        </form>
        <main className="h-screen flex justify-center items-start mt-4">
          <ul className="w-5/5 md:w-5/12 lg:w-1/4">
            {currentUserTodos}
          </ul>
        </main>
      </div>
  )
}
