import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Header = () => {


    
    const [user] = useAuthState(auth);
    return (
        <div>
            <>
                <Navbar className='header' sticky='top'>
                    <Container>
                        <Link className='text-white logo' to='/'><h3>ToDo App</h3></Link>
                        <Nav className="ms-auto">
                            {
                                user?<button className='btn btn-link text-white' onClick={signOut(auth)}>Logout</button>:''
                            }
                            
                        </Nav>
                    </Container>
                </Navbar>
            </>
        </div>
    );
};

export default Header;