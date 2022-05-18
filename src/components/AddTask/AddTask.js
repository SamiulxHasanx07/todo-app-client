import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AddTask = ({refetch}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [show, setShow] = useState(false);




    const handleClose = () => {
        console.log('added');
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const onSubmit = data => {
        console.log();
        
        fetch('http://localhost:5000/todos', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({...data, email:'sam.hasanx650@gmail.com', status:'incomplete'})
        })
            .then(res => res.json())
            .then(result => {
                // console.log(result);
                setShow(false)
                refetch()
                reset()
            })
    };
    console.log(errors);
    return (
        <>

            <h2 className='text-center title-color-main'>Add Tasks</h2>
            <div className='d-flex align-items-center justify-content-center mt-3 mb-5'>
                <button className='btn todo-bg-color text-white' onClick={handleShow}>
                    Add Task
                </button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>


                <form className='container' onSubmit={handleSubmit(onSubmit)}>
                    <input className='form-control mt-3' type="text" placeholder="Task Name" {...register("name", { required: true, maxLength: 80 })} />
                    <textarea className='form-control mt-3' placeholder='Task Description' {...register("des", { required: true, min: 5, maxLength: 100 })} />

                    <input className='btn todo-bg-color text-white w-100 mt-3' type="submit" value='Add Task' />
                </form>




                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}
                    {/* <Button variant="primary" onClick={handleClose}>
                        Add
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddTask;