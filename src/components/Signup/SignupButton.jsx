import React from "react";
import { auth, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import Logo from "../../assets/Google__G__Logo.svg.png";
const SignupButton = () => {
  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful sign in
      })
      .catch((error) => {
        // Handle sign in errors
        console.log(error);
      });
  };
  return (
    <div>
      <button
        onClick={handleSignInWithGoogle}
        className="button-30"
        role="button"
      >
        Sign up with
        <img src={Logo} alt="image" className="w-6 h-6 ml-2" />
      </button>
    </div>
  );
};

export default SignupButton;

/*
<!-- HTML !-->
<button class="button-30" role="button">Button 30</button>


*/
