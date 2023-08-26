import { SignIn} from "@clerk/nextjs";

export default function SignInPage() {
  


  return (
    <>
     
    <div>
      <h2>Hello There! Please sign in with your Github account.</h2>
      <SignIn />
    </div>
    
        
    </>
  );
}
