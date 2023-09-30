import React ,{useContext}from 'react'
import {useGoogleLogin ,GoogleLogin}from '@react-oauth/google'
import { DataContext } from '../../contexts/DataContext.jsx';

export default function Login() {
    let context = useContext(DataContext);

    const  signIn = useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl',
        redirect_uri : "http://localhost:5173",
        onSuccess: (user) => {
            localStorage.setItem('token',JSON.stringify({token:user.access_token}))
            context.setIsLogin(true)
            console.log('Logged in successfully!', user);
          },
          onFailure: (error) => {
            console.error('Error logging in:', error);
          },
    });

  return (
    
     <button onClick={signIn} className='btn'>
          <img
                  src="../../../public/images/logo/download.png"
                  alt=""
                  className="header-right__profile-img"
           />
     </button>
  )
}
