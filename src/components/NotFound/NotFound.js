import React from 'react';
import { Container } from 'react-bootstrap';

const NotFound = () => {
    return (
        <Container>
            <div className='text-center py-5'>
                <h2>Page Not Found</h2>
                <p>Please go back or visit other pages</p>
            </div>
        </Container >
    );
};

export default NotFound;