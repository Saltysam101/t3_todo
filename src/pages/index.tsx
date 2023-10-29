import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";


export default function SignInPage() {
const {user, isLoaded, isSignedIn} = useUser();

  return (
    <>
     { !user || !isLoaded || !isSignedIn ? 
      <SignIn afterSignInUrl="/todo"/>
      : 
      <div>How are you still here?</div>
       }
    </>
  );
}
