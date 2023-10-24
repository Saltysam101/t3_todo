import { SignIn } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { useUser, UserButton } from "@clerk/nextjs";
import { useState } from "react";

export default function SignInPage() {
const {user, isLoaded, isSignedIn} = useUser();
const utils = api.useContext();

const {data} = api.todo.getAll.useQuery();

const [input, setInput] = useState("")
const {mutate} = api.todo.createTodo.useMutation();


const currentUserId = user?.id;

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

const currentUserTodos = data?.map((todo) => {
  if(todo?.userId === currentUserId){
    return(
      <li key={todo.id}>
        {todo.text}
        <div>
          <button onClick={() => editTodo.mutate({id: todo.id, data: {text: input}})}>Edit</button>
          <button>Delete</button>
        </div>
        </li>
    )
  }
})




  return (
    <>
     { !user || !isLoaded || !isSignedIn ? 
      <SignIn />
      : 
      <>
        <UserButton afterSignOutUrl="/"/>
        <form>
          <input
           type="text" 
           placeholder="Type your todos here"
           value={input}
           onChange={(e) => setInput(e.target.value)} 
           />
           <button onClick={() => mutate({text: input})}>Add</button>
        </form>
        <main>
          <ul>
            {currentUserTodos}
          </ul>
        </main>
      </>
       }
   
    
        
    </>
  );
}
