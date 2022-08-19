import React, { useState } from 'react';
import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";
import {
  logOut,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  auth

} from './firebase';
import './App.css';


function HandleEmailValidResponse(props) {
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  if (props.validEmail.length >= 1 && emailRegex.test(props.validEmail)) {
    return <h1 id='valid' className='padding'>Valid Email</h1>
  } else if (props.validEmail.length >= 1) {
    return <h1 id='notValid' className='padding'>Not Valid Email</h1>
  }
}
function SignInOrSignUp(props) {
  console.log(props.form.user)
  if (props.form.user) {
    return <button onClick={() => logOut(auth, props.form.setUser)}>Log Out</button>
  } else if (!props.form.user) {
    return (
      <div>
        <li>
          <button onClick={() => registerWithEmailAndPassword(props.form.name, props.form.validEmail, props.form.password)}>Sign Up</button>
        </li>
        <li>
          <button onClick={() => logInWithEmailAndPassword(props.form.validEmail, props.form.password)}>Sign In</button>
        </li>
      </div>
    )
  }
}

function App() {
  const [validEmail, setValidEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Signed In")
      setUser(user.uid)
    } else {
      console.info("Signed out.")
    }
  });
  return (
    <>
      <center>
        <h1>Firebase Implementation</h1>
      </center>
      <div id='container' className='padding shown'>

        <center>
          <form>
            <label>Email</label>
            <input type='text' id='email' onChange={event => setValidEmail(event.target.value)} />
            <label>Password</label>
            <input type='password' id='password' onChange={event => setPassword(event.target.value)} />
            <label>Name</label>
            <input type='text' onChange={event => setName(event.target.value)} />
          </form>
          <ul className='shown'>
            <SignInOrSignUp form={{ name, validEmail, password, setUser, user }} />
          </ul>
        </center>
        <center>
          <div>
            <HandleEmailValidResponse validEmail={validEmail} />
          </div>
        </center>
      </div>
      <center className='padding shown'>
        <a>{user.length > 1 ? `User ID: ${user}` : "You are Signed Out"}</a>
      </center>
    </>
  );
}

export default App;
