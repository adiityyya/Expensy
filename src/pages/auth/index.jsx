import {auth,provider} from '../../config/firebase-config'
import {signInWithPopup} from 'firebase/auth'
import { useNavigate,Navigate } from 'react-router-dom';
import {useGetUserInfo} from '../../hooks/useGetUserInfo'
import "./styles.css"
//usenavigate is a hook.

export const Auth = () => {  
  
  const navigate = useNavigate();
  const {isAuth} = useGetUserInfo();

  const signInWithGoogle = async ()=>{
    const results = await signInWithPopup(auth,provider);
    // console.log(results);

    //auth user info saved in an object.
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    }
    localStorage.setItem("auth",JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  if(isAuth){
    return <Navigate to="/expense-tracker"/>
  }

  return(
    <div className="login-page">
    <p>Sign in with Google to continue!</p>
    <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};
