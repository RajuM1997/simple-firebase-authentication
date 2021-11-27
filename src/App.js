import "./App.css";
import initializeAuthentication from "./Firebase/firebase.initialize";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { useState } from "react";

initializeAuthentication();
const googleProdiver = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();

  const handleGoogleSingIn = () => {
    signInWithPopup(auth, googleProdiver)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;

        // console.log(user);

        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleGitHubSingIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        const user = result.user;
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const heandleSingOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="App">
      {!user.name ? (
        <div>
          <button onClick={handleGoogleSingIn}>google sing in</button>
          <button onClick={handleGitHubSingIn}>github sing in</button>
        </div>
      ) : (
        <button onClick={heandleSingOut}>sing out</button>
      )}
      <br />
      {user.email && (
        <div>
          <h2>Welcome {user.name}</h2>
          <p>your email is {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
