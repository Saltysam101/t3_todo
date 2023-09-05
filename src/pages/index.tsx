import { SignIn } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { useUser, UserButton } from "@clerk/nextjs";

export default function SignInPage() {
  const {user, isLoaded, isSignedIn} = useUser();
  

const {data} = api.todo.getAll.useQuery();

  return (
    <>
     { !user || !isLoaded || !isSignedIn ? 
      <SignIn />
      : 
      <UserButton />
       }
   
    
        
    </>
  );
}
