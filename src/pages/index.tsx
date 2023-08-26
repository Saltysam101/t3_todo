import { SignIn, useUser } from "@clerk/nextjs";

export default function SignInPage() {
  
const {isLoaded, isSignedIn} = useUser();


  return (
    <>
    {!isLoaded || !isSignedIn ? 
    <div>
      <h2>Hello There! Please sign in with your Github account.</h2>
      <SignIn />
    </div> :
    <div>You are already signed in. Please head on over to the <a href="/todo">todo page</a></div>
    }
    
        
    </>
  );
}
