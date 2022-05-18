import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddTask = ({ refetch }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [show, setShow] = useState(false);

    const handleClose = () => {
        console.log('added');
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const onSubmit = data => {
        fetch('http://localhost:5000/todos', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ ...data, email: 'sam.hasanx650@gmail.com', status: 'incomplete' })
        })
            .then(res => res.json())
            .then(result => {
                toast.success('New Task Added Successfully')
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
                    <Modal.Title>Add New Task</Modal.Title>
                </Modal.Header>


                <form className='container pt-3 pb-5' onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Task Name</label>
                    <input className='form-control' type="text" placeholder="Task Name" {...register("name", { required: true, maxLength: 80 })} />
                    {errors.name && <p className='text-danger m-0'>Task Name required</p>}

                    <label className='mt-2' htmlFor="des">Task Description</label>
                    <textarea className='form-control' placeholder='Task Description' {...register("des", { required: true, min: 5, maxLength: 100 })} />
                    {errors.des && <p className='text-danger m-0'>Task Description Must be Gater Than 5 Character</p>}

                    <input className='btn todo-bg-color text-white w-100 mt-3' type="submit" value='Add Task' />
                    <button onClick={handleClose} className='btn btn-danger text-white w-100 mt-3'>Cancel</button>
                </form>
            </Modal>
        </>
    );
};

export default AddTask;