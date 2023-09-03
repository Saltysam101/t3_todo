import { SignIn } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { useUser, UserButton } from "@clerk/nextjs";

export default function SignInPage() {
  const {user, isLoaded, isSignedIn} = useUser();
  

const {data} = api.todo.getAll.useQuery();

  return (
    <>
     {!isLoaded && !isSignedIn ? 
      <SignIn />
      :
      <>
        <nav>
          <UserButton />
        </nav>
        <main>
          {data ? data.map((todo) => {
            return (
              <li key={todo.id}>
                {todo.userId === user?.id ? todo.text : null}
              </li>
            )
          } ) : <>No todos here</>}
        </main>
      </>
     }
   
    
        
    </>
  );
}
