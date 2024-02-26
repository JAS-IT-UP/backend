import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import './Login.css';
import { getUserPosts } from "../adapters/post-adapter";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    const formData = new FormData(event.target);
    const [user, error] = await logUserIn(Object.fromEntries(formData));
    if (error) return setErrorText(error.message);
    setCurrentUser(user);
    const [posts] = await getUserPosts(user.id)
    console.log(posts)
     if(!posts.length) {
    navigate('/tutorial')
     } else {
     navigate(`/user/${user.id}`);
     }
  };

  if (currentUser) return <Navigate to="/" />;

  return <>
  {/* <div id='login-form'>  */}
    <form onSubmit={handleSubmit} id='login-form' aria-labelledby="login-heading">
      <h2 id='login-heading'>Sign In</h2>
      {/* <label htmlFor="username">Username</label> */}
      <input type="text" autoComplete="username" id="username" name="username" placeholder="Enter Username"/>

      {/* <label htmlFor="password">Password</label> */}
      <input type="password" autoComplete="current-password" id="password" name="password" placeholder="Enter Password"/>

       <button id= "button">JAS IT UP!</button>
     
      <p>Don't have an account? <a href="/sign-up">Sign Up</a>!</p>

    </form> 
   
    { !!errorText && <p>{errorText}</p> }
     {/* </div> */}
  </>;
}
