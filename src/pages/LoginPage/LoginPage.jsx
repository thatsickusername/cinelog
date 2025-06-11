import { useEffect } from 'react'
import { useAuth } from '../../context/useAuth'
import './LoginPage.css'
import { useNavigate } from 'react-router-dom'

function LoginPage(props) {
    const navigate = useNavigate();
    const {user, signInWithGoogle, isLoading} = useAuth()

    useEffect(()=>{
        if(!isLoading && user){
            navigate("/", { replace: true })
        }
    },[user, isLoading, navigate])

    const handleGoogleLogin = async () =>{
        try {
            await signInWithGoogle()
        } catch (error) {
            console.log('error: ', error)
        }
    }

    return (
        <div className="loginContainer">
          <div className="loginBox">
            <h1 className="loginTitle">Welcome to <span>CineLog 🎬</span> </h1>
            <p className="loginSubtitle">Track, rate, and review your favorite movies.</p>
            <button className="loginButton" onClick={handleGoogleLogin}>
              <svg className="googleIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.15 0 5.84 1.21 7.72 3.17l5.72-5.72C33.35 3.66 28.97 1.5 24 1.5 14.84 1.5 7.23 7.98 4.9 16.5h7.81c1.65-4.17 5.75-7 11.29-7z" />
                <path fill="#4285F4" d="M46.5 24c0-1.67-.15-3.27-.43-4.81H24v9.12h12.72c-.55 2.96-2.14 5.46-4.54 7.17v5.94h7.37c4.31-3.97 6.95-9.81 6.95-17.42z" />
                <path fill="#FBBC05" d="M11.19 28.5c-.58-1.74-.91-3.61-.91-5.5s.33-3.76.91-5.5H3.38A23.94 23.94 0 002 24c0 3.79.88 7.36 2.38 10.5l7.81-6z" />
                <path fill="#34A853" d="M24 46.5c6.51 0 11.97-2.15 15.96-5.83l-7.37-5.94C30.59 36.72 27.47 38 24 38c-5.54 0-9.64-2.83-11.29-7H4.9c2.33 8.52 9.94 15 19.1 15z" />
                <path fill="none" d="M2 2h44v44H2z" />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      );
}    

export default LoginPage;