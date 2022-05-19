import { faCircleCheck, faCircleExclamation, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Container, Form, FormText } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Loading/Loading';

const Signup = () => {

    const [registerUser, setRegisterUser] = useState({ name: '', email: '', password: '', confirmPass: '' })
    const [formError, setFormError] = useState({ email: '', password: '', confirmPass: '' })
    const [disabled, setDisabled] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [outterError, setOutterError] = useState('')
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const handleName = e => {
        setRegisterUser({ ...registerUser, name: e.target.value })
    }
    const handleEmail = e => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validate = regex.test(e.target.value)
        if (!validate) {
            setFormError({ ...formError, email: true })
            setRegisterUser({ ...registerUser, email: '' })
        } else {
            setFormError({ ...formError, email: false })
            setRegisterUser({ ...registerUser, email: e.target.value })
        }
        if (e.target.value === '') {
            setFormError({ ...formError, email: '' })
            setRegisterUser({ ...registerUser, email: '' })
        }
    }
    const handlePass = e => {
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        const validate = passRegex.test(e.target.value)
        // console.log(validate);
        if (!validate) {
            setFormError({ ...formError, password: true })
            setDisabled(false)
            setRegisterUser({ ...registerUser, password: '' })
        } else {
            setFormError({ ...formError, password: false })
            setDisabled(true)
            setRegisterUser({ ...registerUser, password: e.target.value })
        }
        if (e.target.value === '') {
            setFormError({ ...formError, password: '' })
            setDisabled(false)
            setRegisterUser({ ...registerUser, password: '' })
        }
    }

    const handleConfirmPass = e => {
        const inpuPass = registerUser.password;
        const validate = inpuPass === e.target.value;

        if (validate) {
            setFormError({ ...formError, confirmPass: true })
            setRegisterUser({ ...registerUser, confirmPass: e.target.value })
        } else {
            setFormError({ ...formError, confirmPass: false })
            setRegisterUser({ ...registerUser, confirmPass: '' })
        }
        if (e.target.value === '') {
            setFormError({ ...formError, confirmPass: '' })
            setRegisterUser({ ...registerUser, confirmPass: '' })
        }
    }

    const handleShow = () => {
        setShowPass(!showPass)
    }
    const navigate = useNavigate();
    useEffect(() => {
        if (error) {
            setOutterError(error.code)
        }
    }, [error])

    useEffect(() => {
        switch (outterError) {
            case "auth/email-already-in-use":
                toast.error('Email Already Used');
                setOutterError('')
                break;
            default:
        }
    }, [outterError])

    const handleForm = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPass } = registerUser;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name.length >= 3 && emailRegex.test(email) && password === confirmPass) {
            await createUserWithEmailAndPassword(email, password)
            await updateProfile({ displayName: name });
        }
        setFormError({ email: '', password: '', confirmPass: '' })
    }


    // custom accessToken hook
    if (user) {
        const { email } = registerUser;
        navigate('/home')
    }

    if (loading) {
        return <Loading />
    }
    return (
        <div>
            <Container>
                <div className='form-container my-5 mx-auto px-4 py-5'>
                    <h2 className='text-center'>Create Account</h2>
                    <Form onSubmit={handleForm}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control onChange={handleName} required name='name' type="text" placeholder="Enter Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required onChange={handleEmail} name='email' type="email" placeholder="Enter email" />
                            <Form.Text className={`${formError.email === '' ? 'd-none' : 'd-block'}`}>
                                {
                                    formError.email ? (<span className='text-danger mt-2'><FontAwesomeIcon icon={faCircleExclamation} /> Invalid Email</span>) : (<span className='text-success mt-2'><FontAwesomeIcon icon={faCircleCheck} /> Great! Valid Email</span>)
                                }
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <div style={{ position: 'relative' }}>
                                <Form.Control required onChange={handlePass} name='password' type={showPass ? 'text' : 'password'} placeholder="Password" />
                                <span onClick={handleShow} className='btn' style={{ position: 'absolute', top: '0', right: '0' }}><FontAwesomeIcon icon={faEyeSlash} /></span>
                            </div>
                            <Form.Text className={`${formError.password === '' ? 'd-none' : 'd-block'}`}>
                                {
                                    formError.password ? (<span className='text-danger mt-2'><FontAwesomeIcon icon={faCircleExclamation} /> Minimum six characters, one uppercase letter, one lowercase letter, one number and special character</span>) : (<span className='text-success mt-2'><FontAwesomeIcon icon={faCircleCheck} /> Great! Strong Password</span>)
                                }
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control required type={showPass ? 'text' : 'password'} disabled={!disabled} onChange={handleConfirmPass} name='confirmPass' placeholder="Confirm Password" />
                            <FormText className={`${formError.confirmPass === '' ? 'd-none' : 'd-block'}`}>
                                {
                                    formError.confirmPass ? (<span className='text-success mt-2'><FontAwesomeIcon icon={faCircleCheck} /> Great! Confirm Password Matched</span>) : (<span className='text-danger mt-2'><FontAwesomeIcon icon={faCircleExclamation} /> Confirm Password Not Match</span>)
                                }
                            </FormText>
                        </Form.Group>
                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                        <input type="submit" value="Create Account" className='btn custom-btn w-100 py-2' />
                        <div className='mt-4'>
                        </div>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default Signup;