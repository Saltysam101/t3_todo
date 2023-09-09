import { SignIn } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { useUser, UserButton } from "@clerk/nextjs";
import { useState } from "react";

export default function SignInPage() {
  const {user, isLoaded, isSignedIn} = useUser();
  

const {data} = api.todo.getAll.useQuery();

const [input, setInput] = useState("")
const {mutate} = api.todo.createTodo.useMutation();


const currentUserId = user?.id;

const currentUserTodos = data?.map((todo) => {
  if(todo?.userId === currentUserId){
    return(
      <li key={todo.id}>{todo.text}</li>
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
