import { auth } from "../Config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";


export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        placeholder="passs.."
        type="password"
        onChange={(e) => setpassword(e.target.value)}
      ></input>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
};
