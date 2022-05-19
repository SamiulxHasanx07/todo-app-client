import React, { useEffect } from 'react';
import auth from '../../../firebase.init';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../Loading/Loading';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
const GoogleLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const location = useLocation();

    // const navigate = useNavigate()
    useEffect(() => {
        if (error) {
            toast.error(error.code)
        }
    }, [error])

    console.log(user);

    const from = location.state?.from?.pathname || "/home";
    if (user) {
        Navigate(from, { replace: true });
    }

    const login = () => {
        signInWithGoogle()
    }
    
    if (loading) {
        return <Loading />
    }


    return (
        <div className='my-5'>
            <button onClick={login} className='btn todo-btn w-100'><FontAwesomeIcon icon={faGoogle} /> Login With Google</button>
        </div>

    );
};

export default GoogleLogin;