/* eslint-disable no-unused-vars */
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { success } from "../utils/authSlice";
function OAuth() {
  const dispatch = useDispatch();
  async function handleGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();

      const auth = getAuth(app);
      const user = await signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;

          const user = result.user;
          return user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          const email = error.customData.email;

          const credential = GoogleAuthProvider.credentialFromError(error);
        });

      //sent the post request

      const response = await fetch("http://localhost:3000/api/v1/user/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          username: user.displayName,
          photoUrl: user.photoURL,
        }),
      });

      const data = await response.json();
      dispatch(success(data.newUser));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <button type="button" onClick={handleGoogleClick}>
        Continue with Google
      </button>
    </div>
  );
}

export default OAuth;
