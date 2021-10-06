import {getAuth,signInWithPopup, GoogleAuthProvider,GithubAuthProvider, signOut} from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {
  const [user,setUser] =useState({});

  const handleGoogleSignIn =() => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const {displayName,email,photoURL} = result.user;
      const logedInUser = {
        name: displayName,
        email: email,
        photo: photoURL
      };
      setUser(logedInUser);
    })
    .catch(error =>{
      console.log(error.message);
    })
  }

  const handleGithubSignIn = () =>{
    const auth = getAuth();
    signInWithPopup(auth, githubProvider)
    .then(result =>{
      const {displayName, photoURL, email} = result.user;
      // console.log(user);
      const loggedInUser ={
        name: displayName,
        email: email,
        photo: photoURL
      };
      setUser(loggedInUser)
    })
  }

  const handleSignOut =() => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser({});
      });
  }
  return (
    <div className="App">
      {!user.name ?
      <div>
          <button className="btn" onClick={handleGoogleSignIn}>Google Sign in</button> &nbsp;
          <button className="btn2" onClick={handleGithubSignIn}>Github Sign in</button>
      </div>:
        <button className="btn3" onClick={handleSignOut}>Sign Out</button>}
      <br />
      {
        user.email && <div>
          <h3>Welcome {user.name}</h3>
          <h5>I know your email address: {user.email}</h5>
          <img src={user.photo} alt="" />
          </div>
      }
    </div>
  );
}

export default App;
